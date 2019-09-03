import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {
    MatDialog,
    MatSort,
    MatPaginator,
} from '@angular/material';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {CreateTeamComponent} from '../create-team/create-team.component';
import {TeamService} from '../../model/team/team.service';
import {TeamsDataSource} from '../../model/team/data-source';
import {BTeam} from '../../model/team/team';

@Component({
    selector: 'lib-administration-teams',
    templateUrl: './administration-teams.component.html',
    styleUrls: ['./administration-teams.component.scss'],
    providers: [TeamService]
})

export class AdministrationTeamsComponent implements AfterViewInit, OnInit {
    dataSource: TeamsDataSource;
    displayedColumns = ['id', 'code', 'name', 'parent_team'];
    searchString = '';
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Set the sort after the view init since this component will
     * be able to query its view for the initialized sort.
     */
    constructor(private modalService: MatDialog,
                private teamService: TeamService,
                private router: Router) {
    }

    ngOnInit() {
        this.dataSource = new TeamsDataSource(this.teamService);
        this.dataSource.loadTeams();
    }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadTeamsPage())
            )
            .subscribe();
    }

    searchChanged() {
        this.paginator.pageIndex = 0;
        this.loadTeamsPage();
    }

    loadTeamsPage() {
        // console.log(this.searchString);
        this.dataSource.loadTeams(
            this.searchString,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    administrateTeam(team: BTeam) {
        this.router.navigate(['administration', 'team', team.pk()]);
    }

    openNewTeamCreation() {
        // var authRequest = this.addAuthRequest()

        const modalRef = this.modalService.open(CreateTeamComponent, {width: '50%', height: 'fit-content'});
        modalRef.componentInstance.dialogRef = modalRef;
    }

}
