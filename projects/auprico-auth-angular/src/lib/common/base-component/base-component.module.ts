import {OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

export class BaseComponent implements OnDestroy {

    private ngUnsubscribe: Subject<any> = new Subject();

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

    }

    safeSubscribe<ValueT>(
        observable: Observable<ValueT>,
        next?: (value: ValueT) => void,
        error?: (error: any) => void,
        complete?: () => void): Subscription {
        return observable.pipe(takeUntil(this.ngUnsubscribe)).subscribe(next, error, complete);
    }

}
