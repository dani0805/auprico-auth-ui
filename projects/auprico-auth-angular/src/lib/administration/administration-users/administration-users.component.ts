import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';

import {
    MatDialog,
    MatSort,
    MatPaginator,
} from '@angular/material';
import {Router} from '@angular/router';
import {CreateUserComponent} from '../create-user/create-user.component';
import {tap} from 'rxjs/operators';
import {merge} from 'rxjs';
import {UserService} from '../../model/user/user.service';
import {UsersDataSource} from '../../model/user/data-source';
import {BUser} from '../../model/user/user';

@Component({
    selector: 'lib-administration-users',
    templateUrl: './administration-users.component.html',
    styleUrls: ['./administration-users.component.scss'],
    providers: [UserService]
})

export class AdministrationUsersComponent implements AfterViewInit, OnInit {
    dataSource: UsersDataSource;
    displayedColumns = ['id', 'username', 'first_name', 'last_name'];
    searchString = '';
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    /**
     * Set the sort after the view init since this component will
     * be able to query its view for the initialized sort.
     */
    constructor(private modalService: MatDialog,
                private userService: UserService,
                private router: Router) {
    }

    ngOnInit() {
        this.dataSource = new UsersDataSource(this.userService);
        this.dataSource.loadUsers();
    }

    ngAfterViewInit() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadUsersPage())
            )
            .subscribe();
    }

    searchChanged() {
        this.paginator.pageIndex = 0;
        this.loadUsersPage();
    }

    loadUsersPage() {
        // console.log(this.searchString);
        this.dataSource.loadUsers(
            this.searchString,
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    administrateUser(user: BUser) {
        this.router.navigate(['administration', 'user', user.pk()]);
    }

    openNewUserCreation() {
        // var authRequest = this.addAuthRequest()

        const modalRef = this.modalService.open(CreateUserComponent, {width: '50%', height: 'fit-content'});
        modalRef.componentInstance.dialogRef = modalRef;
    }

}
