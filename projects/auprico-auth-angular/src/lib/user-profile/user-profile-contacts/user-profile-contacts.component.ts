import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {BaseComponent} from '../../common/base-component/base-component.module';
import {BUser, genderChoices, titleChoices} from '../../model/user/user';
import {BLanguage} from '../../model/language/language';
import {UserEditService} from '../../model/user/user.service';
import {BEmail} from '../../model/email/email';
import {BPhone} from '../../model/phone/phone';
import {BAddress} from '../../model/address/address';

@Component({
  selector: 'lib-user-profile-contacts',
  templateUrl: './user-profile-contacts.component.html',
  styleUrls: ['./user-profile-contacts.component.scss']
})



export class UserProfileContactsComponent extends BaseComponent implements OnInit {
  _user: BUser;
  genderChoices = genderChoices;
  titleChoices = titleChoices;
  languages: BLanguage[];
  selectedLanguageId: string;
  // territories: BTerritory[];
  selectedTerritoryId: string;
  // for now, saved locally
  emailLabelOptions: string[] = ['Home', 'Hospital', 'Office'];
  phoneLabelOptions: string[] = ['Home', 'Hospital', 'Office', 'Fax'];
  labelOptionsVisible = false;
  labelSelected = false;

  // this is needed to handle dynamic creation of form controls for contacts
  formControlContactIndex = 0;
  // search handler
  searchGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl('', [Validators.required]),
    institution: new FormControl()
  });

  // alignments

  // dataSource: AlignmentElement[];
  // displayedColumns = ['alignment', 'geography'];

  get user(): BUser {
    return this._user;
  }

  @Input() set user(user: BUser) {
    this._user = user;

    // // assign form controls to emails
    for (const email of this.user.emails) {
      email['formControl'] = new FormControl('', [Validators.email]);
      email['formControlIndex'] = this.formControlContactIndex.toString();
      this.formControlContactIndex += 1;
      this.searchGroup.addControl( 'email' + email['formControlIndex'], email['formControl']);
    }
    for (let phone of this.user.phones) {
      phone["formControl"] = new FormControl();
      phone["formControlIndex"] = this.formControlContactIndex.toString();
      this.formControlContactIndex += 1;
      this.searchGroup.addControl( 'phone' + phone["formControlIndex"], phone["formControl"]);
    }
    //
    // if (this._user.language){
    //   this.selectedLanguageId = this._user.language.id;
    // } else {
    //   this.selectedLanguageId = undefined;
    // }


  }

  constructor(private userEditService: UserEditService,
              // private languageService: LanguageService
  ) {
      super();
  }

  ngOnInit() {

    // this.safeSubscribe(this.languageService.values,languages => {
    //   this.languages = languages;
    //   if (this._user && this._user.language) {
    //     this.selectedLanguageId = this._user.language.id;
    //   }
    // });
    // this.languageService.refreshIfEmpty();

    this.safeSubscribe(this.userEditService.response, changedUser => {
      this.user = changedUser;
    });
  }

  allowSave(user: BUser): boolean {
    if (!user) {
      return false;
    }
    // check errors in form controls
    for(let key in this.searchGroup.controls){
      if(this.searchGroup.controls[key].hasError('required')){
        return false;
      }
    }
  }

  notValidEmail(email: BEmail): boolean {
    return !email.isDeleted && ((!email.label && !!email.val) || (!!email.label && !email.val));
  }

  notValidPhone(phone: BPhone): boolean {
    return !phone.isDeleted && ((!phone.label && !!phone.val) || (!!phone.label && !phone.val))
  }

  fieldImported(field: any): boolean {
    if (field == undefined) {
      return false;
    }
    return field.importedId != undefined;
  }

  refreshValidationErrors() {
  }

  save() {
    const data = {};
    const fields = ['id', 'gender', 'title', 'firstName', 'lastName',
      // , "emails", "phones", "addresses", "suggestions",
      // "keyOpinionLeader", "hcpVerified"
    ];
    for (const field of fields) {
      data[field] = this.user[field];
    }
    if (this.selectedLanguageId) {
      data['languageId'] = this.selectedLanguageId;
    }

    // remove form control stuff from the object
    // for (let contactField of ["emails", "phones"]) {
    //   for (let obj of data[contactField]) {
    //     delete obj["formControl"];
    //   }
    // }

    // data["emails"] = JSON.stringify(data["emails"]);
    // data["phones"] = JSON.stringify(data["phones"]);
    // data["addresses"] = JSON.stringify(data["addresses"]);
    // data["suggestions"] = JSON.stringify(data["suggestions"]);

    console.log('data', data)

    this.saveAsEdit(data);
  }

  saveAsEdit(data: Object) {
    this.userEditService.editUser(data);
  }

  addContact(contactType: string) {
    if (contactType == 'phone') {
      const newPhone = new BPhone('');
      newPhone['formControl'] = new FormControl();
      newPhone['formControlIndex'] = this.formControlContactIndex.toString();
      this.formControlContactIndex += 1;
      this.searchGroup.addControl("phone" + newPhone["formControlIndex"], newPhone["formControl"]);
      this.user.phones.push(newPhone);
    }
    if (contactType == "email") {
      var newEmail = new BEmail("");
      newEmail["formControl"] = new FormControl();
      newEmail["formControlIndex"] = this.formControlContactIndex.toString();
      this.formControlContactIndex += 1;
      this.searchGroup.addControl("email" + newEmail["formControlIndex"], newEmail["formControl"]);
      this.user.emails.push(newEmail);
    }
    if (contactType == "address") {
      this.user.addresses.push(new BAddress(''));
    }
  }

  setPreferred(contact: BPhone | BEmail | BAddress) {
    for (const email of this.user.emails) {
      email.isMain = false;
    }
    for (const phone of this.user.phones) {
      phone.isMain = false;
    }
    for (const address of this.user.addresses) {
      address.isMain = false;
    }
    contact.isMain = true;
  }

  deleteContact(contact: BPhone | BEmail | BAddress) {
    if (contact.importedId) {
      return;
    } else {
    contact.isDeleted = true;
    }
  }

  contactsCount(user: BUser): number {
    let count = 0;
    for (const email of user.emails) {
      if (email && email.val) {
        count += 1;
      }
    }
    for (const phone of user.phones) {
      if (phone && phone.val) {
        count += 1;
      }
    }
    for (const address of user.addresses) {
      if (address && address.addressDescription != '') {
        count += 1;
      }
    }
    return count;
  }

  checkPreferredChannel(contact: BEmail | BPhone | BAddress) {
    if (this.contactsCount(this.user) == 1 && !contact.isMain) {
      contact.isMain = true;
    }
  }

  switchContactControl(contact: any){
    if (contact.importedId) {
      return // if the contact is important, it can't been edited
    }
    if (!contact.label) {
      contact.label = "Office";
    }
    contact['edit'] = true;
    if(contact instanceof BEmail){
      this.user.emails.forEach(x => {
        if(x !== contact){
          x['edit'] = false;
        }
      });
      this.user.phones.forEach(x => x['edit'] = false);
      this.user.addresses.forEach(x => x['edit'] = false);
    }
    if(contact instanceof BPhone){
      this.user.phones.forEach(x => {
        if(x !== contact){
          x['edit'] = false;
        }
      });
      this.user.emails.forEach(x => x['edit'] = false);
      this.user.addresses.forEach(x => x['edit'] = false);
    }
    if(contact instanceof BAddress){
      this.user.addresses.forEach(x => {
        if(x !== contact){
          x['edit'] = false;
        }
      });
      this.user.emails.forEach(x => x['edit'] = false);
      this.user.phones.forEach(x => x['edit'] = false);
    }
  }

}
