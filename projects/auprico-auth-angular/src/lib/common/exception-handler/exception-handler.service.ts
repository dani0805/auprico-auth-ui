import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GenericDialogComponent } from '../generic-dialog/generic-dialog.component';

@Injectable()
export class ExceptionHandlerService {
  /**
   * Simple classe used to handle exception message in the application
   */

  errorStream: Subject<string> = new Subject<string>();

  constructor(private snackBar: MatSnackBar, private matDialog: MatDialog) {

    this.errorStream.subscribe( errorMsg => {
      console.error(errorMsg);
      let errorDisplay = 'Something went wrong, please contact the support.';
      if (errorMsg !== undefined && errorMsg !== '') {
        errorDisplay = errorMsg;
      }
      this.snackBar.open(errorDisplay, '', {
        duration: 3000, verticalPosition: 'bottom'
      });
    });

  }

  openDialogError(title: string, error: any) {
    const dialogError = this.matDialog.open(GenericDialogComponent, {width: '60%'});
    dialogError.componentInstance.message = error;
    dialogError.componentInstance.isCancelAvailable = false;
    dialogError.componentInstance.saveButtonLabel = 'Close';
    dialogError.componentInstance.title = title;
    dialogError.componentInstance.response.subscribe(() => {
      dialogError.close();
    });
  }

}
