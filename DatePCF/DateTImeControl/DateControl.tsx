import * as React from 'react';
import {Callout, DatePicker, DayOfWeek, IDatePicker, IDatePickerStrings, mergeStyleSets, PrimaryButton, Stack, TextField} from 'office-ui-fabric-react';
//import TimePicker, { ITimeControlProps } from './TimeBox';
import TimePicker, { ITimeProps } from './TimeBox';
import { min } from 'moment';


export interface IDate extends ITimeProps{
  currentDate: Date | undefined;
  isDateOnly: boolean;
}

export interface IDateControlProps extends IDate{
    onDateChanged:(date:IDate) => void;
}

interface IDateControlState extends IDate{
    isCalloutVisible: boolean;
}
const DayPickerStrings: IDatePickerStrings = {
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

  const controlClass = mergeStyleSets({
    control: {
      margin: '0 0 15px 0',
      maxWidth: '300px',
    },
  });
  const onFormatDate = (date?: Date): string => {
    console.log("Date:"+date?.getDate());
    console.log("Month:"+date?.getMonth());
    console.log("Year:"+date?.getFullYear());
    return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
  };

  
const desc = 'This field is required. One of the support input formats is year dash month dash day.';

const firstDayOfWeek = DayOfWeek.Sunday;



export default class DateControl extends React.Component<IDateControlProps, IDateControlState>{
    
    constructor(props:IDateControlProps){
        super(props);
        this.state = {
            isCalloutVisible: false,
            currentDate : props.currentDate,
            isDateOnly: props.isDateOnly,
            hourvalue: props.hourvalue,
            minutevalue: props.minutevalue,
            readonly: props.readonly,
            format: props.format,
            use12Hours: props.use12Hours,
            masked: props.masked
        };
    }
    private _menuButtonElement = React.createRef<HTMLDivElement>();
      
    private showPopup = () => {
        this.setState({
            isCalloutVisible: true
        });
    }

    private hidePopup = () => {
        this.setState({
            isCalloutVisible: false
        });
    }

    private setDate = (date:Date) =>{
      console.log(date);
      this.setState({
        currentDate: date
      }, this.onDateChanged)
    }

    private setDateTime = (date:Date, hour:number, minute:number) =>{
      console.log(date);
      this.setState({
        currentDate: date,
        hourvalue: hour,
        minutevalue: minute
      }, this.onDateChanged)
    }

    private formatDate = (date:Date) =>{
      return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    }

    private onDateChanged = () =>{
      const date: IDate={
        currentDate:this.state.currentDate,
        isDateOnly:this.state.isDateOnly,
        hourvalue:this.state.hourvalue,
        minutevalue:this.state.minutevalue,
        readonly:this.state.readonly,
        masked:this.state.masked,
        format:this.state.format,
        use12Hours:this.state.use12Hours
      };
      this.props.onDateChanged(date);
    }

    private onTimeChanged = () =>{
        var hour = this.props.hourvalue;
        var minute = this.props.minutevalue;
        //this.props.onChange(hour, minute);

        console.log("Hour is: "+this.props.hourvalue);
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
      console.log("GetCurrentDate Month: "+month);
      console.log("GetCurrentDate Date: "+day);
      console.log("GetCurrentDate Hour: "+hour);
      console.log("GetCurrentDate Min: "+minute);
      console.log("System Date:"+systemDate)
      var timezone = systemDate.getTimezoneOffset();
      if(isDateAndTime != true) //We are dealing with Date only
      {
        console.log("Date only");
        if(year != null && month != null && day != null)
        {
          this.setDate(new Date(year, month, day))
        }
      }
      else
      {
        console.log("Date and Time only");
        if(year != null && month != null && day != null && hour != null && minute != null )
        {
          console.log("Setting Date Time")
          this.setDateTime(new Date(year, month, day), hour, minute)
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
                            onSelectDate = {(selected => {
                              console.log("selected Date:"+selected)
                              this.setState({
                                currentDate: selected ?? undefined                                
                              },this.onDateChanged)
                            })}
                            value={this.state.currentDate }
                        />
                    </Stack>
                    {
                      this.state.isDateOnly === false ?                     
                          <Stack tokens={{childrenGap:10, padding:10}}>
                          <TimePicker 
                          hourvalue = {this.state.hourvalue}
                          minutevalue= {this.state.minutevalue}
                          readonly= {false}
                          masked = {false}
                          format = {this.props.format}
                          use12Hours = {this.props.use12Hours}
                          />
                        </Stack> : null
                    }
                    <Stack tokens={{childrenGap:10, padding:10}}>
                        <PrimaryButton 
                                text={"Current Date"}
                                onClick={this.getCurrentDate}
                            />
                    </Stack>
                </Stack>
                
            </div>
        )
    }
}
