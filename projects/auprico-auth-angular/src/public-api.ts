/*
 * Public API Surface of auprico-auth-angular
 */


import {MessageHandlerService} from './lib/common/message-handler/message-handler.service';

export * from './lib/auprico-auth-angular.service';
export * from './lib/url-resolver.service';
export * from './lib/auprico-auth-angular.module';

export { BAddress } from './lib/model/address/address';
export { BCountry } from './lib/model/country/country';
export { BEmail } from './lib/model/email/email';
export { BLanguage } from './lib/model/language/language';
export { BPhone } from './lib/model/phone/phone';
export { LoginComponent } from './lib/login/login.component';
export { BaseComponent } from './lib/common/base-component/base-component.module';
export { DateCheckerNoHour } from './lib/common/custom-pipes.pipe';
// user
export { BUser, genderChoices, titleChoices } from './lib/model/user/user';
export { fragment as userFragment } from './lib/model/user/user';
export { UsersDataSource } from './lib/model/user/data-source';
export { AdministrationUsersComponent } from './lib/administration/administration-users/administration-users.component';
export { UserProfileComponent } from './lib/user-profile/user-profile.component';
// team
export { BTeam } from './lib/model/team/team';
export { fragment as teamFragment } from './lib/model/team/team';
export { TeamsDataSource } from './lib/model/team/data-source';
export { AdministrationTeamsComponent } from './lib/administration/administration-teams/administration-teams.component';
export { TeamProfileComponent } from './lib/team-profile/team-profile.component';

// services
export * from './lib/model/user/user.service';
export * from './lib/model/team/team.service';
export { MessageHandlerService } from './lib/common/message-handler/message-handler.service';


// modules
export {AdministrationUsersModule} from './lib/administration/administration-users/administration-users.module';
export {AdministrationTeamsModule} from './lib/administration/administration-teams/administration-teams.module';
export {UserProfileModule} from './lib/user-profile/user-profile.module';
export {TeamProfileModule} from './lib/team-profile/team-profile.module';
export {ICommonModule} from './lib/common/common.module';

