import * as React from 'react';
import {DatePicker, DayOfWeek, IDatePickerStrings, 
  mergeStyleSets, PrimaryButton, Stack} from 'office-ui-fabric-react';
import { IInputs } from '../generated/ManifestTypes';
//import { stringify } from 'querystring';
//import { isDate } from 'moment';
//Import Callout, IDatePicker, TextField from office-ui-fabric-react

import TimeBoxCombo from './TimeBox';

export interface IDate {
  currentDate: Date | undefined;
  isDateOnly: boolean;
  userLanguage: number;
  userContext: ComponentFramework.Context<IInputs> ;
}
export interface IDateControlProps extends IDate{
    onDateChanged:(date:IDate) => void;

}
interface IDateControlState extends IDate{
}


const DayPickerEnglishStrings: IDatePickerStrings = {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
  
    shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  
    shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  
    goToToday: 'Go to today',
    prevMonthAriaLabel: 'Go to previous month',
    nextMonthAriaLabel: 'Go to next month',
    prevYearAriaLabel: 'Go to previous year',
    nextYearAriaLabel: 'Go to next year',
    closeButtonAriaLabel: 'Close date picker',
    monthPickerHeaderAriaLabel: '{0}, select to change the year',
    yearPickerHeaderAriaLabel: '{0}, select to change the month',
  
    isRequiredErrorMessage: 'Start date is required.',
  
    invalidInputErrorMessage: 'Invalid date format.',
  };

  const DayPickerFrenchStrings: IDatePickerStrings = {
    months: [
      'janvier',
      'février',
      'mars',
      'avril',
      'mai',
      'juin',
      'juillet',
      'août',
      'septembre',
      'octobre',
      'novembre',
      'décembre',
    ],
  
    shortMonths: ['janv', 'févr', 'mars', 'avr', 'mai', 'juin', 'juil', 'août', 'sept', 'oct', 'nov', 'déc'],
  
    days: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  
    shortDays: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
  
    goToToday: 'Aller à aujourd’hui',
    prevMonthAriaLabel: 'Aller au mois précédent',
    nextMonthAriaLabel: 'Aller au mois prochain',
    prevYearAriaLabel: 'Aller à l’année précédente',
    nextYearAriaLabel: 'Aller à l’année prochaine',
    closeButtonAriaLabel: 'Fermer date picker',
    monthPickerHeaderAriaLabel: '{0}, choisir de changer l’année',
    yearPickerHeaderAriaLabel: '{0}, sélectionnez pour changer le mois',
  
    isRequiredErrorMessage: 'La date de début est requise.',
  
    invalidInputErrorMessage: 'Format de date non valide.',
  };

  const controlClass = mergeStyleSets({
    control: {
      margin: '0 0 15px 0',
      maxWidth: '300px',
    },
  });

  const onParseDateFromString = (val: string): Date =>{
    const date = new Date(val) || new Date();
    const values = (val || '').trim().split('/');
    const day = val.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month = val.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year = val.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  }

  const onlyDate = true;


  
const desc = 'Ce champ est nécessaire. L’un des formats d’entrée de soutien est le jour du dash du mois de tiret de l’année.';

const firstDayOfWeek = DayOfWeek.Sunday;

export default class DateControl extends React.Component<IDateControlProps, IDateControlState>{
    
    constructor(props:IDateControlProps){
        super(props);
        this.state = {
            currentDate : props.currentDate,
            isDateOnly: props.isDateOnly,
            userLanguage: props.userLanguage,
            userContext: props.userContext
        };
    }

