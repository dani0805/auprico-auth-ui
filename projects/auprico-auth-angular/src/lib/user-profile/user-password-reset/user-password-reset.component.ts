import {Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {MatDialog} from '@angular/material';
import {BUser} from '../../model/user/user';
import {BaseComponent} from '../../common/base-component/base-component.module';
import {SingleUserService, UserEditPasswordService} from '../../model/user/user.service';
import {ExceptionHandlerService} from '../../common/exception-handler/exception-handler.service';

@Component({
    selector: 'lib-user-password-reset',
    templateUrl: './user-password-reset.component.html',
    styleUrls: ['./user-password-reset.component.scss']
})
export class UserPasswordResetComponent extends BaseComponent implements OnInit {
    _user: BUser;
    password: string;
    repeatPassword: string;

    get user(): BUser {
        return this._user;
    }

    @Input() set user(user: BUser) {
        this._user = user;
    }

    constructor(private userEditService: UserEditPasswordService,
                private modalService: MatDialog,
                private changeDetector: ChangeDetectorRef,
                private singleUserService: SingleUserService,
                private exceptionHandlerService: ExceptionHandlerService) {
        super();

    }

    ngOnInit() {
        this.safeSubscribe(this.singleUserService.user, u => {
            if (!u) {
                return;
            }
            this.user = u;
        });
    }

    save() {

        if (this.password != this.repeatPassword) {
            this.exceptionHandlerService.errorStream.next('New password and repeated password are not the same.');
        } else {

            const data = {};
            const fields = ['id'];
            for (const field of fields) {
                data[field] = this.user[field];
            }
            data['password'] = this.password;

            this.saveAsEdit(data);

        }
    }

    saveAsEdit(data: Object) {
        this.userEditService.user.next(data);
        this.userEditService.response.subscribe(changedUser => {
            if (changedUser) {
                this.user = changedUser;
            }
        });
    }

}
