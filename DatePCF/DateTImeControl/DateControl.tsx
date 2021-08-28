import * as React from 'react';
import {ComboBox, DatePicker, DayOfWeek, format, IComboBoxOption, IComboBoxProps, IDatePickerStrings, 
  mergeStyles, 
  mergeStyleSets, PrimaryButton, Stack, themeRulesStandardCreator} from 'office-ui-fabric-react';
import { IInputs } from '../generated/ManifestTypes';
import {HelperFunctions, display12HoursFormatA, display12HoursFormatB, display24HoursFormatA, display24HoursFormatB} from '../DateTimeControl/Helper/HelperFunctions';


export interface IDate {
  currentDate: Date | undefined;
  isDateOnly: boolean;
  userLanguage: number;
  userContext: ComponentFramework.Context<IInputs> ;
  selectedTimeKey?: { key: string | number | undefined };
  selectedTimeText?: string;
  is24Hour: boolean;
  timeSeparator: string;
  errorMessage: boolean;
}
export interface IDateControlProps extends IDate{
    onDateChanged:(date:IDate) => void;
}
interface IDateControlState extends IDate{
}

/**
 * All the months and labels within English for the Date section
 */
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

  /**
 * All the months and labels within French for the Date section
 */
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

  /**
   * Method is responsible for Parsing Date from string. This is for manual input date only
   * @param val The string of the date
   * @returns The newly formatted date
   */
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

/**
 * First week of the day for the Date section
 */
const firstDayOfWeek = DayOfWeek.Sunday;

const wrapperClassName = mergeStyles({
  display: 'flex',
  selectors: {
    '& > *': { marginRight: '20px' },
    '& .ms-ComboBox': { maxWidth: '300px' },
  },
});


export default class DateControl extends React.Component<IDateControlProps, IDateControlState>{
    
  /**
   * Constructor used to set the Properties at initialization
   * @param props Props of the IDateControl
   */
    constructor(props:IDateControlProps){
        super(props);
        this.state = {
            currentDate : props.currentDate,
            isDateOnly: props.isDateOnly,
            userLanguage: props.userLanguage,
            userContext: props.userContext,
            selectedTimeKey: props.selectedTimeKey,
            selectedTimeText: props.selectedTimeText,
            is24Hour: props.is24Hour,
            timeSeparator: props.timeSeparator,
            errorMessage: props.errorMessage
        };
    }

