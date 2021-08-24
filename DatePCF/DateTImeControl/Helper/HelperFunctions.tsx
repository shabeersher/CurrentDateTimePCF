import { Context } from "vm";
import { IInputs } from "../../generated/ManifestTypes";

export class HelperFunctions{
    /*
    public static timeFormat = (userContext: ComponentFramework.Context<IInputs>, selectedTimeText: string) =>{
        var timeFormat = userContext.userSettings.dateFormattingInfo.shortDatePattern;
        //var timeFormat = this.state.userContext.userSettings.dateFormattingInfo.shortTimePattern;
        console.log("TimeFormat: "+ timeFormat);
        var timeSeparator = userContext.userSettings.dateFormattingInfo.timeSeparator;
        //var timeSeparator = this.state.userContext.userSettings.dateFormattingInfo.timeSeparator;
        var splitTimeFormat = timeFormat.split(timeSeparator);
        var selectedTimeText = selectedTimeText;
  
        var formattedTime = HelperFunctions.retrieveTimeFormatValue(selectedTimeText, splitTimeFormat[0], timeSeparator);
        return formattedTime[0] == "false" ? formattedTime[1] + timeSeparator + formattedTime[2] +" "+ formattedTime[3] 
        : formattedTime[1] + timeSeparator + formattedTime[2];
      }
*/
/*
        public static timeFormat = (userContext: ComponentFramework.Context<IInputs>,selectedTimeText: string, is24Hour: boolean) =>{
            var timeFormat = userContext.userSettings.dateFormattingInfo.shortTimePattern;
            console.log("TimeFormat: "+ timeFormat);
            var timeSeparator = userContext.userSettings.dateFormattingInfo.timeSeparator;

            var formattedTime = HelperFunctions.retrieveTimeFormatValue(selectedTimeText as string, timeSeparator, is24Hour);
            return is24Hour == false ? formattedTime[0] +" "+ timeSeparator +" "+ formattedTime[1] +" "+ formattedTime[2] 
            : formattedTime[0] +" "+ timeSeparator +" "+ formattedTime[1];
        }
*/
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
                suffix = timeHour >= 12 ? "PM":"AM";
                time12Hour = timeHour < 10 ? '0'+timeHour : timeHour;
                timeMinute = localDate?.getMinutes() as number < 10 ? '0'+localDate?.getMinutes() : localDate?.getMinutes();
            }

            //var suffix = timeHour  >= 12 ? "PM":"AM";
            //var hours = ((timeHour  + 11) % 12 + 1);
            //var getHour = hours < 10 ? '0' +hours : hours;
            		
            return is24Hour == true ? time24Hour+" "+timeSeparator+" "+timeMinute : time12Hour+" "+timeSeparator+" "+timeMinute+" "+suffix;
          }
      public static retrieveTimeFormatValue = (time: string, timeSeparator:string, is24Hour: boolean):string[] => {
        console.log("retrieveTimeFormatValue: "+time)
        var hour = '', minute = '', amPM='';
        if(timeSeparator != undefined && timeSeparator != null)
        {
  
          if(is24Hour == false)
          {
            hour = HelperFunctions.convertHourToMilitary(time.split(timeSeparator)[0]);
            minute = time.split(timeSeparator)[1].split(" ")[0];
            amPM = time.split(timeSeparator)[1].split(" ")[1];
          }
          else if(is24Hour == true)
          {
            hour = time.split(timeSeparator)[0];
            minute = time.split(timeSeparator)[1];
          }
        }
        return is24Hour == false ? [hour, minute, amPM] : [hour, minute];
      }

      public static isMilitaryTime = (userContext:ComponentFramework.Context<IInputs>):boolean =>
      {
        var timeFormat = userContext.userSettings.dateFormattingInfo.shortTimePattern;
        var timeSeparator = userContext.userSettings.dateFormattingInfo.timeSeparator;
        var splitTimeFormat = timeFormat.split(timeSeparator);
        var is24Hour = true;
        console.log("Inside HelperFunction.isMilitaryTime.TimeFormat: "+timeFormat);
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

      public static convertHourToMilitary = (hours:string) =>{
        let convertedHour = '';  
        if(hours === '12')
        {
            convertedHour = '00';
        }
        else
        {
            convertedHour = parseInt(hours, 10) + 12 +'';
        }
        return convertedHour;
      }
}
