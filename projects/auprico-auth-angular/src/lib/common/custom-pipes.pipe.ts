import { Pipe} from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'DateCheckerNoHour'
  })
  export class DateCheckerNoHour extends DatePipe {
  
    transform(date: Date): string {
      let parseDate = "";
      if(date){
        parseDate = super.transform(date, 'dd MMM yyyy');
      }
      
      return parseDate;
    }
  }