    /**
     * Method is responsible for returning the date in the appropriate user format
     * @param date The Date which needs to be formatted
     * @returns the formatted date in the user preffered format
     */
    private dateFormat = (date?:Date): string =>{
      var dateFormat = this.state.userContext.userSettings.dateFormattingInfo.shortDatePattern;
      var dateSeparator = this.state.userContext.userSettings.dateFormattingInfo.dateSeparator;
      var splitDateFormat = dateFormat.split("/");

      var firstPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[0] as string);
      var secondPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[1] as string);
      var thirdPosition = this.retrieveDateFormatValue(date as Date, splitDateFormat[2] as string);
      return !date ? '' : firstPosition + dateSeparator + secondPosition + dateSeparator + thirdPosition;
    }
    
    /**
     * Method is responsible for extracting the day, month or year value based on the splitDateFormat
     * @param date Date from which the value of day, month or year needs to be extracted
     * @param splitDateFormat D, M, or Y for Day, Month, or Year
     * @returns the dateString where Day, Month or Year is stored
     */
    private retrieveDateFormatValue = (date: Date, splitDateFormat: string): string =>{
      var dateString = "";
      if(splitDateFormat != undefined && splitDateFormat != null)
      {
          if(splitDateFormat.toUpperCase().includes("D"))
          dateString = this.getDay(date, splitDateFormat);
        else if(splitDateFormat.toUpperCase().includes("M"))
          dateString = this.getMonth(date, splitDateFormat);
        else if(splitDateFormat.toUpperCase().includes("Y"))
          dateString = this.getFullYear(date, splitDateFormat);
      }
      return dateString;
    }
  
    /**
     * 
     * Method is responsible for extracting the Month based on the format provided from the Date
     * @param date Date from which the Month has to be extracted
     * @param format Formate which is needed to extract the date
     * @returns The formattedMonth of the Date
     */
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
  
    /**
     * 
     * Method is responsible for extracting the Day based on the format provided from the Date
     * @param date Date from which the Day has to be extracted
     * @param format Formate which is needed to extract the date
     * @returns The formattedDay of the Date
     */
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
    }

    /**
     * Method is responsible for extracting the Year based on the format provided from the Date
     * @param date Date from which the year has to be extracted
     * @param format Formate which is needed to extract the date
     * @returns The formattedDateYear of the Date
     */
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
    /**
     * Method is responsible for setting the CurrentDate and SelectedTimeText
     * @param date Date to be set to the state of the currentDate
     * @param value Time to be set to the state of the selectedTimeText
     */
    private setDate = (date:Date, value:string) =>{
        this.setState({
          currentDate: date,
          selectedTimeText: value,
        }, this.onDateChanged);
    }

    /**
     * Method is responsible for setting all the class variable to their appropriate state
     */
    private onDateChanged = () =>{
      const date: IDate={
        currentDate:this.state.currentDate,
        isDateOnly:this.state.isDateOnly,
        userLanguage:this.state.userLanguage,
        userContext: this.state.userContext,
        selectedTimeKey: this.state.selectedTimeKey,
        selectedTimeText: this.state.selectedTimeText,
        is24Hour: this.state.is24Hour,
        timeSeparator: this.state.timeSeparator,
        errorMessage: this.state.errorMessage
      };
      this.props.onDateChanged(date);
      
    }


    /**
     * Method is responsible for setting the currentDate of the system
     */
    private getCurrentDate = () =>{
      console.log("GetCuurentDate called");
      var systemDate = new Date()
      var year = systemDate.getFullYear();
      var month = systemDate.getMonth();
      var day = systemDate.getDate();
      var hour = systemDate.getHours();
      var minute = systemDate.getMinutes();

      if(year != null && month != null && day != null && hour != null && minute != null)
      {
        
        this.setDate(new Date(year, month, day, hour, minute), 
            this.getTimeFromDate(new Date(year, month, day, hour, minute)));
/*
            this.setDate(new Date(year, month, day, hour, minute), 
            "Test Year");
            */
      }
      
      this.setState({
        errorMessage: false
      }, ()=>{
        console.log("Error Message in currentDate: "+ this.state.errorMessage)
      } )
      
    }
    
    /**
     * Method is responsible for extracting time from DateTime
     * @param dateTime The whole DateTime
     * @returns String containig the hour, minute and AM/PM from the DateTime
     */
    private getTimeFromDate = (dateTime: Date) =>{
      var suffix = '', getHour;
      var hours;
      var is24Hour = this.state.is24Hour;
      var currentDateTime = dateTime;
      var timeHour = currentDateTime?.getHours() as number;
      if(is24Hour != true) // We know we are dealing with 12H instead of 24H
      {
        suffix = timeHour  >= 12 ? "PM":"AM";
        hours = ((timeHour  + 11) % 12 + 1);
      }
      else
      {
        hours = timeHour;
      }
      getHour = hours < 10 ? '0' +hours : hours;
      var timeMinute = currentDateTime?.getMinutes() as number < 10 ? '0'+currentDateTime?.getMinutes() : currentDateTime?.getMinutes();
      return getHour+this.state.timeSeparator+timeMinute + ' ' + suffix;
    }

 

    /**
     * Method is responsible for extracting the Hour, Minute, AM/PM from the time submitted
     * @param value The time submitted
     * @returns Array containing (Hour, Minute, AM/PM)
     */
    private getHourMinuteFromText(value:string)
    {
      var hourMinute = value.split(this.state.timeSeparator);
      var hour = Number.parseInt(hourMinute[0]);
      var minute = Number.parseInt(hourMinute[1]);
      var combinedTime = [hour, minute];
      return combinedTime;
    }

    /**
     * Method is responsible for setting the newly selected date in the state
     * @param selectedDate New selected date
     */
    private setOnSelectChangeDate(selectedDate:Date)
    {
      var selectedTimeText = this.state.selectedTimeText;
      var is24Hour = this.state.is24Hour;

      if(is24Hour == true)
      {
        var hourMinute = this.getHourMinuteFromText(selectedTimeText as string)
        this.setDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getDate(), 
        parseInt(hourMinute[0].toString()), parseInt(hourMinute[1].toString())), selectedTimeText as string); 
      }
      else
      {
        var getAMPM = selectedTimeText?.split(' ')[1];
        if(getAMPM == "AM")
        {
          var hourMinute = this.getHourMinuteFromText(selectedTimeText as string);
          this.setDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getDate(), 
          parseInt(hourMinute[0].toString()), parseInt(hourMinute[1].toString())), selectedTimeText as string);
        }
        else if(getAMPM == "PM")
        {
          var militaryTime = HelperFunctions.convertTimeToMilitaryTime(selectedTimeText as string, this.state.timeSeparator);
          this.setDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth(), selectedDate.getDate(), 
          parseInt(militaryTime[0].toString()), parseInt(militaryTime[1].toString())), selectedTimeText as string);
        }
      }
    }

    /**
     * Method is responsible for the OnChange of the Time and updating the state
     * @param event OnChange
     * @param option The newly selected time from the drop down
     * @param _index The index of the selected time
     * @param value If the time is changed by writing within the text box, value will have that new value
     */
    private _onChange: IComboBoxProps['onChange'] = (event, option, _index, value) => {
      
      console.log("OnChange method called");
      var stateCurrentDate = this.state.currentDate as Date;
      var is24Hour = this.state.is24Hour;

      if(is24Hour == true)
      {
        //We know that we are dealing with military time
        if(option != null)
        {
          var isValid = HelperFunctions.validateTime(option?.text as string, this.state.is24Hour);
          if(isValid == true)
          {
            this.setState({
              errorMessage : false
            });
          }
          else
          {
            this.setState({
              errorMessage : true
            })
          }
          var hourMinute = this.getHourMinuteFromText(option?.text as string)
          if(isNaN(hourMinute[0]) == false && isNaN(hourMinute[1]) == false)
          {
            this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
            parseInt(hourMinute[0].toString()), parseInt(hourMinute[1].toString())), option?.text as string); 
          }
          else
          {
            this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
            stateCurrentDate.getHours(), stateCurrentDate.getMinutes()), option?.text as string);
          }
        }
        else 
        {
          var isValid = HelperFunctions.validateTime(value as string, this.state.is24Hour);
          if(isValid == true)
          {
            this.setState({
              errorMessage : false
            });
          }
          else
          {
            this.setState({
              errorMessage : true
            })
          }
          var hourMinute = this.getHourMinuteFromText(value as string);
          if(isNaN(hourMinute[0]) == false && isNaN(hourMinute[1]) == false)
          {
            this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
            parseInt(hourMinute[0].toString()), parseInt(hourMinute[1].toString())), value as string);
          }
          else
          {
            this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
            stateCurrentDate.getHours(), stateCurrentDate.getMinutes()), value as string);
          }

        }
      }
      else if(is24Hour == false)
      {
        if(option != null)
        {

            var isValid = HelperFunctions.validateTime(option?.text, this.state.is24Hour);
            if(isValid == true)
            {
              this.setState({
                errorMessage : false
              })
            }
            else
            {
              this.setState({
                errorMessage : true
              })
            }

            var militaryTime = HelperFunctions.convertTimeToMilitaryTime(option?.text as string, this.state.timeSeparator);
            var validateMilitaryTime = HelperFunctions.validateData(militaryTime);
            if(validateMilitaryTime == true && isNaN(parseInt(militaryTime[0].toString())) == false && isNaN(parseInt(militaryTime[1].toString()))==false)
            {
              this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
              parseInt(militaryTime[0].toString()), parseInt(militaryTime[1].toString())), option?.text as string);
            }
            else
            {
              this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
              stateCurrentDate.getHours(), stateCurrentDate.getMinutes()), option?.text as string);
            }
        }
        else if(value != null)
        {
            var isValid = HelperFunctions.validateTime(value as string, this.state.is24Hour);
            if(isValid == true)
            {
              this.setState({
                errorMessage : false
              })
            }
            else
            {
              this.setState({
                errorMessage : true
              })
            }
            var militaryTime = HelperFunctions.convertTimeToMilitaryTime(value as string, this.state.timeSeparator);
            var validateMilitaryTime = HelperFunctions.validateData(militaryTime);
              if(validateMilitaryTime == true && isNaN(parseInt(militaryTime[0].toString())) == false && isNaN(parseInt(militaryTime[1].toString()))==false)
              {
                this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
                parseInt(militaryTime[0].toString()),parseInt(militaryTime[1].toString())), value as string);
              }
              else
              {
                this.setDate(new Date(stateCurrentDate.getFullYear(),stateCurrentDate.getMonth(), stateCurrentDate.getDate(), 
                stateCurrentDate.getHours(), stateCurrentDate.getMinutes()), value as string);
              }

        }
      }
      (event);

    }

    /**
     * Method is responsible for displaying the correct time in dropdown for time
     * @returns Display format of the time
     */
    private displayHourOptions()
    {
      if(this.state.is24Hour == false && this.state.timeSeparator === ':')
        return display12HoursFormatA;
      else if(this.state.is24Hour == false && this.state.timeSeparator === '.')
        return display12HoursFormatB;
      else if(this.state.is24Hour == true && this.state.timeSeparator === ':')
        return display24HoursFormatA
      else if(this.state.is24Hour == true && this.state.timeSeparator === '.')
        return display24HoursFormatB
    }
    
    /**
     * Rendering of the CurrentDateTime PCF. Rendering of the Time PCF section 
     * if the DateOnly Property is false
     * @returns CurrentDateTime PCF
     */
    render(){
      const allowFreeform = true;
      const timePattern = this.state.is24Hour == true ? 'HH'+this.state.userContext.userSettings.dateFormattingInfo.timeSeparator+'MM'
                          : 'hh'+this.state.userContext.userSettings.dateFormattingInfo.timeSeparator+'mm AM/PM';
      const errorMessage = this.state.userLanguage == 1036 ?'Entrée de temps non valide. '+timePattern
                          :'Invalid Time Entry. '+timePattern;
      const dateLabel = this.state.userLanguage == 1036 ? "Date actuelle" : "Current Date";
      const dateTimeLabel = this.state.userLanguage == 1036 ? "Date/heure actuelle " : "Current Date/Time"
      const answer = this.state.selectedTimeText;
        return(
            <div>
                <Stack horizontal> 
                    <Stack tokens={{childrenGap:10, padding:10}}>
                        <DatePicker 
                            className={controlClass.control}
                            isRequired={false}
                            allowTextInput={false}
                            ariaLabel={desc}
                            firstDayOfWeek={firstDayOfWeek}
                            strings = {this.state.userLanguage == 1036 ? DayPickerFrenchStrings : DayPickerEnglishStrings}
                            formatDate = {this.dateFormat}
                            //parseDateFromString = {onParseDateFromString}
                           onSelectDate = {(selected => this.setOnSelectChangeDate(selected))}
                            value={this.state.currentDate }
                        />
                    </Stack>
                    <Stack tokens={{childrenGap:10, padding:10}}>
                      {this.props.isDateOnly == false ? (
                      <ComboBox 
                        allowFreeform={allowFreeform}
                        buttonIconProps={{iconName:"Clock"}}
                        options = {this.displayHourOptions()}
                        //text = {this.state.selectedTimeText != undefined ? this.state.selectedTimeText : ''}
                        text = {answer}
                        onChange={this._onChange}
                        errorMessage={this.state.errorMessage == true ? errorMessage : undefined}
                        //defaultSelectedKey ={this.state.is24Hour == true ? '090' : '80am'}
                       />
                      ): null}                       
                    </Stack>
                    <Stack tokens={{childrenGap:10, padding:10}}>
                      {this.props.isDateOnly == false ? (
                        <PrimaryButton 
                                text={dateTimeLabel}
                                onClick={this.getCurrentDate}
                            />
                      ):
                      <PrimaryButton 
                                text={dateLabel}
                                onClick={this.getCurrentDate}
                            />}
                    </Stack>
                </Stack>        
            </div>
        )   
    }
}