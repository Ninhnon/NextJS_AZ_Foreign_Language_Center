'use client';
import React, { useState } from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

import { scheduleData } from './dummy';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };
  const eventTemplate = (props: { [key: string]: object }): JSX.Element => {
    const parsedTime = new Date(props.StartTime.toString());
    const StartTime = parsedTime.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    const parsedTime2 = new Date(props.EndTime.toString());
    const EndTime = parsedTime2.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <div className="w-full h-full flex flex-col bg-[#fecaca]">
        <div className="flex flex-row">
          <div className="p-1"> {StartTime}</div>
          <div className="p-1"> {EndTime}</div>
        </div>
        <div className="template-wrap">{props.Subject}</div>
        <div className="template-wrap">{props.Subject}</div>
        <div className=" bottom-0">{props.Teacher}</div>
      </div>
    );
  };
  const monthEventTemplate = (props: {
    [key: string]: object;
  }): JSX.Element => {
    const parsedTime = new Date(props.StartTime.toString());
    const StartTime = parsedTime.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    const parsedTime2 = new Date(props.EndTime.toString());
    const EndTime = parsedTime2.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    return (
      <div className="w-full h-full month-event-container">
        <div className="flex flex-row">
          <div> {StartTime}</div>
          <div> {EndTime}</div>
        </div>
        <div className="month-template-wrap">{props.Location}</div>
      </div>
    );
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ScheduleComponent
        width="100%"
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={Date.now()}
        eventSettings={{
          dataSource: scheduleData,
        }}
        dragStart={onDragStart}
      >
        <ViewsDirective>
          <ViewDirective option="Day" />
          <ViewDirective
            option="Week"
            eventTemplate={eventTemplate.bind(this)}
          />
          <ViewDirective
            option="Month"
            eventTemplate={monthEventTemplate.bind(this)}
          />
          <ViewDirective option="Agenda" />
        </ViewsDirective>
        <Inject services={[Day, Week, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <table className="w-full bg-white">
          <tbody>
            <tr className="h-[50px]">
              <td className="w-full">
                <DatePickerComponent
                  value={Date.now()}
                  showClearButton={false}
                  placeholder="Current Date"
                  floatLabelType="Always"
                  change={change}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </PropertyPane>
    </div>
  );
};

export default Scheduler;
