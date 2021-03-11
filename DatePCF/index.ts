import {IInputs, IOutputs} from "./generated/ManifestTypes";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import DateControl, {IDateControlProps, IDate} from './DateTImeControl/DateControl'
import {initializeIcons} from '@fluentui/react/lib/Icons';
import { Context } from "vm";
import moment = require('moment');

export class CurrentDateTimePCF implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private container: HTMLDivElement;
	private context: Context;
	private currentDate: IDate;
	private notifyOutputChanged: () => void;
	private _notifyOutputChanged: () => void;
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		initializeIcons();
		this.container = container;
		this._notifyOutputChanged = notifyOutputChanged;
		this.renderControl(context);
		// Add control initialization code
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.renderControl(context);
		// Add code to update control view
	}
	
	private convertDate(value:Date)
	{
		const offsetMinutes = this.context.userSettings.getTimeZoneOffsetMinutes(value);
		const localDate = this.addMinutes(value, offsetMinutes);
		return this.getUtcDate(localDate);
	}

	private getUtcDate(localDate: Date) {
		return  new  Date(
			localDate.getUTCFullYear(),
			localDate.getUTCMonth(),
			localDate.getUTCDate(),
			localDate.getUTCHours(),
			localDate.getUTCMinutes(),
		);
	}

	addMinutes(date: Date, minutes: number): Date {
		return new Date(date.getTime() + minutes * 60000);
	}

	private renderControl(context:ComponentFramework.Context<IInputs>):void{
		this.context = context;

		let userLanguage = context.userSettings.languageId;
		let currDate = moment(context.parameters.CurrentDate.raw as Date);
		var utcCurrDate = this.getUtcDate(currDate.toDate());
		var convertedUTCDate = this.convertDate(utcCurrDate);

		const compositeDateControlProps: IDateControlProps = {
			isDateOnly: context.parameters.CurrentDate.type === "DateAndTime.DateOnly" ? true : false,
			currentDate: context.parameters.CurrentDate.raw != null ? convertedUTCDate : undefined,
			onDateChanged:(d:IDate) => {
				this.currentDate = d;
				this._notifyOutputChanged();
			}
		};

		ReactDOM.render(React.createElement(DateControl, compositeDateControlProps), this.container);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			CurrentDate: this.currentDate.currentDate
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this.container);
		// Add code to cleanup control if necessary
	}
}