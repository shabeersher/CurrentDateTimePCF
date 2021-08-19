import * as React from 'react';
import {ComboBox, DatePicker, DayOfWeek, IComboBoxOption, IComboBoxProps, IDatePickerStrings, 
  mergeStyles, 
  mergeStyleSets, PrimaryButton, Stack} from 'office-ui-fabric-react';
import { IInputs } from '../generated/ManifestTypes';
//import { stringify } from 'querystring';
//import { isDate } from 'moment';
//Import Callout, IDatePicker, TextField from office-ui-fabric-react

//import TimeBoxCombo from './TimeBox';
//import { useState } from 'react';

export interface IDate {
  currentDate: Date | undefined;
  isDateOnly: boolean;
  userLanguage: number;
  userContext: ComponentFramework.Context<IInputs> ;
  isButtonClicked:string;
  selectedTimeKey?: { key: string | number | undefined };
  selectedTimeText?: string;
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

  
const desc = 'Ce champ est nécessaire. L’un des formats d’entrée de soutien est le jour du dash du mois de tiret de l’année.';

const firstDayOfWeek = DayOfWeek.Sunday;

const display12Hours:IComboBoxOption[] = []
{
  display12Hours.push(
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
            display12Hours.push(
                {key:uniqueKey, text:time}
            );
        }
    }
    display12Hours.push(
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
          display12Hours.push(
              {key:uniqueKey, text:time}
          );
      }
  }
}
const display24Hours:IComboBoxOption[] = []
{
    for(var hour=0; hour<= 23; hour+=1){
        for(var interval=0; interval<60; interval+=30){
            if(interval > 30)
                continue;
            var hourText = hour < 10 ? '0'+hour : hour;
            var uniqueKey = hour+''+interval;
            var intervalText = interval == 0 ? '00' : interval;
            var time = hourText+' : '+intervalText;
            display24Hours.push(
                {key:uniqueKey, text:time}
            );
        }
    }
}

const wrapperClassName = mergeStyles({
  display: 'flex',
  selectors: {
    '& > *': { marginRight: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' },
  },
});


export default class DateControl extends React.Component<IDateControlProps, IDateControlState>{
    
    constructor(props:IDateControlProps){
        super(props);
        this.state = {
            currentDate : props.currentDate,
            isDateOnly: props.isDateOnly,
            userLanguage: props.userLanguage,
            userContext: props.userContext,
            isButtonClicked: props.isButtonClicked,
            selectedTimeKey: props.selectedTimeKey,
            selectedTimeText: props.selectedTimeText
        };
        
    }

    changeState = () =>{
      this.setState({isButtonClicked:"true"})
    };

    private dateFormat = (date?:Date): string =>{
      var dateFormat = this.state.userContext.userSettings.dateFormattingInfo.shortDatePattern;
      var dateSeparator = this.state.userContext.userSettings.dateFormattingInfo.dateSeparator;
      var splitDateFormat = dateFormat.split("/");

      var firstPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[0] as string);
      var secondPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[1] as string);
      var thirdPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[2] as string);
      return !date ? '' : firstPosition + dateSeparator + secondPosition + dateSeparator + thirdPosition;
    }
    
    private retrieveDateFormatValue = (date: Date, splitDateFormat: string): string =>{
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

    private setDate = (date:Date, value:string) =>{
      console.log(date);
      this.setState({
        currentDate: date,
        isButtonClicked: "true",
        selectedTimeText: value
      }, this.onDateChanged);
    }

    private onDateChanged = () =>{
      const date: IDate={
        currentDate:this.state.currentDate,
        isDateOnly:this.state.isDateOnly,
        userLanguage:this.state.userLanguage,
        userContext: this.state.userContext,
        isButtonClicked: this.state.isButtonClicked,
        selectedTimeKey: this.state.selectedTimeKey,
        selectedTimeText: this.state.selectedTimeText
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

      if(year != null && month != null && day != null && hour != null && minute != null)
      {
        /*
        this.setState({
          isButtonClicked: "true"
        },() =>{
          console.log("Button has been clicked: "+this.state.isButtonClicked)
        })
        */
        this.setDate(new Date(year, month, day, hour, minute), 
            this.getTimeFromDate(new Date(year, month, day, hour, minute)));


      }
      //console.log("ButtonClicked in DateControl: "+this.state.isButtonClicked);
    }
    

    private getTimeFromDate = (dateTime: Date) =>{
      //var currentDateTime = this.state.currentDate;
      var currentDateTime = dateTime;
      var timeHour = currentDateTime?.getHours() as number;
      //console.log("TimeHour in time: "+ timeHour);
      var suffix = timeHour  >= 12 ? "PM":"AM";
      var hours = ((timeHour  + 11) % 12 + 1);
      var getHour = hours < 10 ? '0' +hours : hours;
      var timeMinute = currentDateTime?.getMinutes() as number < 10 ? '0'+currentDateTime?.getMinutes() : currentDateTime?.getMinutes();
      //console.log("Hours in time: "+ getHour);
    
      //console.log("Minutes in time: "+ timeMinute);
      return getHour+':'+timeMinute + ' ' + suffix;
    }

    private getHourMinuteFromText(value:string)
    {
      console.log("The value is: "+ value);
      var hourMinute = value.split(':');
      var hour = Number.parseInt(hourMinute[0]);
      var minute = Number.parseInt(hourMinute[1]);
      console.log("hourMinute: "+hourMinute);
      console.log("hour: "+hour);
      console.log("minute: "+minute);
      console.log("amPM: "+ value.split(' ')[1]);
      var combinedTime = [hour, minute, value.split(' ')[1]];
      console.log('CombinedTime: '+ combinedTime);
      return combinedTime;
    }

    private _onChange: IComboBoxProps['onChange'] = (event, option, _index, value) => {

      var systemDate = new Date();
      var year = systemDate.getFullYear();
      var month = systemDate.getMonth();
      var day = systemDate.getDate();
      var hour = systemDate.getHours();
      var minute = systemDate.getMinutes();
    
      var stateCurrentDate = this.state.currentDate as Date;
      if(option != null)
      {
        var hourMinute = this.getHourMinuteFromText(option?.text as string);
        this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), parseInt(hourMinute[0].toString()), parseInt(hourMinute[1].toString())), option?.text as string);
      }
      else
      {
        var hourMinute = this.getHourMinuteFromText(value as string);
        this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), parseInt(hourMinute[0].toString()), parseInt(hourMinute[1].toString())), value as string);
      }
      (event);
    }
    

    
    render(){
      const allowFreeform = true;
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
                      {this.props.isDateOnly == false ? (
                      <ComboBox 
                        allowFreeform={allowFreeform}
                        buttonIconProps={{iconName:"Clock"}}
                        options = {display12Hours}
                        //defaultSelectedKey = "0030"
                      //text={timeText}
                        text = {this.state.selectedTimeText} 
                        onChange={this._onChange}
                       />
                      ): null}

                      {/*<TimeBoxCombo/>*/}
                      
                        {/*
                        this.props.isDateOnly == false ?
                          (<TimeBoxCombo 
                          currentTime = {this.state.currentDate}
                          userContext = {this.state.userContext}
                          //isButtonClicked = {this.state.isButtonClicked}
                          selectedTimeText = {this.getTimeFromDate()}
                          onChange = {(test => {
                            this.setState({
                              isButtonClicked: 'This is a test'
                            })
                          })}
                        />) : null
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
