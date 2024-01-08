'use client';

import React, { Key, useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Select,
  SelectItem,
  Button,
  Image,
  Breadcrumbs,
  BreadcrumbItem,
  Checkbox,
} from '@nextui-org/react';
import { applyCategoryColor } from '@/lib/utils';
import { HiPhoto } from 'react-icons/hi2';
import { ImageDialog } from '@/components/imageDialog';
import { Label } from '@radix-ui/react-label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { type FileWithPath } from 'react-dropzone';
import { Zoom } from '@/components/ui/zoom-image';
import { AiFillHome } from 'react-icons/ai';
import { RiAdminFill } from 'react-icons/ri';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
import { postRequest } from '@/lib/fetch';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react/hooks';
const { useUploadThing } = generateReactHelpers<OurFileRouter>();
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';
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
import './schedule-component.css';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

export default function AddCourseCard() {
  const router = useRouter();
  // Image
  type FileWithPreview = FileWithPath & {
    preview: string;
  };
  const [thumbnail, setThumbnail] = React.useState<FileWithPreview[]>([]);

  // const [classSession, setClassSession] = useState<any[]>([]);
  const { startUpload } = useUploadThing('imageUploader');
  const [selectedCourse, setSelectedCourse] = useState(new Set([]));
  const [selectBand, setSelectBand] = useState(new Set([]));
  const [selectedTKB, setSelectedTKB] = useState(new Set([]));
  const [selectedHour, setSelectedHour] = useState(new Set([]));
  const [selectedRoom, setSelectedRoom] = useState(new Set([]));
  const [selectedListening, setSelectedListening] = useState(new Set([]));
  const [selectedWriting, setSelectedWriting] = useState(new Set([]));
  const [selectedSpeaking, setSelectedSpeaking] = useState(new Set([]));
  const [selectedReading, setSelectedReading] = useState(new Set([]));
  const [courseTouched, setCourseTouched] = useState(false);
  const [bandTouched, setBandTouched] = useState(false);
  const [TKBTouched, setTKBTouched] = useState(false);
  const [HourTouched, setHourTouched] = useState(false);
  const [RoomTouched, setRoomTouched] = useState(false);

  // const [isLoadingRooom, setIsLoadingRoom] = useState(false);

  const [rooms, setRooms] = useState<any[]>([]);
  const [teachers, setTeachers] = useState<any[]>([]);

  const [courseNameValue, setCourseNameValue] = useState('');
  const [countSessionValue, setCountSessionValue] = useState('');
  const [totalFeeValue, setTotalFeeValue] = useState('');
  const [toalCostValue, setTotalCostValue] = useState('');
  const [totalAttendeeValue, setTotalAttendeeValue] = useState('');

  const [isOpenListening, setIsOpenListening] = useState(false);
  const [isOpenWriting, setIsOpenWriting] = useState(false);
  const [isOpenSpeaking, setIsOpenSpeaking] = useState(false);
  const [isOpenReading, setIsOpenReading] = useState(false);

  // Schedule:

  const [scheduleObj, setScheduleObj] = useState();
  const [scheduleData, setScheduleData] = useState([]);

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };
  const onEventRendered = (args) => {
    applyCategoryColor(args, scheduleObj.currentView);
    // You can perform additional actions after event rendering here
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
  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const [isLoading, setIsLoading] = useState(false);
  const modules = [
    { id: 1, module: 'IELTS' },
    { id: 2, module: 'TOEIC' },
  ];
  const bands = [
    { id: 1, moduleId: 1, band: '5.0' },
    { id: 2, moduleId: 1, band: '6.0' },
    { id: 3, moduleId: 1, band: '7.0' },
    { id: 4, moduleId: 1, band: '8.0' },
    { id: 5, moduleId: 2, band: '500' },
    { id: 6, moduleId: 2, band: '600' },
    { id: 7, moduleId: 2, band: '700' },
    { id: 8, moduleId: 2, band: '800' },
  ];

  const isCourseValid = selectedCourse.size > 0;
  const isBandValid = selectBand.size > 0;
  const isTKBValid = selectedTKB.size > 0;
  const isHourValid = selectedHour.size > 0;
  const isRoomValid = selectedRoom.size > 0;

  const schedules = [
    { id: 1, label: 'Thứ 2, 4, 6' },
    { id: 2, label: 'Thứ 3, 5, 7' },
    { id: 3, label: 'Thứ 7, CN' },
  ];

  const classTimetables = [
    { id: 1, value: '07:00-09:00' },
    { id: 2, value: '09:00-11:00' },
    { id: 3, value: '13:00-15:00' },
    { id: 1, value: '15:00-17:00' },
    { id: 2, value: '17:00-19:00' },
    { id: 3, value: '19:00-21:00' },
  ];

  //Query Rooms
  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await fetch('/api/room');
        const data = await res.json();
        // console.log(res);
        setRooms(data.data);
      } catch (error) {
        // Handle fetch or parsing errors here
        console.error('Error fetching or parsing data:', error);
      }
    };
    getRooms();
  }, []);

  //Query Teachers
  useEffect(() => {
    const getTeachers = async () => {
      try {
        const res = await fetch('/api/user/teacher');
        const data = await res.json();
        // console.log(res);
        setTeachers(data.data);
      } catch (error) {
        // Handle fetch or parsing errors here
        console.error('Error fetching or parsing data:', error);
      }
    };
    getTeachers();
  }, []);
  const onDoneInput = async () => {
    setCurrentTab('course_detail');
  };
  // OnPrepare
  const onPrepare = async () => {
    const [avatarImage] = await Promise.all([
      startUpload([...thumbnail]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);
    const valuesArrayCourse = Array.from(selectedCourse);
    const provinceCode = valuesArrayCourse[0];
    const ModuleValue = modules.find(
      (province) => province.id == provinceCode
    )?.id;

    const valuesArrayBand = Array.from(selectBand);
    const bandCode = valuesArrayBand[0];
    const bandValue = modules.find((band) => band.id == bandCode)?.id;

    const valuesArrayTKB = Array.from(selectedTKB);
    const TKBCode = valuesArrayTKB[0];
    const TKBValue = modules.find((TKB) => TKB.id == TKBCode)?.id;

    const valuesArrayHour = Array.from(selectedTKB);
    const HourCode = valuesArrayHour[0];
    const HourValue = modules.find((Hour) => Hour.id == HourCode)?.id;

    const valuesArrayRoom = Array.from(selectedTKB);
    const RoomCode = valuesArrayRoom[0];
    const RoomValue = modules.find((Room) => Room.id == RoomCode)?.id;

    const valuesArrayListening = Array.from(selectedListening);
    const ListeningCode = valuesArrayListening[0];
    const ListeningValue = teachers.find(
      (Room) => Room.id == ListeningCode
    )?.id;

    const valuesArrayReading = Array.from(selectedReading);
    const ReadingCode = valuesArrayReading[0];
    const ReadingValue = teachers.find((Room) => Room.id == ReadingCode)?.id;

    const valuesArrayWriting = Array.from(selectedWriting);
    const WritingCode = valuesArrayWriting[0];
    const WritingValue = teachers.find((Room) => Room.id == WritingCode)?.id;

    const valuesArraySpeaking = Array.from(selectedSpeaking);
    const SpeakingCode = valuesArraySpeaking[0];
    const SpeakingValue = teachers.find((Room) => Room.id == SpeakingCode)?.id;
    const numberSession = parseInt(countSessionValue);

    setIsLoading(true);
    const res = await postRequest({
      endPoint: '/api/course/prepare',
      formData: {
        TKB: TKBValue,
        Hour: HourValue,
        name: courseNameValue,
        moduleId: ModuleValue,
        bandScoreId: bandValue,
        totalSession: numberSession,
        thumbnail: avatarImage?.[0]?.url
          ? avatarImage?.[0]?.url
          : 'https://utfs.io/f/2279ea0d-31d2-4047-b234-3cf923e076db-2p.jpg',
        totalAttendance: totalAttendeeValue,
        tuitionFee: totalFeeValue,
        totalCost: toalCostValue,
        startTime: date,
        TKBValue,
        HourValue,
        RoomValue,
        sessions: excelData,
        ListeningValue: ListeningValue,
        ReadingValue: ReadingValue,
        WritingValue: WritingValue,
        SpeakingValue: SpeakingValue,
      },
      isFormData: false,
    });
    try {
      const data = await res.data;
      if (data && Array.isArray(data)) {
        let i = 0;
        // Transform the fetched data into the desired format
        const convertedData = data.map((event) => {
          const startTime1 = new Date(event.StartTime);
          const startTime = new Date(startTime1.getTime() - 7 * 60 * 60 * 1000); // Adding 7 hours
          const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours
          i = i + 1;
          return {
            Id: event.id,
            Subject: event.name,
            Location: event.room,
            StartTime: startTime.toISOString(),
            EndTime: endTime.toISOString(),
            CategoryColor: event.categoryColor,
            Description: event.teacher,
          };
        });
        setScheduleData(convertedData);
      }
    } catch (error) {
      // Handle fetch or data processing errors
      console.error('Error fetching or processing data:', error);
    }
    setIsLoading(false);
    setCurrentTab('finish');
  };

  const onSubmit = async () => {
    const [avatarImage] = await Promise.all([
      startUpload([...thumbnail]).then((res) => {
        const formattedImages = res?.map((image) => ({
          id: image.key,
          name: image.key.split('_')[1] ?? image.key,
          url: image.url,
        }));
        return formattedImages ?? null;
      }),
    ]);
    const valuesArrayCourse = Array.from(selectedCourse);
    const provinceCode = valuesArrayCourse[0];
    const ModuleValue = modules.find(
      (province) => province.id == provinceCode
    )?.id;

    const valuesArrayBand = Array.from(selectBand);
    const bandCode = valuesArrayBand[0];
    const bandValue = modules.find((band) => band.id == bandCode)?.id;

    const valuesArrayTKB = Array.from(selectedTKB);
    const TKBCode = valuesArrayTKB[0];
    const TKBValue = modules.find((TKB) => TKB.id == TKBCode)?.id;

    const valuesArrayHour = Array.from(selectedTKB);
    const HourCode = valuesArrayHour[0];
    const HourValue = modules.find((Hour) => Hour.id == HourCode)?.id;

    const valuesArrayRoom = Array.from(selectedTKB);
    const RoomCode = valuesArrayRoom[0];
    const RoomValue = modules.find((Room) => Room.id == RoomCode)?.id;

    const valuesArrayListening = Array.from(selectedListening);
    const ListeningCode = valuesArrayListening[0];
    const ListeningValue = teachers.find(
      (Room) => Room.id == ListeningCode
    )?.id;

    const valuesArrayReading = Array.from(selectedReading);
    const ReadingCode = valuesArrayReading[0];
    const ReadingValue = teachers.find((Room) => Room.id == ReadingCode)?.id;

    const valuesArrayWriting = Array.from(selectedWriting);
    const WritingCode = valuesArrayWriting[0];
    const WritingValue = teachers.find((Room) => Room.id == WritingCode)?.id;

    const valuesArraySpeaking = Array.from(selectedSpeaking);
    const SpeakingCode = valuesArraySpeaking[0];
    const SpeakingValue = teachers.find((Room) => Room.id == SpeakingCode)?.id;
    const numberSession = parseInt(countSessionValue);

    setIsLoading(true);
    const res = await postRequest({
      endPoint: '/api/course/add',
      formData: {
        TKB: TKBValue,
        Hour: HourValue,
        name: courseNameValue,
        moduleId: ModuleValue,
        bandScoreId: bandValue,
        totalSession: numberSession,
        thumbnail: avatarImage?.[0]?.url
          ? avatarImage?.[0]?.url
          : 'https://utfs.io/f/2279ea0d-31d2-4047-b234-3cf923e076db-2p.jpg',
        totalAttendance: totalAttendeeValue,
        tuitionFee: totalFeeValue,
        totalCost: toalCostValue,
        startTime: date,
        TKBValue,
        HourValue,
        RoomValue,
        sessions: excelData,
        ListeningValue: ListeningValue,
        ReadingValue: ReadingValue,
        WritingValue: WritingValue,
        SpeakingValue: SpeakingValue,
      },
      isFormData: false,
    });
    setIsLoading(false);

    router.push(`/staff/add_courses/done/`);
    router.refresh();
    if (res?.message === 'success') {
      toast.success('Thêm khóa học thành công');
    }
  };

  //     Submit 2
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // onchange event
  const handleFile = (e) => {
    const fileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
    ];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError('CHọn file không đúng định dạng');
        setExcelFile(null);
      }
    } else {
      console.log('Vui lòng chọn file');
    }
  };

  // submit event
  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0, 10));
    }
  };

  const [date, setDate] = useState<Date>();
  const [currentTab, setCurrentTab] = useState<Key>('basic_info');
  // const [currentTab, setCurrentTab] = useState<Key>('course_detail');

  return (
    <div className="flex w-full flex-col p-4">
      <Breadcrumbs sizes="lg" color="primary">
        <BreadcrumbItem startContent={<AiFillHome />}>Home</BreadcrumbItem>
        <BreadcrumbItem startContent={<RiAdminFill />}>Admin</BreadcrumbItem>
        <BreadcrumbItem startContent={<BsFillBookmarkPlusFill />}>
          Add Course
        </BreadcrumbItem>
      </Breadcrumbs>
      {isLoading ? (
        <div className="flex w-full h-full justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full flex-col p-4">
          <Label className="text-lg font-semibold mt-4 ml-4">
            Tạo khóa học mới
          </Label>
          {/* 
      {!addSuccess ? null : (
        } */}
          <Tabs
            aria-label="Options"
            variant="bordered"
            color="primary"
            classNames={{
              tabList: 'border-2 border-orange',
              tabContent: 'text-orange font-bold',
              base: 'justify-center',
            }}
            selectedKey={currentTab}
          >
            <Tab key="basic_info" title="Thông tin cơ bản">
              <Card>
                <CardBody>
                  <div className="grid grid-cols-3 grid-rows-7 gap-4">
                    {/* Start Image */}
                    <div className="align-center row-span-2 col-span-1 flex justify-center items-center flex-rol gap-4">
                      <ImageDialog
                        name="images"
                        maxFiles={1}
                        customButton={
                          <HiPhoto size={30} className="text-sky-500" />
                        }
                        maxSize={1024 * 1024 * 4}
                        files={thumbnail}
                        setFiles={setThumbnail}
                        disabled={false}
                      />
                      {thumbnail?.length ? (
                        <div className="flex items-center gap-2">
                          {thumbnail.map((file, i) => (
                            <Zoom key={i}>
                              <Image
                                src={file.preview}
                                alt={file.name}
                                className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                                width={200}
                                height={200}
                              />
                            </Zoom>
                          ))}
                        </div>
                      ) : null}
                    </div>
                    {/* End Image */}

                    {/* Start course type */}
                    <div className="row-start-3 row-span-1 col-span-1 flex flex-col">
                      <Input
                        type="number"
                        inputMode="numeric"
                        isRequired
                        radius="sm"
                        label="Học phí"
                        placeholder="5000000"
                        labelPlacement="outside"
                        onChange={(e) => {
                          setTotalFeeValue(e.target.value);
                        }}
                        className="w-full font-bold"
                        classNames={{
                          inputWrapper: 'bg-old-lace',
                        }}
                      />
                    </div>
                    {/* End course type */}

                    {/* Start date picker */}
                    <div className="row-start-4 row-span-1 col-span-1 flex flex-col">
                      <Label className="text-sm font-medium mb-1">
                        Ngày bắt đầu khóa
                      </Label>
                      <Popover>
                        <PopoverTrigger>
                          <Button
                            variant={'outline'}
                            className={`w-full justify-start text-left font-normal ${
                              !date ? 'text-muted-foreground' : ''
                            } bg-old-lace hover:bg-gray-200 text-black justify-between`}
                          >
                            {date ? (
                              format(date, 'PPP')
                            ) : (
                              <span className="font-normal text-gray-500">
                                Chọn ngày bắt đầu
                              </span>
                            )}
                            <CalendarIcon className="ml-2 h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    {/* End date picker */}

                    {/* Start number of sessions */}
                    <div className="row-start-5 row-span-1 col-span-1 flex flex-col">
                      <Input
                        isRequired
                        type="number"
                        inputMode="numeric"
                        radius="sm"
                        label="Số buổi học"
                        placeholder="Nhập số buổi học"
                        labelPlacement="outside"
                        className="w-full font-bold"
                        classNames={{
                          inputWrapper: 'bg-old-lace',
                        }}
                        onChange={(e) => {
                          const enteredValue = e.target.value;

                          // Allowing only numbers by restricting keystrokes
                          const onlyNumbers = enteredValue.replace(/\D/g, ''); // Replace any non-digit character with an empty string

                          // Update the input value with only numeric characters
                          e.target.value = onlyNumbers;

                          // Update the state or perform any other necessary action with the numeric value
                          setCountSessionValue(onlyNumbers);
                        }}
                      />
                    </div>
                    {/* End number of sessions */}

                    {/* Start schedule */}
                    <div className="row-start-6 row-span-1 col-span-1 flex flex-col">
                      <Select
                        isRequired
                        label="Lịch học trong tuần"
                        placeholder="Lựa chọn lịch học"
                        labelPlacement="outside"
                        radius="sm"
                        isInvalid={isTKBValid || !TKBTouched ? false : true}
                        errorMessage={
                          isTKBValid || !TKBTouched
                            ? ''
                            : 'Vui lòng chọn lịch học'
                        }
                        autoFocus={false}
                        selectedKeys={selectedTKB}
                        onSelectionChange={setSelectedTKB}
                        onClose={() => setTKBTouched(true)}
                        className="w-full font-bold"
                        classNames={{
                          trigger: 'bg-old-lace',
                          value: 'font-normal text-black',
                        }}
                      >
                        {schedules.map((schedule) => (
                          <SelectItem key={schedule.id} value={schedule.id}>
                            {schedule.label}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    {/* End schedule */}

                    {/* Start course name */}
                    <div className=" row-start-1 row-span-1 col-start-2 col-span-2 flex flex-col">
                      <Input
                        isRequired
                        radius="sm"
                        label="Tên khóa học"
                        placeholder="Luyện thi Ielts 6.0"
                        labelPlacement="outside"
                        onChange={(e) => {
                          setCourseNameValue(e.target.value);
                        }}
                        className="w-full font-bold"
                        classNames={{
                          inputWrapper: 'bg-old-lace',
                        }}
                      />
                    </div>
                    {/* End course name */}

                    {/* Start intended course participants */}
                    <div className=" row-start-2 row-span-1 col-start-2 col-span-2 flex flex-col">
                      <Select
                        isRequired
                        label="Loại khóa học"
                        placeholder="Lựa chọn loại khóa học"
                        labelPlacement="outside"
                        radius="sm"
                        isInvalid={
                          isCourseValid || !courseTouched ? false : true
                        }
                        errorMessage={
                          isCourseValid || !courseTouched
                            ? ''
                            : 'Vui lòng chọn loại khóa học'
                        }
                        autoFocus={false}
                        selectedKeys={selectedCourse}
                        onSelectionChange={setSelectedCourse}
                        onClose={() => setCourseTouched(true)}
                        className="w-full font-bold"
                        classNames={{
                          trigger: 'bg-old-lace',
                          value: 'font-normal text-black',
                        }}
                      >
                        {modules?.map((c) => (
                          <SelectItem key={c.id} value={c.module}>
                            {c.module}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    {/* End intended course participants */}

                    {/* Start course name */}
                    <div className=" row-start-3 row-span-1 col-start-2 col-span-2 flex flex-col">
                      <Select
                        isRequired
                        label="Mục tiêu khóa học"
                        placeholder="IELTS 6.0 || TOEIC 700"
                        labelPlacement="outside"
                        radius="sm"
                        isInvalid={isBandValid || !bandTouched ? false : true}
                        errorMessage={
                          isBandValid || !bandTouched
                            ? ''
                            : 'Vui lòng chọn mục tiêu khóa học'
                        }
                        autoFocus={false}
                        selectedKeys={selectBand}
                        onSelectionChange={setSelectBand}
                        onClose={() => setBandTouched(true)}
                        className="w-full font-bold"
                        classNames={{
                          trigger: 'bg-old-lace',
                          value: 'font-normal text-black',
                        }}
                      >
                        {bands
                          .filter(
                            (b) =>
                              b.moduleId ===
                              parseInt(Array.from(selectedCourse)[0])
                          )
                          .map((filteredBand) => (
                            <SelectItem
                              key={filteredBand.id}
                              value={filteredBand.id}
                            >
                              {filteredBand.band}
                            </SelectItem>
                          ))}
                      </Select>
                    </div>
                    {/* End course name */}

                    <div className=" row-start-4 row-span-1 col-start-2 col-span-1 flex flex-col">
                      <Input
                        isRequired
                        type="number"
                        inputMode="numeric"
                        radius="sm"
                        label="Số lượng học viên dự kiến"
                        placeholder="50"
                        labelPlacement="outside"
                        onChange={(e) => {
                          setTotalAttendeeValue(e.target.value);
                        }}
                        className="w-full font-bold"
                        classNames={{
                          inputWrapper: 'bg-old-lace',
                        }}
                      />
                    </div>
                    {/* Start course name */}
                    <div className=" row-start-4 row-span-1 col-start-3 col-span-1 flex flex-col">
                      <Input
                        isRequired
                        type="number"
                        inputMode="numeric"
                        radius="sm"
                        label="Lương cố định/giảng viên"
                        placeholder="1300000"
                        labelPlacement="outside"
                        onChange={(e) => {
                          setTotalCostValue(e.target.value);
                        }}
                        className="w-full font-bold"
                        classNames={{
                          inputWrapper: 'bg-old-lace',
                        }}
                      />
                    </div>
                    {/* End course name */}

                    {/* Start course descriptions */}
                    <div className=" row-start-5 row-span-1 col-start-2 col-span-2 flex flex-col">
                      <Input
                        radius="sm"
                        label="Mô tả khóa học (tùy chọn)"
                        placeholder="Nâng band cấp tốc"
                        labelPlacement="outside"
                        classNames={{
                          inputWrapper: 'bg-old-lace',
                        }}
                      />
                    </div>
                    {/* End course descriptions */}

                    {/* Start class timetable */}
                    <div className=" row-start-6 row-span-1 col-start-2 col-span-1 flex flex-col">
                      <Select
                        isRequired
                        label="Ca học"
                        placeholder="Lựa chọn khung giờ học"
                        labelPlacement="outside"
                        radius="sm"
                        isInvalid={isHourValid || !HourTouched ? false : true}
                        errorMessage={
                          isHourValid || !HourTouched
                            ? ''
                            : 'Vui lòng chọn ca học'
                        }
                        autoFocus={false}
                        selectedKeys={selectedHour}
                        onSelectionChange={setSelectedHour}
                        onClose={() => setHourTouched(true)}
                        className="w-full font-bold"
                        classNames={{
                          trigger: 'bg-old-lace',
                          value: 'font-normal text-black',
                        }}
                      >
                        {classTimetables.map((classTimetable) => (
                          <SelectItem
                            key={classTimetable.value}
                            value={classTimetable.value}
                          >
                            {classTimetable.value}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    {/* End class timetable */}

                    {/* Start main classroom */}
                    <div className=" row-start-6 row-span-1 col-start-3 col-span-1 flex flex-col">
                      <Select
                        isRequired
                        label="Phòng học cố định"
                        placeholder="Lựa chọn phòng cố định"
                        labelPlacement="outside"
                        radius="sm"
                        isInvalid={isRoomValid || !RoomTouched ? false : true}
                        errorMessage={
                          isRoomValid || !RoomTouched
                            ? ''
                            : 'Vui lòng chọn phòng'
                        }
                        autoFocus={false}
                        selectedKeys={selectedRoom}
                        onSelectionChange={setSelectedRoom}
                        onClose={() => setRoomTouched(true)}
                        className="w-full font-bold"
                        classNames={{
                          trigger: 'bg-old-lace',
                          value: 'font-normal text-black',
                        }}
                      >
                        {rooms?.map((mainClassroom) => (
                          <SelectItem
                            key={mainClassroom.id}
                            value={mainClassroom.id}
                          >
                            {mainClassroom.name}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    {/* End main classroom */}

                    {/* Start next button */}
                    <div className="row-start-7 row-span-1 col-span-3 flex justify-center">
                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[20%]"
                        disabled={
                          !isCourseValid ||
                          !isBandValid ||
                          !countSessionValue ||
                          !date ||
                          !isTKBValid ||
                          !isHourValid ||
                          !isRoomValid ||
                          !thumbnail?.length
                        }
                        onClick={onDoneInput}
                      >
                        Lưu và tiếp tục
                      </Button>
                    </div>
                    {/* End next button */}
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="course_detail" title="Chi tiết khóa học">
              <Card>
                <CardBody>
                  <div className="flex flex-col gap-4 items-center">
                    <h3 className=" text-orange align-center justify-center">
                      Thêm danh sách chi tiết các buổi học
                    </h3>

                    {/* form */}
                    <form
                      className="form-group custom-form"
                      onSubmit={handleFileSubmit}
                    >
                      <input
                        type="file"
                        className="form-control"
                        required
                        onChange={handleFile}
                      />
                      <Button color="primary" variant="ghost" type="submit">
                        UPLOAD
                      </Button>
                      {typeError && (
                        <div className="alert alert-danger" role="alert">
                          {typeError}
                        </div>
                      )}
                    </form>

                    {/* view data */}
                    <div className="viewer">
                      {excelData ? (
                        <div className="table-responsive">
                          <table className="table">
                            <thead>
                              <tr>
                                {Object.keys(excelData[0]).map((key) => (
                                  <th key={key}>{key}</th>
                                ))}
                              </tr>
                            </thead>

                            <tbody>
                              {excelData.map((individualExcelData, index) => (
                                <tr key={index}>
                                  {Object.keys(individualExcelData).map(
                                    (key) => (
                                      <td key={key}>
                                        {individualExcelData[key]}
                                      </td>
                                    )
                                  )}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div>No File is uploaded yet!</div>
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[60%]"
                        onClick={() => setCurrentTab('basic_info')}
                      >
                        Quay lại
                      </Button>

                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[60%]"
                        onClick={() => setCurrentTab('lesson_detail')}
                      >
                        Lưu và tiếp tục
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="lesson_detail" title="Chi tiết buổi học">
              <Card>
                <CardBody>
                  <div className="grid grid-rows-5 grid-flow-row gap-4 items-center align-center">
                    {/* Start reading section */}
                    <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                      <div className="col-span-1 flex items-center justify-start font-medium">
                        <Checkbox
                          isSelected={isOpenListening}
                          onChange={() => setIsOpenListening(!isOpenListening)}
                        />
                        <Label>Kỹ năng: Listening</Label>
                      </div>

                      {isOpenListening && (
                        <div className="col-span-2">
                          <Select
                            isRequired
                            label="Giảng viên:"
                            placeholder="Lựa chọn giảng viên"
                            labelPlacement="outside-left"
                            radius="sm"
                            autoFocus={false}
                            selectedKeys={selectedListening}
                            onSelectionChange={setSelectedListening}
                            className="w-full font-bold"
                            classNames={{
                              trigger: 'bg-old-lace',
                              value: 'font-normal text-black',
                              label: 'min-w-max',
                              base: 'items-center',
                            }}
                          >
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                    {/* End reading section */}

                    {/* Start writing section */}
                    <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                      <div className="col-span-1 flex items-center justify-start font-medium">
                        <Checkbox
                          isSelected={isOpenReading}
                          onChange={() => setIsOpenReading(!isOpenReading)}
                        />
                        <Label>Kỹ năng: Reading</Label>
                      </div>

                      {isOpenReading && (
                        <div className="col-span-2">
                          <Select
                            isRequired
                            label="Giảng viên:"
                            placeholder="Lựa chọn giảng viên"
                            labelPlacement="outside-left"
                            radius="sm"
                            className="w-full font-bold"
                            classNames={{
                              trigger: 'bg-old-lace',
                              value: 'font-normal text-black',
                              label: 'min-w-max',
                              base: 'items-center',
                            }}
                            autoFocus={false}
                            selectedKeys={selectedReading}
                            onSelectionChange={setSelectedReading}
                          >
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                    {/* End writing section */}

                    {/* Start listening section */}
                    <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                      <div className="col-span-1 flex items-center justify-start font-medium">
                        <Checkbox
                          isSelected={isOpenWriting}
                          onChange={() => setIsOpenWriting(!isOpenWriting)}
                        />
                        <Label>Kỹ năng: Writing</Label>
                      </div>

                      {isOpenWriting && (
                        <div className="col-span-2">
                          <Select
                            isRequired
                            label="Giảng viên:"
                            placeholder="Lựa chọn giảng viên"
                            labelPlacement="outside-left"
                            radius="sm"
                            className="w-full font-bold"
                            classNames={{
                              trigger: 'bg-old-lace',
                              value: 'font-normal text-black',
                              label: 'min-w-max',
                              base: 'items-center',
                            }}
                            autoFocus={false}
                            selectedKeys={selectedWriting}
                            onSelectionChange={setSelectedWriting}
                          >
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                    {/* End listening section */}

                    {/* Start speaking section */}
                    <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                      <div className="col-span-1 flex items-center justify-start font-medium">
                        <Checkbox
                          isSelected={isOpenSpeaking}
                          onChange={() => setIsOpenSpeaking(!isOpenSpeaking)}
                        />
                        <Label>Kỹ năng: Speaking</Label>
                      </div>
                      {isOpenSpeaking && (
                        <div className="col-span-2">
                          <Select
                            isRequired
                            label="Giảng viên:"
                            placeholder="Lựa chọn giảng viên"
                            labelPlacement="outside-left"
                            radius="sm"
                            className="w-full font-bold"
                            classNames={{
                              trigger: 'bg-old-lace',
                              value: 'font-normal text-black',
                              label: 'min-w-max',
                              base: 'items-center',
                            }}
                            autoFocus={false}
                            selectedKeys={selectedSpeaking}
                            onSelectionChange={setSelectedSpeaking}
                          >
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>
                    {/* End speaking section */}

                    <div className="row-span-1 flex justify-center space-x-4 mt-4">
                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[20%]"
                        onClick={() => setCurrentTab('course_detail')}
                      >
                        Quay lại
                      </Button>

                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[20%]"
                        onClick={onPrepare}
                      >
                        Lưu và tiếp tục
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="finish" title="Hoàn thành">
              <Card>
                <CardBody>
                  <div className="flex flex-col items-center space-y-4">
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
                      </ViewsDirective>
                      <Inject
                        services={[
                          Day,
                          Week,
                          Month,
                          Agenda,
                          Resize,
                          DragAndDrop,
                        ]}
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
                    <div className="row-span-1 flex justify-center space-x-4 mt-4">
                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[60%]"
                        onClick={() => setCurrentTab('lesson_detail')}
                      >
                        Quay lại
                      </Button>

                      <Button
                        color="primary"
                        variant="ghost"
                        className="w-[60%]"
                        onClick={onSubmit}
                      >
                        Xác nhận thêm
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
}
