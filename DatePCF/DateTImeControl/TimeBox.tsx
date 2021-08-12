import * as React from 'react';
import {
  ComboBox,
  Fabric,
  IComboBoxOption,
  mergeStyles,
  SelectableOptionMenuItemType,
  Toggle,
} from '@fluentui/react/lib/index';
import { useBoolean } from '@uifabric/react-hooks';

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
const display12Hours:IComboBoxOption[] = []
{
    for(var hour=1; hour<= 12; hour+=1){
        for(var interval=0; interval<60; interval+=30){
            if(interval > 30)
                continue;
            var hourText = hour < 10 ? '0'+hour : hour;
            var uniqueKey = hour+''+interval;
            var intervalText = interval == 0 ? '00' : interval;
            var time = hourText+' : '+intervalText;
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



export const TimeBoxCombo: React.FC = () => {
  const [autoComplete, { toggle: ToggleAutoComplete }] = useBoolean(false);
  const [allowFreeform, { toggle: ToggleAllowFreeform }] = useBoolean(true);

  return (
    <Fabric className={wrapperClassName}>
      <ComboBox
        key={'' + autoComplete + allowFreeform}
        allowFreeform={allowFreeform}
        autoComplete={autoComplete ? 'on' : 'off'}
        //options={INITIAL_OPTIONS}
        options = {is24Hours == false ? display24Hours : display12Hours}
        buttonIconProps={{iconName:"Clock"}}
      />
    </Fabric>
  );
};
