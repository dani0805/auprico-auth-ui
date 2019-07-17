import { Component, Input, OnInit} from '@angular/core';
import {VersionedModel} from "../model/versioned-model";

@Component({
  selector: 'lib-versioned-input',
  templateUrl: './versioned-input.component.html',
  styleUrls: ['./versioned-input.component.css']
})
export class VersionedInputComponent implements OnInit {
  @Input() versionedModel: VersionedModel;

  constructor() { }

  ngOnInit() {
  }

}
