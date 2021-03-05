import * as React from 'react';
import TimePicker from 'rc-time-picker';
import { IDateControlProps } from './DateControl';

export interface ITimeControlProps{
    hourvalue: number|undefined;
    minutevalue: number|undefined;
    readonly:boolean;
    masked:boolean;
    format:"h:mm a"|"k:mm";
    use12Hours:boolean;

    onChange: (hourvalue:number|undefined,minutevalue:number|undefined) => void;
}

export default class TimePickerTextBox extends React.Component<ITimeControlProps>{
    constructor(props:ITimeControlProps){
        super(props);
    }

    render(){
        return(
            <div></div>
        )
    }
}