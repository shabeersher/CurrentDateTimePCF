import { IComboBoxOption } from "office-ui-fabric-react";
import { IInputs } from "../../generated/ManifestTypes";

/**
 * Displays the 12Hour clock in the Time section Formatted with a colon
 */
 export const display12HoursFormatA:IComboBoxOption[] = []
 {
    display12HoursFormatA.push(
     { key: '00', text: '12:00 AM' },
     { key: '0030', text: '12:30 AM' }
   )
 
     for(var hour=1; hour< 12; hour+=1){
         for(var interval=0; interval<60; interval+=30){
             if(interval > 30)
                 continue;
             var hourText = hour < 10 ? '0'+hour : hour;
             var uniqueKey = hour+''+interval+'am';
             var intervalText = interval == 0 ? '00' : interval;
             var time = hourText+':'+intervalText+' AM';
             display12HoursFormatA.push(
                 {key:uniqueKey, text:time}
             );
         }
     }
     display12HoursFormatA.push(
       { key: '12', text: '12:00 PM' },
       { key: '1230', text: '12:30 PM' }
     )
     for(var hour=1; hour< 12; hour+=1){
       for(var interval=0; interval<60; interval+=30){
           if(interval > 30)
               continue;
           var hourText = hour < 10 ? '0'+hour : hour;
           var uniqueKey = hour+''+interval+'pm';
           var intervalText = interval == 0 ? '00' : interval;
           var time = hourText+':'+intervalText+' PM';
           display12HoursFormatA.push(
               {key:uniqueKey, text:time}
           );
       }
   }
 }

 /**
 * Displays the 12Hour clock in the Time section Formatted with a dot
 */
 export const display12HoursFormatB:IComboBoxOption[] = []
 {
    display12HoursFormatB.push(
     { key: '00', text: '12.00 AM' },
     { key: '0030', text: '12.30 AM' }
   )
 
     for(var hour=1; hour< 12; hour+=1){
         for(var interval=0; interval<60; interval+=30){
             if(interval > 30)
                 continue;
             var hourText = hour < 10 ? '0'+hour : hour;
             var uniqueKey = hour+''+interval+'am';
             var intervalText = interval == 0 ? '00' : interval;
             var time = hourText+'.'+intervalText+' AM';
             display12HoursFormatB.push(
                 {key:uniqueKey, text:time}
             );
         }
     }
     display12HoursFormatB.push(
       { key: '12', text: '12.00 PM' },
       { key: '1230', text: '12.30 PM' }
     )
     for(var hour=1; hour< 12; hour+=1){
       for(var interval=0; interval<60; interval+=30){
           if(interval > 30)
               continue;
           var hourText = hour < 10 ? '0'+hour : hour;
           var uniqueKey = hour+''+interval+'pm';
           var intervalText = interval == 0 ? '00' : interval;
           var time = hourText+'.'+intervalText+' PM';
           display12HoursFormatB.push(
               {key:uniqueKey, text:time}
           );
       }
   }
 }

 /**
 * Displays the 24Hour clock in the Time section Formatted with a colon
 */
export const display24HoursFormatA:IComboBoxOption[] = []
{
    for(var hour=0; hour<= 23; hour+=1){
        for(var interval=0; interval<60; interval+=30){
            if(interval > 30)
                continue;
            var hourText = hour < 10 ? '0'+hour : hour;
            var uniqueKey = hourText+''+interval;
            var intervalText = interval == 0 ? '00' : interval;
            var time = hourText+':'+intervalText;
            display24HoursFormatA.push(
                {key:uniqueKey, text:time}
            );
        }
    }
}

 /**
 * Displays the 24Hour clock in the Time section Formatted with a dot
 */
  export const display24HoursFormatB:IComboBoxOption[] = []
  {
      for(var hour=0; hour<= 23; hour+=1){
          for(var interval=0; interval<60; interval+=30){
              if(interval > 30)
                  continue;
              var hourText = hour < 10 ? '0'+hour : hour;
              var uniqueKey = hourText+''+interval;
              var intervalText = interval == 0 ? '00' : interval;
              var time = hourText+'.'+intervalText;
              display24HoursFormatB.push(
                  {key:uniqueKey, text:time}
              );
          }
      }
  }

 export class HelperFunctions{
    public static getCurrentTimeFromDateTime = (localDate: Date, timeSeparator: string, is24Hour: boolean) =>{
        var hour = localDate?.getHours();
        var time24Hour,timeHour, suffix ='', timeMinute, time12Hour;
        if(is24Hour == true)
        {

            time24Hour = hour < 10 ? '0' + hour : hour;
            timeMinute = localDate?.getMinutes() as number < 10 ? '0'+localDate?.getMinutes() : localDate?.getMinutes();
        }
        else
        {
            timeHour = ((hour  + 11) % 12 + 1)
            suffix = hour >= 12 ? "PM":"AM";
            time12Hour = timeHour < 10 ? '0'+timeHour : timeHour;
            timeMinute = localDate?.getMinutes() as number < 10 ? '0'+localDate?.getMinutes() : localDate?.getMinutes();
        }          		
        return is24Hour == true ? time24Hour+timeSeparator+timeMinute : time12Hour+timeSeparator+timeMinute+" "+suffix;
        }
      public static isMilitaryTime = (userContext:ComponentFramework.Context<IInputs>):boolean =>
      {
        var timeFormat = userContext.userSettings.dateFormattingInfo.shortTimePattern;
        //var timeSeparator = userContext.userSettings.dateFormattingInfo.timeSeparator;
        var splitTimeFormat = timeFormat.split(':');
        var is24Hour = true;
        if(splitTimeFormat.includes("h") || splitTimeFormat.includes("hh"))
        {
            is24Hour = false;
        }
        else if(splitTimeFormat.includes("H") || splitTimeFormat.includes("HH"))
        {
            is24Hour = true;
        }
        return is24Hour;
      }

         /**
         * Method is responsible for converting 12H time into military time
         * @param time12h 12H time to be converted to military time
         * @returns Array with Military hour and minute
         */
        public static convertTimeToMilitaryTime = (time12h:string, timeSeparator:string) =>{
        const [time, modifier] = time12h.split(' ');
        
        let [hours, minutes] = time.split(timeSeparator);
      
        if (hours === '12') {
          hours = '00';
        }    
        if (modifier === 'PM') {
          hours = parseInt(hours, 10) + 12 +'';
        }
        return [hours, minutes];
      }
      
}
