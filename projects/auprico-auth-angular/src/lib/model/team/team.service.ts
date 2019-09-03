import {Injectable, Injector} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import {getAllTeams, getAllTeamGroupFilters, updateTeam, teamQuery, createTeam, singleTeamQuery} from './queries';
import {BaseDataService} from '../data-service';
import {MessageHandlerService} from '../../common/message-handler/message-handler.service';
import {ExceptionHandlerService} from '../../common/exception-handler/exception-handler.service';
import {parseArray, parseAttr, pkToBase64} from '../versioned-model';
import {createGuid} from '../../common/uuid-generator';
import {BTeam, BTeamGroupFilter} from './team';
import {Apollo} from 'apollo-angular';

export class TeamServiceFilter {
    ids: string[];
    term: string;
    teamId: string;
    size = 20;
    orderBy = 'pk';
    page = 0;

    constructor(term?: string, size: number = 10) {
        this.term = term;
        this.size = size;
    }

    serialize(): string {
        const res = {};
        if (this.term) {
            res['term'] = this.term;
        }
        if (this.ids) {
            res['ids'] = this.ids;
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
export class TeamService extends BaseDataService<BTeam> {
    valuesGroupFilters: BehaviorSubject<BTeamGroupFilter[]> = new BehaviorSubject([]);
    query = getAllTeams;
    objectInstance = new BTeam({});
    fieldName = 'allTeams';
    teamChanged: Subject<BTeam> = new Subject<BTeam>();
    public count: BehaviorSubject<number>;

    constructor(injector: Injector, private messageService: MessageHandlerService, private exceptionService: ExceptionHandlerService) {
        super(injector);
        this.count = new BehaviorSubject<number>(0);
    }

    searchTeams(filter: TeamServiceFilter, ignoreCache?: boolean, background?: boolean) {
        const query = this.runQueryWithFilters(filter, ignoreCache, background);

        query.subscribe(res => {
            if (res.data) {
                // console.log(res.data);
                const teams = this.deserializeFromData(res);
                this.count.next(res.data['filterTeam']['totalCount']);
                this.values.next(teams);
            } else {
                console.log('empty response');
            }
        });
    }

    runQueryWithFilters(filter: TeamServiceFilter, ignoreCache?: boolean, background?: boolean) {
        let q: any;
        if (ignoreCache) {
            q = this.apollo.query({
                query: teamQuery,
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
                query: teamQuery,
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

    deserializeFromData(res: any): BTeam[] {
        return parseArray<BTeam>(res.data, BTeam, 'filterTeam');
    }

    refresh(): void {
        super.refresh();
        // team group filters
        const queryGroupFilters = this.apollo.query({
            query: getAllTeamGroupFilters,
            variables: {'X-NO-LOADING': true}
        });
        queryGroupFilters.subscribe(res => {
            if (res.data) {
                const teamGroupFilters = parseArray<BTeamGroupFilter>(res.data, BTeamGroupFilter, 'allTeamGroupFilters');
                this.valuesGroupFilters.next(teamGroupFilters);
            } else {
                console.log('Response team group filters with no data!');
            }
        });
    }

    update(data: Object) {
        let mutationData = {};
        mutationData = Object.assign({}, data)
        mutationData['clientMutationId'] = createGuid();

        const mutation = this.apollo.mutate({
            mutation: updateTeam,
            variables: {params: mutationData}
        });
        mutation.subscribe(response => {
            if (response) {
                const responseData = response.data['updateTeam'];
                const updated = parseAttr<BTeam>(responseData, BTeam, 'team');
                this.teamChanged.next(updated);
                this.messageService.messageStream.next('Team updated correctly.');

            } else {
                this.exceptionService.errorStream.next('Team Edit: empty response');
            }
        },
        error => {
            this.exceptionService.errorStream.next('(Interaction Edit) ' + error);
        });
    }
}


@Injectable()
export class TeamCreateService {
    team: Subject<Object> = new Subject<Object>();
    response: Subject<BTeam> = new Subject<BTeam>();

    constructor(private apollo: Apollo) {
        this.team.subscribe(toMutate => {
            let mutationData = {};
            mutationData = Object.assign({}, toMutate)
            mutationData['clientMutationId'] = createGuid();
            const mutation = apollo.mutate({
                mutation: createTeam,
                variables: {params: mutationData}
            });
            mutation.subscribe(response => {
                    console.log(response);
                    if (response) {
                        const teamResponseData = response.data['createTeam'];
                        const changedTeam = parseAttr<BTeam>(teamResponseData, BTeam, 'team');
                        console.log(changedTeam);
                        this.response.next(changedTeam);
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
export class TeamEditService {
    response: Subject<BTeam> = new Subject<BTeam>();
    responseMutateMultipleTeams: Subject<boolean> = new Subject<boolean>();

    constructor(private apollo: Apollo) {

    }

    editTeam(toMutate: Object) {
        const mutation = this.mutateWithQuery(toMutate, updateTeam);
        mutation.subscribe(response => {
            if (response) {
                const teamResponseData = response.data['updateTeam'];
                const changedTeam = parseAttr<BTeam>(teamResponseData, BTeam, 'team');
                this.response.next(changedTeam);
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
export class SingleTeamService {
    team: Subject<BTeam>;
    teamWithTemplate: Subject<BTeam>;
    private query: any;
    private queryAnswer: any;

    constructor(private apollo: Apollo) {
        this.team = new Subject<BTeam>();
        this.teamWithTemplate = new Subject<BTeam>();
    }

    performQueryWithID(id: number) {
        let pk = pkToBase64("TeamNode", id);
        this.performQuery(pk);
    }

    performQuery(pk: string) {
        this.query = this.apollo.query(
            {
                query: singleTeamQuery,
                variables: {
                    id: pk
                },
                fetchPolicy: "network-only"
            }
        );
        this.query.subscribe(response => {
            this.team.next(new BTeam(response.data["team"]));
        });
    }

}
