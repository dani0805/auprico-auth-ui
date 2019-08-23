import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class MessageHandlerService {
  /**
   * Simple classe similar to exception handling to present the message, it can be use for specific message
   */

  messageStream: Subject<string> = new Subject<string>();

  constructor(private snackBar: MatSnackBar) { 

    this.messageStream.subscribe( msg => {
      this.snackBar.open(msg, "", {
        duration: 2500, verticalPosition: "bottom"
      });
    });
  }

}