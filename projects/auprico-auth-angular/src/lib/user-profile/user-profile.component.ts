import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MatDialog } from '@angular/material';
import {BaseComponent} from '../common/base-component/base-component.module';
import {BUser} from '../model/user/user';
import {SingleUserService} from '../model/user/user.service';
import {AupricoAuthAngularService} from '../auprico-auth-angular.service';

@Component({
    selector: 'lib-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseComponent implements OnInit {
    user: BUser;
    userId: number;

    mode = 'user';

    isPersonalSettings = false;
    isRefreshingAuth = false;

    constructor(private singleUserService: SingleUserService,
                private authService: AupricoAuthAngularService,
                private route: ActivatedRoute, private matDialog: MatDialog) {
        super();
    }

    ngOnInit() {
        this.safeSubscribe(this.singleUserService.user, u => {
            if (!u) {
                return;
            }
            this.user = u;
        });
        this.safeSubscribe(this.authService.user, authUser => {
            if (authUser && this.isRefreshingAuth) {
                this.loadUserDataFromAuth(authUser);
            }
        });

        this.route.params.subscribe(params => {
            const authUser = this.authService.user.getValue();
            if (!authUser) {
                this.isRefreshingAuth = true;
                this.authService.fetchLoggedInUser();
                return;
            }
            if (params.id) {
                this.userId = parseInt(params.id);
            }
            this.loadUserDataFromAuth(authUser);
        });
        // // check if help for switch user-team should be presented
        // let presentHelpUserTeam = localStorage.getItem('help-user-team-switch');
        // if (presentHelpUserTeam == undefined || JSON.parse(presentHelpUserTeam) == false) {
        //     this.matDialog.open(SwitchUserTeamHelpComponent);
        // }
    }

    loadUserDataFromAuth(authUser: BUser) {
        if (this.userId && this.userId != authUser.pk()) {
            this.singleUserService.performQueryWithID(this.userId);
        } else {
            this.isPersonalSettings = true;
            this.singleUserService.performQuery(authUser.id);
        }
    }

}
