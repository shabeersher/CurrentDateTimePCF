import * as React from 'react';
import {
  ComboBox,
  Fabric,
  IComboBoxOption,
  mergeStyles,
} from '@fluentui/react/lib/index';
import { IInputs } from '../generated/ManifestTypes';
import { IComboBox, IComboBoxProps } from 'office-ui-fabric-react/lib/components/ComboBox';
import moment = require('moment');
import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { IDocumentCard } from 'office-ui-fabric-react';

export interface ITime {
  currentTime: Date | undefined
  userContext: ComponentFramework.Context<IInputs> ;
  selectedTimeKey?: { key: string | number | undefined };
  selectedTimeText?: string;
  isButtonClicked?:string;

}

export interface ITimeControlProps extends ITime{
  onChange:(value:string) => void;
}

interface ITimeControlState extends ITime{

}

const is24Hours= false;
const isAM = false;
const isPM = true;
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

var timeText = "SOmething";


export default class TimeBoxCombo extends React.Component<ITimeControlProps, ITimeControlState>{

  constructor(props:ITimeControlProps){
    super(props);
    this.state = {
        currentTime : props.currentTime,
        userContext: props.userContext,
        selectedTimeText: props.selectedTimeText,
        selectedTimeKey: props.selectedTimeKey,
        isButtonClicked: props.isButtonClicked
    };
    /*
    if(this.props.isButtonClicked != this.state.isButtonClicked)
    {
      console.log("Props and state are not equal:\nProps:=>"+this.props.isButtonClicked+"\nState:=>"+this.state.isButtonClicked);
      this.setState({
        isButtonClicked : this.props.isButtonClicked
      },() => {
        console.log("IsButtonClicked state is updated: "+ this.state.isButtonClicked);
      })
    }
    */
}
/*
callBack = (dataFromChild: string) =>{
  this.setState({
    isButtonClicked: dataFromChild
  })
}
*/
componentDidUpdate(prevProps: ITimeControlProps, prevState: ITimeControlState):void {
  console.warn("componentDidUpdate method called", prevProps.isButtonClicked, this.props.isButtonClicked);
}


/*
private getCurrentTime = ():string =>
{
  console.log("Props current time: "+ this.props.currentTime);
  var time = this.props.currentTime;
  */
  /*
  const offsetMinutes = (time?.getTimezoneOffset() as number)
  var newTimeDate = new Date(time?.getTime() as number + offsetMinutes * 60000);
  console.log("New Time Date: "+ newTimeDate);
  time = newTimeDate;
  */
  /*
  var timeZone = (time?.getTimezoneOffset() as number) * -60000;
  console.log("Timezone offset: "+ timeZone);
  time?.setTime(time?.getTime() + timeZone);
  console.log("After timezone offset: "+ time);


var offsetTimeZone = (time?.getTimezoneOffset() as number) * 60000;
console.log("Timezone offset:" + offsetTimeZone);
console.log("TimeZone getTime(): "+time?.getTime());
time?.setDate(time?.getTime() + offsetTimeZone)
console.log("Time after TimeZone: "+time);
*/
/*
  var timeHour = time?.getHours() as number;
  console.log("TimeHour in time: "+ timeHour);
  var suffix = timeHour  >= 12 ? "PM":"AM";
  var hours = ((timeHour  + 11) % 12 + 1);
  var timeMinute = time?.getMinutes();
  console.log("Hours in time: "+ timeHour);

  console.log("Minutes in time: "+ timeMinute);
  return timeHour+':'+timeMinute + ' ' + suffix;
}
*/
private getCurrentTime = () =>{
  console.log("Props current time: "+ this.props.currentTime);
  var time = this.props.currentTime;
  var timeHour = time?.getHours() as number;
  console.log("TimeHour in time: "+ timeHour);
  var suffix = timeHour  >= 12 ? "PM":"AM";
  var hours = ((timeHour  + 11) % 12 + 1);
  var timeMinute = time?.getMinutes();
  console.log("Hours in time: "+ timeHour);

  console.log("Minutes in time: "+ timeMinute);
  
  return timeHour+':'+timeMinute + ' ' + suffix;
}


  render()
  {
    const allowFreeform = true;
    //console.log("state of everything");
    //console.log(this);
    //console.log("Button Props is: "+ this.props.isButtonClicked)
    //console.log("Inside Render but outside If: "+ this.state.isButtonClicked);
    /*
    this.setState({
      isButtonClicked: this.props.isButtonClicked
    },() =>{
      console.log("Is Button is to: "+this.state.isButtonClicked);
    })
     */
     
    //const autoComplete = true;  TO REMOVE
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          allowFreeform={allowFreeform}
          //key={'' + autoComplete + allowFreeform} TO REMOVE
          options = {display12Hours}//{is24Hours == false ? display12Hours : display24Hours}
          buttonIconProps={{iconName:"Clock"}}
          //text={timeText}
         text = {this.state.selectedTimeText} 
         //text = {this.getCurrentTime()}
         defaultSelectedKey = "0030"
          //selectedKey={this.state.selectedTimeKey ? this.state.selectedTimeKey.key : undefined}
          onChange={this._onChange}
        />
      </Fabric>
    );

    
  }

  private displayTime = (): string =>{
    console.log("Inside display Time: "+ this.state.selectedTimeText);
    //this.getCurrentTime();
    /*
    if(this.state.selectedTimeText != null)
      return this.state.selectedTimeText;
      */
    return "Test";
    
  }
  
  private _onChange: IComboBoxProps['onChange'] = (event, option, _index, value) => {

    if(option != null)
    {
      console.log("option is not null")
      console.log("Option is: "+ option?.text);
      this.setState({ selectedTimeKey: option });
      this.setState({selectedTimeText: option?.text},
        () =>{
          console.log("SelectedTimeTex has changed:" +this.state.selectedTimeText)
        }
        );
    }
    else
    {
      console.log("option is null");
      console.log("Option is: "+ value);
      this.setState({ selectedTimeKey: undefined });
      this.setState({selectedTimeText: value},
        () =>{
          console.log("SelectedTimeTex has changed:" +this.state.selectedTimeText)
        });
    }
    (event);
  }
}

