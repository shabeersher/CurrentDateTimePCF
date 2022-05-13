import * as React from 'react';
import {Callout, DatePicker, DayOfWeek, IDatePicker, IDatePickerStrings, mergeStyleSets, PrimaryButton, Stack, TextField} from 'office-ui-fabric-react';

export interface IDate {
  currentDate: Date | undefined;
  isDateOnly: boolean;
  userLanguage: number;
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
  const onFormatDate = (date?: Date): string => {
    return !date ? '' : (getDay(date)) + '/' + (getMonth(date)) + '/' + (date.getFullYear());
  };

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


  const getMonth = (date: Date): string => {
    var month = date.getMonth() + 1;
    return month < 10 ? '0' + month : '' + month;
  }

  const getDay = (date: Date): string => {
    var day = date.getDate();
    return day < 10 ? '0' + day : '' + day;
  }
  

  
const desc = 'Ce champ est nécessaire. L’un des formats d’entrée de soutien est le jour du dash du mois de tiret de l’année.';

const firstDayOfWeek = DayOfWeek.Sunday;





export default class DateControl extends React.Component<IDateControlProps, IDateControlState>{
    
    constructor(props:IDateControlProps){
        super(props);
        this.state = {
            currentDate : props.currentDate,
            isDateOnly: props.isDateOnly,
            userLanguage: props.userLanguage
        };
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
        userLanguage:this.state.userLanguage
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
      if(isDateAndTime != true) //We are dealing with Date only
      {
        console.log("Date only");
        if(year != null && month != null && day != null)
        {
          this.setDate(new Date(year, month, day));
        }
      }
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
                            formatDate = {onFormatDate}
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
