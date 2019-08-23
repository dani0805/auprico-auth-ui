/*
 * Public API Surface of auprico-auth-angular
 */


import {MessageHandlerService} from "./lib/common/message-handler/message-handler.service";

export * from './lib/auprico-auth-angular.service';
export * from './lib/url-resolver.service';
export * from './lib/auprico-auth-angular.module';

// models
export { BAddress } from './lib/model/address/address';
export { BCountry } from './lib/model/country/country';
export { BEmail } from './lib/model/email/email';
export { BLanguage } from './lib/model/language/language';
export { BPhone } from './lib/model/phone/phone';
export { BUser, genderChoices, titleChoices } from './lib/model/user/user';
export { fragment as userFragment } from './lib/model/user/user';
export { UsersDataSource } from './lib/model/user/data-source';
export { LoginComponent } from './lib/login/login.component';
export { AdministrationUsersComponent } from './lib/administration/administration-users/administration-users.component';
export { UserProfileComponent } from './lib/user-profile/user-profile.component';
export { BaseComponent } from './lib/common/base-component/base-component.module';
export { DateCheckerNoHour } from './lib/common/custom-pipes.pipe';

// services
export * from './lib/model/user/user.service';
export { MessageHandlerService } from './lib/common/message-handler/message-handler.service';


// modules
export {AdministrationUsersModule} from './lib/administration/administration-users/administration-users.module';
export {UserProfileModule} from './lib/user-profile/user-profile.module';
export {ICommonModule} from './lib/common/common.module';

