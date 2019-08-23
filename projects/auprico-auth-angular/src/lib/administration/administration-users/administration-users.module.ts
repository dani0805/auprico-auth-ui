import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationUsersComponent } from './administration-users.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import {ICommonModule} from '../../common/common.module';
// import { UserTemplateVisualizationComponent } from '../visualization/user-template-visualization/user-template-visualization.component';

@NgModule({
    imports: [
      CommonModule,
      ICommonModule,
      FormsModule,
      ReactiveFormsModule

    ],
    declarations: [AdministrationUsersComponent, CreateUserComponent],
    exports: [],
    providers: [],
    entryComponents: [CreateUserComponent],
  })
  export class AdministrationUsersModule { }

