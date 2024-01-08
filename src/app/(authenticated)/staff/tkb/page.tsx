'use client';
import React, { useState, useEffect } from 'react';
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
// import { createElement, extend } from '@syncfusion/ej2-base';
// import { DropDownList } from '@syncfusion/ej2-dropdowns';
import './schedule-component.css';
import { applyCategoryColor } from './helper';
// import { scheduleData } from './dummy';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const Scheduler = () => {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState([]);
  useEffect(() => {
    const getScheduleData = async () => {
      try {
        const res = await fetch('/api/classSession');
        const data = await res.json();
        if (data && Array.isArray(data)) {
          // Transform the fetched data into the desired format
          const convertedData = data.map((event) => {
            const startTime1 = new Date(event.StartTime);
            const startTime = new Date(
              startTime1.getTime() - 7 * 60 * 60 * 1000
            ); // Adding 7 hours
            const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours

            return {
              Id: event.id,
              Subject: event.Course.name,
              Location: event.Room.name,
              StartTime: startTime.toISOString(),
              EndTime: endTime.toISOString(),
              CategoryColor: event.CategoryColor,
              Description: event.teacher.name,
            };
          });

          setScheduleData(convertedData);
        }
      } catch (error) {
        // Handle fetch or data processing errors
        console.error('Error fetching or processing data:', error);
      }
    };
    getScheduleData();
  }, []);
  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };
  const eventTemplate = (props: { [key: string]: object }): JSX.Element => {
    const parsedTime = new Date(props.StartTime);
    const StartTime = parsedTime.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    const parsedTime2 = new Date(props.EndTime);
    const EndTime = parsedTime2.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <div className="w-full h-full flex flex-col bg-[#fecaca]">
        <div className="flex flex-col md:flex-row">
          <div className="ml-0 lg:ml-2 p-0 lg:p-2  bg-orange"> {StartTime}</div>
          <div className=" p-0 lg:p-2 text-center"> - </div>
          <div className=" p-0 lg:p-2 bg-orange"> {EndTime}</div>
        </div>
        <div className="flex flex-col">
          <div className="p-1 font-bold mb-2 sm:mb-0 text-black">
            {props.Subject}
          </div>
          <div className="p-1 font-bold text-black">{props.Location}</div>
        </div>
        <div className="bottom-0 p-1 text-black font-bold absolute">
          {props.Description}
        </div>
      </div>
    );
  };
  const onEventRendered = (args) => {
    applyCategoryColor(args, scheduleObj.currentView);
    // You can perform additional actions after event rendering here
  };
  // const onPopupOpen = (args) => {
  //   console.log(
  //     '🚀 ~ file: page.tsx:27 ~ Scheduler ~ scheduleData:',
  //     scheduleData
  //   );

  //   if (args.type === 'Editor') {
  //     args.data.CategoryColor = '#fecaca';
  //     console.log('🚀 ~ file: page.tsx:65 ~ onPopupOpen ~ args', args);
  //     // Create required custom elements in initial time
  //     if (!args.element.querySelector('.custom-field-row')) {
  //       let row = createElement('div', { className: 'custom-field-row' });
  //       let formElement = args.element.querySelector('.e-schedule-form');
  //       formElement.firstChild.insertBefore(
  //         row,
  //         formElement.firstChild.firstChild
  //       );
  //       let container = createElement('div', {
  //         className: 'custom-field-container',
  //       });
  //       let inputEle = createElement('input', {
  //         className: 'e-field',
  //         attrs: { name: 'EventType' },
  //       });
  //       container.appendChild(inputEle);
  //       row.appendChild(container);
  //       let dropDownList = new DropDownList({
  //         dataSource: [
  //           { text: 'Public Event', value: 'public-event' },
  //           { text: 'Maintenance', value: 'maintenance' },
  //           { text: 'Commercial Event', value: 'commercial-event' },
  //           { text: 'Family Event', value: 'family-event' },
  //         ],
  //         fields: { text: 'text', value: 'value' },
  //         value: args.data.EventType as string,
  //         floatLabelType: 'Always',
  //         placeholder: 'Event Type',
  //       });
  //       dropDownList.appendTo(inputEle);
  //       inputEle.setAttribute('name', 'EventType');
  //       args.data.CategoryColor = '#fecaca';
  //     }
  //   }
  // };

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
    return (
      <div className="w-full h-full flex flex-col bg-[#fecaca]">
        <div className="flex flex-col md:flex-row">
          <div className="ml-0 lg:ml-1 text-black"> {StartTime}</div>
          <div className="pl-1 font-bold mb-2 sm:mb-0 text-black">
            {props.Subject}
          </div>
        </div>
        <div className="w-[20%] h-[100%] bottom-0 right-0 absolute flex flex-col md:flex-row">
          <div className="text-black text-[8px]">{props.Location}</div>
          {/* <div className=" pr-1 text-black ">{props.Description}</div> */}
        </div>
      </div>
    );
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-4 bg-white rounded-3xl">
      {/* <Button onClick={() => console.log(scheduleData)}>TT</Button> */}
      <ScheduleComponent
        width="100%"
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={Date.now()}
        eventSettings={{
          dataSource: scheduleData,
        }}
        dragStart={onDragStart}
        eventRendered={onEventRendered}
        // popupOpen={onPopupOpen}
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
