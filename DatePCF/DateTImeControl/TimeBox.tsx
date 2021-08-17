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
}

export interface ITimeControlProps extends ITime{
  //onSelectionChange:(keyValue?:IDropdownOption) => void;

}

interface ITimeControlState extends ITime{
  selectedItem?: { key: string | number | undefined };
  operationType?: string;
}

//import { useBoolean } from '@uifabric/react-hooks';

//SelectableOptionMenuItemType, Toggle from @fluentui/react/lib/index

const INITIAL_OPTIONS: IComboBoxOption[] = [
    /*
  //{ key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  //{ key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
//{ key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
 // { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
  */
];
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


export default class TimeBoxCombo extends React.Component<ITimeControlProps, ITimeControlState>{
  constructor(props:ITimeControlProps){
    super(props);
    this.state = {
        currentTime : props.currentTime,
        userContext: props.userContext,
        operationType: '',
        selectedItem: undefined,
    };

}

private onSelectionChange = () =>{

}

private getCurrentTime = ():string =>
{
  console.log("Props current time: "+ this.props.currentTime);
  var time = this.props.currentTime;
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
    /*
    const [selectedKey, setSelectedKey] = React.useState<string | number | undefined>('C');

    const onChange = React.useCallback(
      (ev: React.FormEvent<IComboBox>, option?: IComboBoxOption): void => {
        setSelectedKey(option?.key);
      },
      [setSelectedKey],
    );
*/


    const allowFreeform = true;
    const autoComplete = true;
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          key={'' + autoComplete + allowFreeform}
          allowFreeform={allowFreeform}
          autoComplete={autoComplete ? 'on' : 'off'}
          //selectedKey = {selectedKey}
          //options={INITIAL_OPTIONS}
          options = {display12Hours}//{is24Hours == false ? display12Hours : display24Hours}
          buttonIconProps={{iconName:"Clock"}}
          //text={this.getCurrentTime()}
          defaultSelectedKey = "0030"
          onItemClick = {(selected => {
            console.log("Selected Item: "+ selected);
          })}

          selectedKey={this.state.selectedItem ? this.state.selectedItem.key : undefined}
          onChange={this._onChange}
          //onChange={onChange}
          /*
          onChange = {(selected => {
            this.setState({
              currentState: selected ?? undefined
            }, this.onSelectionChange))
            console.log("selected: "+ selected)
          })}
          */
/*          
          onChange = {(selected => {
            console.log("Selected:" + se)
          })}
  

          onSelectDate = {(selected => {
            this.setState({
              currentDate: selected ?? undefined                                
            },this.onDateChanged)
          })}
*/
        />
      </Fabric>
    );

    
  }
  private _onChange: IComboBoxProps['onChange'] = (event, option) => {
    console.log("Option is: "+ option?.text);
    console.log("Option Index: "+ option?.key);
    this.setState({ selectedItem: option });
    this.setState({operationType: option?.text});
    (event);

  }
}

