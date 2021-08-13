import * as React from 'react';
import {
  ComboBox,
  Fabric,
  IComboBoxOption,
  mergeStyles,
} from '@fluentui/react/lib/index';
import { IInputs } from '../generated/ManifestTypes';

export interface ITime {
  currentTime: Date | undefined
  userContext: ComponentFramework.Context<IInputs> ;
}

export interface ITimeControlProps extends ITime{
  //onTimeChanged:(date:ITime) => void;

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


/*
export const TimeBoxCombo: React.FC = () => {
  //const [autoComplete, { toggle: ToggleAutoComplete }] = useBoolean(false);
  //const [allowFreeform, { toggle: ToggleAllowFreeform }] = useBoolean(true);
  const allowFreeform = true;
  const autoComplete = true;
  return (
    <Fabric className={wrapperClassName}>
      <ComboBox
        key={'' + autoComplete + allowFreeform}
        allowFreeform={allowFreeform}
        autoComplete={autoComplete ? 'on' : 'off'}
        //options={INITIAL_OPTIONS}
        options = {is24Hours == false ? display12Hours : display24Hours}
        buttonIconProps={{iconName:"Clock"}}
      />
    </Fabric>
  );
};
*/
export default class TimeBoxCombo extends React.Component<ITimeControlProps>{
  constructor(props:ITimeControlProps){
    super(props);
    this.state = {
        currentTime : props.currentTime,
        userContext: props.userContext
    };
}
private getCurrentTime = ():string =>
{
  var time = this.props.currentTime;
  console.log("Time: "+time);
  var timeHour = time?.getHours() as number;
  var suffix = timeHour  >= 12 ? "PM":"AM";
  var hours = ((timeHour  + 11) % 12 + 1);
  var timeMinute = time?.getMinutes();
  return hours+':'+timeMinute + ' ' + suffix;
}
  render()
  {
    const allowFreeform = true;
    const autoComplete = true;
    return (
      <Fabric className={wrapperClassName}>
        <ComboBox
          key={'' + autoComplete + allowFreeform}
          allowFreeform={allowFreeform}
          autoComplete={autoComplete ? 'on' : 'off'}
          //options={INITIAL_OPTIONS}
          options = {is24Hours == false ? display12Hours : display24Hours}
          buttonIconProps={{iconName:"Clock"}}
          text={this.getCurrentTime()}
        />
      </Fabric>
    );
  }
}
