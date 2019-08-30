
import {Injectable} from '@angular/core';
import { Apollo } from 'apollo-angular';
import {userQuery, createUser, mutateUser, singleUserQuery, mutateUserPassword} from './queries';

import { BUser } from './user';
import {BehaviorSubject, Subject} from 'rxjs';
import {parseArray, parseAttr, pkToBase64} from '../versioned-model';
import {createGuid} from '../../utility/uuid-generator';
import {MessageHandlerService} from "../../common/message-handler/message-handler.service";
import {ExceptionHandlerService} from "../../common/exception-handler/exception-handler.service";


// Instead of following what is done in the old user search interface,
// we are not sending the deputy parameter. It should be handled by the component itself and not by the general service
// since it is just visualization related.
export class UserServiceFilter {
    ids: string[];
    term: string;
    role: string; // ('_assign' | '<role__name>')
    teamId: string;
    region: string; // ('<region__code>')
    size = 20;
    orderBy = 'pk';
    page = 0;

    constructor(term?: string, size: number = 10) {
        this.term = term;
        this.size = size;
    }

    serialize(): string {
        let res = {};
        if (this.term) {
            res['term'] = this.term;
        }
        if (this.ids) {
            res['ids'] = this.ids;
        }
        if (this.role) {
            res['role'] = this.role;
        }
        if (this.region) {
            res['region'] = this.region;
        }
        if (this.orderBy) {
            res['order_by'] = this.orderBy;
        }
        if (this.size) {
            res['size'] = this.size;
        }
        if (this.page) {
            res['page'] = this.page;
        }
        if (this.teamId) {
            res['team_id'] = this.teamId;
        }
        return JSON.stringify(res);
    }
}

@Injectable()
export class UserService {

    private filter: Subject<UserServiceFilter>;
    public values: BehaviorSubject<BUser[]>;
    public count: BehaviorSubject<number>;

    constructor(private apollo: Apollo) {
        this.filter = new Subject<UserServiceFilter>();
        this.values = new BehaviorSubject<BUser[]>([]);
        this.count = new BehaviorSubject<number>(0);
        this.filter.subscribe(filter => {
            this.searchUsers(filter);
        });
    }

    searchUsers(filter: UserServiceFilter, ignoreCache?: boolean, background?: boolean) {
        const query = this.runQueryWithFilters(filter, ignoreCache, background);

        query.subscribe(res => {
            if (res.data) {
                // console.log(res.data);
                const users = this.deserializeFromData(res);
                this.count.next(res.data['filterUser']['totalCount']);
                this.values.next(users);
            } else {
                console.log('empty response');
            }
        });
    }

    deserializeFromData(res: any): BUser[] {
        return parseArray<BUser>(res.data, BUser, 'filterUser');
    }

    runQueryWithFilters(filter: UserServiceFilter, ignoreCache?: boolean, background?: boolean) {
        let q: any;
        if (ignoreCache) {
            q = this.apollo.query({
                query: userQuery,
                variables: {
                    filters: filter.serialize(),
                    size: filter.size,
                    thCursor: filter.page,
                    'X-NO-LOADING': background
                },
                fetchPolicy: 'network-only'
            });
        } else {
            q = this.apollo.query({
                query: userQuery,
                variables: {
                    filters: filter.serialize(),
                    size: filter.size,
                    thCursor: filter.page,
                    'X-NO-LOADING': background
                }
            });
        }
        return q;
    }

}

@Injectable()
export class UserCreateService {
    user: Subject<Object> = new Subject<Object>();
    response: Subject<BUser> = new Subject<BUser>();

    constructor(private apollo: Apollo) {
        this.user.subscribe(toMutate => {
            let mutationData = {};
            mutationData = Object.assign({}, toMutate)
            mutationData['clientMutationId'] = createGuid();
            const mutation = apollo.mutate({
                mutation: createUser,
                variables: {params: mutationData}
            });
            mutation.subscribe(response => {
                    console.log(response);
                    if (response) {
                        const userResponseData = response.data['createUser'];
                        const changedUser = parseAttr<BUser>(userResponseData, BUser, 'user');
                        console.log(changedUser);
                        this.response.next(changedUser);
                    } else {
                        this.response.next(undefined);
                    }
                },
                error => {
                    console.log(error);
                });
        });

    }
}

@Injectable()
export class UserEditService {
    response: Subject<BUser> = new Subject<BUser>();
    responseMutateMultipleUsers: Subject<boolean> = new Subject<boolean>();

    constructor(private apollo: Apollo) {

    }

    editUser(toMutate: Object) {
        const mutation = this.mutateWithQuery(toMutate, mutateUser);
        mutation.subscribe(response => {
            if (response) {
                const userResponseData = response.data['updateUser'];
                const changedUser = parseAttr<BUser>(userResponseData, BUser, 'user');
                this.response.next(changedUser);
            } else {
                this.response.next(undefined);
            }
        }, error => {
            console.log(error);
        });
    }


    private mutateWithQuery(toMutate: Object, query: any) {
        let mutationData = {};
        mutationData = Object.assign({}, toMutate);
        mutationData['clientMutationId'] = createGuid();
        const mutation = this.apollo.mutate({
            mutation: query,
            variables: { params: mutationData }
        });
        return mutation;
    }
}


@Injectable()
export class SingleUserService {
    user: Subject<BUser>;
    userWithTemplate: Subject<BUser>;
    private query: any;
    private queryAnswer: any;

    constructor(private apollo: Apollo) {
        this.user = new Subject<BUser>();
        this.userWithTemplate = new Subject<BUser>();
    }

    performQueryWithID(id: number) {
        let pk = pkToBase64("UserNode", id);
        this.performQuery(pk);
    }

    performQuery(pk: string) {
        this.query = this.apollo.query(
            {
                query: singleUserQuery,
                variables: {
                    id: pk
                },
                fetchPolicy: "network-only"
            }
        );
        this.query.subscribe(response => {
            this.user.next(new BUser(response.data["user"]));
        });
    }

}

@Injectable()
export class UserEditPasswordService {
    user: Subject<Object> = new Subject<Object>();
    response: Subject<BUser> = new Subject<BUser>();

    constructor(
        private apollo: Apollo, private messageService: MessageHandlerService,
        private exceptionService: ExceptionHandlerService) {
        this.user.subscribe(toMutate => {
            let mutationData = {};
            mutationData = Object.assign({}, toMutate)
            mutationData['clientMutationId'] = createGuid();
            const mutation = apollo.mutate({
                mutation: mutateUserPassword,
                variables: {params: mutationData}
            });
            mutation.subscribe(response => {
                    if (response) {
                        this.messageService.messageStream.next("User password updated correctly.");
                        const userResponseData = response.data['updateUserPassword'];
                        const changedUser = parseAttr<BUser>(userResponseData, BUser, 'user');
                        this.response.next(changedUser);
                    } else {
                        this.response.next(undefined);
                        this.exceptionService.errorStream.next("User Password Edit: empty response");
                    }
                },
                error => {
                    this.exceptionService.errorStream.next("(User Password Edit) " + error);
                });
        });


    }
}
