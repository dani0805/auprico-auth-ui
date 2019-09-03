import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {BUser} from './user';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService, UserServiceFilter} from './user.service';
import {BTeam} from "../team/team";
import {TeamService} from "../team/team.service";


export class UsersDataSource implements DataSource<BUser> {

    private users = new BehaviorSubject<BUser[]>([]);
    private loadingUsers = new BehaviorSubject<boolean>(false);
    private count = new BehaviorSubject<number>(0);

    public loading$ = this.loadingUsers.asObservable();
    public count$ = this.count.asObservable();

    constructor(private userService: UserService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<BUser[]> {

        this.userService.values.subscribe(data => {
                this.loadingUsers.next(false);
                this.users.next(data);
            }
        );
        this.userService.count.subscribe(value => {
                this.count.next(value);
            }
        );
        return this.users.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.users.complete();
        this.loadingUsers.complete();
        this.count.complete();
        this.userService.values.unsubscribe();
        this.userService.count.unsubscribe();
    }

    loadUsers(filter: string = '',
              sortField: string = 'pk',
              sortDirection: string = 'asc',
              pageIndex: number = 0,
              pageSize: number = 10,
              teamId?: string,
              role?: string,
              ignoreCache?: boolean
              ) {
        this.loadingUsers.next(true);
        let filterValue = filter.trim(); // Remove whitespace
        if (filterValue.length < 3 && filterValue.length > 0) {
            filterValue = "";
        }
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        const userFilter = new UserServiceFilter(filterValue);
        userFilter.orderBy = ((sortDirection == 'asc') ? '' : '-') + sortField
        userFilter.size = pageSize;
        userFilter.page = pageIndex;
        userFilter.teamId = teamId;
        userFilter.role = role;
        this.userService.searchUsers(userFilter, ignoreCache, true);
    }

    retrieveUsersByField(fieldName, fieldValue): BUser[] {
        return this.users.value.filter(x => x[fieldName] == fieldValue);
    }
}
