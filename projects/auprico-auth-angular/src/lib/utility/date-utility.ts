

export class DateUtility {
    
        public static deserializeDate(serializedValue: string | Date): Date {
            var msec: number;
            if (serializedValue instanceof Date) {
                msec = serializedValue.getTime();
            } else {
                msec = Date.parse(serializedValue);
            }
            var res: Date;
            if (isNaN(msec)) {
                res = null; // since json() already uses null and not undefined when deserializing
                if (serializedValue) {
                    console.error("Error deserilizing date: ", serializedValue);
                }
            } else {
                res = new Date(msec);
            }
            return res;
        }
    
        public static greaterThan(date1: Date, date2: Date): boolean{
            if(date1 !== undefined){
                if(date2 !== undefined){
                    if(date1.getTime() > date2.getTime()){
                        return true;
                    }                    
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
    