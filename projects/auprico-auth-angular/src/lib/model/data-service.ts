import {BehaviorSubject} from 'rxjs/index';
import { Apollo } from 'apollo-angular';
import {Injector} from '@angular/core';
import {BaseModel, parseArray} from './versioned-model';

export interface DataService<T extends BaseModel> {

    values: BehaviorSubject<T[]>;

    query: any;

    refresh(): void;

}

export abstract class BaseDataService<T extends BaseModel> implements DataService<T> {

    apollo: Apollo;
    values: BehaviorSubject<T[]> = new BehaviorSubject([]);
    allValues: BehaviorSubject<T[]> = new BehaviorSubject([]);
    abstract objectInstance: T;
    abstract query: any;
    abstract fieldName: string;

    constructor(injector: Injector) {
        this.apollo = injector.get(Apollo);
    }

    refresh(ignoreCache?: boolean, variables?: any) {
        let q: any;
        if (ignoreCache) {
            q = this.apollo.query({
                query: this.query,
                variables: variables,
                fetchPolicy: "network-only"
            });
        } else {
            q = this.apollo.query({
                query: this.query,
                variables: variables
            });
        }
        this.setupSubscriptionValues(q);
    }

    refreshAllValues(ignoreCache?: boolean, variables?: any) {
        if (variables == undefined) {
            variables = {'X-NO-LOADING': true};
        }
        let q: any;
        if (ignoreCache) {
            q = this.apollo.query({
                query: this.query,
                variables: variables,
                fetchPolicy: "network-only"
            });
        } else {
            q = this.apollo.query({
                query: this.query,
                variables: variables
            });
        }
        this.setupSubscriptionAllValues(q);
    }

    setupSubscriptionValues(q: any) {
        q.subscribe(res => {
            if (res.data) {
                let v: T[];
                v = parseArray<T>(res.data, this.objectInstance.constructor, this.fieldName);
                console.log('v', v);
                this.values.next(v);
            }
            else {
                console.log('Response with no data');
            }
        });
    }

    setupSubscriptionAllValues(q: any) {
        q.subscribe(res => {
            console.log('res', res);
            if (res.data) {
                let v: T[];
                v = parseArray<T>(res.data, this.objectInstance.constructor, this.fieldName);  
                this.allValues.next(v);
            }
            else {
                console.log("Response with no data!");
            }
        });
    }

    refreshIfEmpty() {
        if (this.values.getValue().length == 0) {
            this.refresh();
        }
    }
}
