'use client';
import React, { useState, useEffect } from 'react';
import Loader from '@/components/Loader';
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
import { Button } from '@/components/ui/button';
import { BreadcrumbItem, Breadcrumbs, Image } from '@nextui-org/react';
import { AiFillHome } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { useCourse } from '@/hooks/useCourse';
// import { set } from 'date-fns';
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;
export default function Scheduler({ courseId }) {
  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState([]);
  const { onGetCourseInfo } = useCourse();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getCourseDetails = async () => {
      setIsLoading(true);
      const res = await onGetCourseInfo(courseId);
      const data = await res.json();
      console.log(data, 'Du lieuuuuu');
      setData(data);
      setIsLoading(false);
    };

    getCourseDetails();
  }, [courseId]);
  useEffect(() => {
    const getScheduleData = async () => {
      try {
        const res = await fetch(
          `/api/classSession/course?courseId=${courseId}`
        );
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
              Subject: event.name,
              Location: event.Room.name,
              StartTime: startTime.toISOString(),
              EndTime: endTime.toISOString(),
              CategoryColor: event.CategoryColor,
              Description: event.skill.name,
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
  }, [data]);
  const detailOptions = [
    { id: 1, text: 'Thời khóa biểu' },
    { id: 2, text: 'Danh sách học viên' },
    { id: 3, text: 'Danh sách giảng viên' },
  ];

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

  const monthEventTemplate = (props: {
    [key: string]: object;
  }): JSX.Element => {
    const parsedTime = new Date(props.StartTime);
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

  const router = useRouter();
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col w-full h-full py-6 px-32">
          <Breadcrumbs sizes="lg" color="primary">
            <BreadcrumbItem
              href="/staff/course-list/${data.id}"
              startContent={<AiFillHome />}
            >
              Khóa học
            </BreadcrumbItem>
            <BreadcrumbItem>Chi tiết khóa học</BreadcrumbItem>
          </Breadcrumbs>
          <div className="w-full h-32 flex flex-row items-center justify-between px-16">
            <div className="w-full h-fit flex flex-row justify-between shadow-md rounded-md p-2 m-3 items-center">
              <div className="w-fit h-full flex flex-row items-center">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={data?.thumbnail}
                  width={75}
                  height={75}
                />
                <div className="w-fit h-full flex flex-col justify-center ml-3">
                  <div className="font-bold">{data?.name}</div>
                </div>
              </div>
              <div className="mr-8 font-bold">{data?.BandScoreId}.0</div>
            </div>
          </div>
          <div className="w-fit h-fit pb-2 flex flex-row">
            {detailOptions.map((button) => (
              <Button
                key={button.id}
                className={`${
                  1 === button.id
                    ? 'bg-orange text-white'
                    : 'bg-white text-orange'
                } border-orange w-32 mt-4 mr-4`}
                variant="outline"
                radius="sm"
                onClick={() => {
                  if (button.id === 1) {
                    router.push(`/staff/course-list/${data?.id}/schedule`);
                  } else if (button.id === 2) {
                    router.push(`/staff/course-list/${data?.id}/student-list`);
                  } else if (button.id === 3) {
                    router.push(`/staff/course-list/${data?.id}/teacher-list`);
                  }
                }}
              >
                {button.text}
              </Button>
            ))}
          </div>
          <Button
            onClick={() =>
              console.log(
                '🚀 ~ file: page.tsx:28 ~ Scheduler ~ scheduleData:',
                scheduleData
              )
            }
          >
            Add
          </Button>
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
            <Inject
              services={[Day, Week, Month, Agenda, Resize, DragAndDrop]}
            />
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
      )}
    </div>
  );
}
