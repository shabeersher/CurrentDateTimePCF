import * as React from 'react';
import {Callout, DatePicker, DayOfWeek, IDatePicker, IDatePickerStrings, mergeStyleSets, PrimaryButton, Stack, TextField} from 'office-ui-fabric-react';
//import TimePicker, { ITimeControlProps } from './TimeBox';
import TimePicker from './TimeBox_example';
export interface IDate{
  currentDate: Date | undefined;
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
            currentDate : props.currentDate/*,
            hourvalue:12,
            minutevalue: 20,
            readonly:false,
            masked:false,
            format:"h:mm a",
            use12Hours:
            */

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

    private formatDate = (date:Date) =>{
      return !date ? '' : date.getDate() + '/' + (date.getMonth() + 1) + '/' + (date.getFullYear() % 100);
    }

    private onDateChanged = () =>{
      const date: IDate={
        currentDate:this.state.currentDate/*,
        hourvalue:12,
        minutevalue: 20,
        readonly:false,
        masked:false,
        format:"h:mm a",
        use12Hours:true */
      };
      this.props.onDateChanged(date);
    }

    private getCurrentDate = () =>{
      var systemDate = new Date();
      var year = systemDate.getFullYear();
      var month = systemDate.getMonth();
      var day = systemDate.getDate();
      console.log("GetCurrentDate Month: "+month);
      console.log("GetCurrentDate Date: "+day);
      console.log("System Date:"+systemDate)
      var timezone = systemDate.getTimezoneOffset();
      if(year != null && month != null && day != null)
      {
        this.setDate(new Date(year, month, day))
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
                    <Stack tokens={{childrenGap:10, padding:10}}>
                            <TimePicker 
                            hourvalue = {8}
                            minutevalue= {30}
                            readonly= {false}
                            masked = {false}
                            format = {"h:mm a"}
                            use12Hours = {false}
                            onChange = {() =>{
                              console.log("OnChange clicked")
                            }}
                            />
                    </Stack>
                    
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
