import {CollectionViewer, DataSource} from '@angular/cdk/typings/esm5/collections';
import {BTeam} from './team';
import {BehaviorSubject, Observable} from 'rxjs';
import {TeamService, TeamServiceFilter} from './team.service';

export class TeamsDataSource implements DataSource<BTeam> {

    private teams = new BehaviorSubject<BTeam[]>([]);
    private loadingTeams = new BehaviorSubject<boolean>(false);
    private count = new BehaviorSubject<number>(0);

    public loading$ = this.loadingTeams.asObservable();
    public count$ = this.count.asObservable();

    constructor(private teamService: TeamService) {
    }

    connect(collectionViewer: CollectionViewer): Observable<BTeam[]> {

        this.teamService.values.subscribe(data => {
                this.loadingTeams.next(false);
                this.teams.next(data);
            }
        );
        this.teamService.count.subscribe(value => {
                this.count.next(value);
            }
        );
        return this.teams.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.teams.complete();
        this.loadingTeams.complete();
        this.count.complete();
        this.teamService.values.unsubscribe();
        this.teamService.count.unsubscribe();
    }

    loadTeams(filter: string = '',
              sortField: string = 'pk',
              sortDirection: string = 'asc',
              pageIndex: number = 0,
              pageSize: number = 10,
              teamId?: string,
              role?: string,
              ignoreCache?: boolean
              ) {
        this.loadingTeams.next(true);
        let filterValue = filter.trim(); // Remove whitespace
        if (filterValue.length < 3 && filterValue.length > 0) {
            filterValue = '';
        }
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        const teamFilter = new TeamServiceFilter(filterValue);
        teamFilter.orderBy = ((sortDirection == 'asc') ? '' : '-') + sortField
        teamFilter.size = pageSize;
        teamFilter.page = pageIndex;
        teamFilter.teamId = teamId;
        this.teamService.searchTeams(teamFilter, ignoreCache, true);
    }

    retrieveTeamsByField(fieldName, fieldValue): BTeam[] {
        return this.teams.value.filter(x => x[fieldName] == fieldValue);
    }
}