    private dateFormat = (date?:Date): string =>{
      var dateFormat = this.state.userContext.userSettings.dateFormattingInfo.shortDatePattern;
      var dateSeparator = this.state.userContext.userSettings.dateFormattingInfo.dateSeparator;
      var splitDateFormat = dateFormat.split("/");

      var firstPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[0] as string);
      var secondPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[1] as string);
      var thirdPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[2] as string);
      /*
      TO REMOVE
      console.log("firstPosition: "+ firstPosition);
      console.log("secondPosition: "+ secondPosition);
      console.log("thirdPosition: "+ thirdPosition);

      console.log("User dateFormat: "+ dateFormat);
      console.log("dateSeparator: "+ dateSeparator);
      console.log("splitDateFormat: "+ splitDateFormat);
      */
      return !date ? '' : firstPosition + dateSeparator + secondPosition + dateSeparator + thirdPosition;
    }
    
    private retrieveDateFormatValue = (date: Date, splitDateFormat: string): string =>{
      /*
      TO REMOVE
      console.log("date in retrieveDateFormateValue: "+ date);
      console.log("splitDateFormat in retrieveDateFormateValue: "+ splitDateFormat);
      */
      var dateString = "";
      if(splitDateFormat != undefined && splitDateFormat != null)
      {
        //console.log("inside first if of SplitDateFormat"); TO REMOVE
          if(splitDateFormat.toUpperCase().includes("D"))
          dateString = this.getDay(date, splitDateFormat);
        else if(splitDateFormat.toUpperCase().includes("M"))
          dateString = this.getMonth(date, splitDateFormat);
        else if(splitDateFormat.toUpperCase().includes("Y"))
          dateString = this.getFullYear(date, splitDateFormat);
      }
      return dateString;
    }
  
    private getMonth = (date: Date, format: string): string => {
      var dateMonth = date.getMonth() + 1;
      var formattedMonth = "";
      if(format != undefined && format != null)
      {
        format = format.toUpperCase();
        switch(format)
        {
          case "M":
            formattedMonth = dateMonth + "";
            break;
          case "MM":
            if(dateMonth < 10)
              formattedMonth = '0' + dateMonth;
            else
              formattedMonth = dateMonth + "";
            break;
          case "MMM":
            formattedMonth = date.toLocaleString('default',{month:'short'})
            break;
        }
      }
      return formattedMonth != "" ? formattedMonth : dateMonth +"";
    }
  
    private getDay = (date: Date, format: string): string => {
      var day = date.getDate();
      var stringDateDay = day.toString();
      var formattedDay = "";
      if(formattedDay != undefined && formattedDay != null)
      {
        format = format.toUpperCase();
        switch(format)
        {
          case "D":
            if(day < 10)
              formattedDay =  stringDateDay.substring(stringDateDay.length - 1, stringDateDay.length);
            else
              formattedDay = day.toString();
            break;
          case "DD":
            if(day < 10)
            formattedDay =  '0' + stringDateDay.substring(stringDateDay.length - 1, stringDateDay.length);
          else
            formattedDay = day.toString();
            break;
        }
      }
      return formattedDay != "" ? formattedDay : day + "";
      //return day < 10 ? '0' + day : '' + day;
    }

    private getFullYear = (date: Date, format: string): string =>{
      var fullYear = date.getFullYear();
      var stringDateYear = fullYear.toString();
      var formattedDateYear = "";
      if(format != undefined && format != null)
      {
        format = format.toUpperCase();
        switch(format)
        {
          case "YY":
            formattedDateYear = stringDateYear.substring(stringDateYear.length - 2, stringDateYear.length);
            break;
          case "YYYY":
            formattedDateYear = stringDateYear.substring(stringDateYear.length - 4, stringDateYear.length);
            break;
                
        }
      }
      return formattedDateYear != "" ? formattedDateYear : fullYear + "";
    }

    private setDate = (date:Date) =>{
      console.log(date);
      this.setState({
        currentDate: date
      }, this.onDateChanged)
    }

    private onDateChanged = () =>{
      const date: IDate={
        currentDate:this.state.currentDate,
        isDateOnly:this.state.isDateOnly,
        userLanguage:this.state.userLanguage,
        userContext: this.state.userContext
      };
      this.props.onDateChanged(date);
      
    }

    private getCurrentDate = () =>{
      //If IsDateOnly is equal to False, then we know we are dealing with DateAndTime and set isDateAndTime to true otherwise it's Date
      var isDateAndTime = this.state.isDateOnly === false ? true : false;
      var systemDate = new Date();
      var year = systemDate.getFullYear();
      var month = systemDate.getMonth();
      var day = systemDate.getDate();
      var hour = systemDate.getHours();
      var minute = systemDate.getMinutes();
      if(isDateAndTime != true) //We are dealing with Date only
      {
        //console.log("Date only"); TO REMOVE
        if(year != null && month != null && day != null && hour != null && minute != null)
        {
          this.setDate(new Date(year, month, day, hour, minute));
        }
      }
      console.log(this.dateFormat(systemDate));
    }

    render(){
        return(
            <div>
                <Stack horizontal> 
                    <Stack tokens={{childrenGap:10, padding:10}}>
                        <DatePicker 
                            className={controlClass.control}
                            isRequired={false}
                            allowTextInput={true}
                            ariaLabel={desc}
                            firstDayOfWeek={firstDayOfWeek}
                            strings = {this.state.userLanguage == 1036 ? DayPickerFrenchStrings : DayPickerEnglishStrings}
                            formatDate = {this.dateFormat}
                            parseDateFromString = {onParseDateFromString}
                            onSelectDate = {(selected => {
                              this.setState({
                                currentDate: selected ?? undefined                                
                              },this.onDateChanged)
                            })}
                            value={this.state.currentDate }
                        />
                    </Stack>
                    <Stack tokens={{childrenGap:10, padding:10}}>
                    
                      {/*<TimeBoxCombo/>*/}
                        {onlyDate ?
                          (<TimeBoxCombo 
                          currentTime = {this.state.currentDate}
                          userContext = {this.state.userContext}
                        />) : null
                        }
                        
{/*
                        <PrimaryButton 
                                text={this.state.userLanguage == 1036 ? "Date actuelle" : "Current Date"}
                                onClick={this.getCurrentDate}
                            />
*/}                          
                    </Stack>
                    <Stack tokens={{childrenGap:10, padding:10}}>
                        <PrimaryButton 
                                text={this.state.userLanguage == 1036 ? "Date actuelle" : "Current Date"}
                                onClick={this.getCurrentDate}
                            />
                    </Stack>
                </Stack>
                
            </div>
        )
    }
}
