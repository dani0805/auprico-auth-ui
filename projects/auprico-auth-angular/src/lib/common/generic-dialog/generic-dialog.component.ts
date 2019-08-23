import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'lib-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.css']
})
export class GenericDialogComponent implements OnInit {

  response = new Subject<boolean>();
  checkbox = new Subject<boolean>();
  @Input() title: string;
  @Input() message: string;
  @Input() cancelButtonLabel: string;
  @Input() saveButtonLabel: string;
  @Input() isCancelAvailable: boolean;
  @Input() isCheckboxAvailable: boolean;
  checkboxValue: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  saveResponse(response) {
    this.response.next(response);
  }
}
