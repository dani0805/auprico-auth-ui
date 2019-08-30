import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MatDialogRef } from '@angular/material';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {  } from 'events';
import {BAddress} from '../../model/address/address';
import {BCountry} from '../../model/country/country';
// import {CountryService} from '../../model/country/country.service';

@Component({
  selector: 'lib-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  _address: BAddress;
  initialAddress: BAddress;
  countries: BCountry[];
  dialogRef: MatDialogRef<UserAddressComponent>;
  @Input() isInjected = false;
  addressGroup = new FormGroup({
    label: new FormControl('', [Validators.required]),
    address1: new FormControl('', [Validators.required]),
    zipCode: new FormControl('', [Validators.maxLength(10)])
  });
  // if a default country is available, when an address is edited, default country is used if empty
  @Input() defaultCountryId: string;

  // for now, saved locally
  labelOptions: string[] = ['Home', 'Hospital', 'Office'];
  @Output() countryHasChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() ngModelChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    // private countryService: CountryService
  ) {}

  ngOnInit() {
    // this.countryService.values.subscribe(countries => {
    //   this.countries = countries;
    // });
    // this.countryService.refreshIfEmpty();
  }

  @Input()
  set address(address: BAddress) {
    if (!address.country && this.defaultCountryId) {
      address.country = new BCountry({'id': this.defaultCountryId});
    }
    this._address = address;
    this.initialAddress = Object.assign(new BAddress(''), address);
  }

  get address(): BAddress {
    return this._address;
  }

  triggerCountryChange() {
    this.countryHasChanged.emit(true);
    this.triggerChange();
  }

  triggerChange() {
    this.ngModelChange.emit(true);
  }

}
