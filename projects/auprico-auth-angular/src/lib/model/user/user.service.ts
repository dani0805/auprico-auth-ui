import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as MUser from '../user/user';
import { Apollo } from 'apollo-angular';
import {pkToBase64} from '../versioned-model';

@Injectable()
export class SingleBatchService {
    batch: Subject<MUser.BUser>;
    private query: any;

    constructor(private apollo: Apollo) {
        this.batch = new Subject<MUser.BUser>();
    }

    performQueryWithID(id: number) {
        const pk = pkToBase64('UserNode', id);
        this.performQuery(pk);
    }

    performQuery(pk: string) {
        this.query = this.apollo.query(
            {
                query: null,
                variables: {
                    id: pk
                },
                fetchPolicy: 'network-only'
            }
        );
        this.query.subscribe(response => {
            const batch = new MUser.BUser(response.data['user'])
            this.batch.next(batch);
        });
    }

}
