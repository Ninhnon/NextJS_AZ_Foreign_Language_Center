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
} from '@nextui-org/react';
import { Label } from '@radix-ui/react-label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { FileDialog } from '../FileDialog';
import { type FileWithPath } from 'react-dropzone';
import { Zoom } from '@/components/ui/zoom-image';
import { AiFillHome } from 'react-icons/ai';
import { RiAdminFill } from 'react-icons/ri';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
// import { getRequest, postRequest } from '@/lib/fetch';

export default function AddCourseCard() {
  // Image
  type FileWithPreview = FileWithPath & {
    preview: string;
  };
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [selectedCourse, setSelectedCourse] = useState(new Set([]));
  const [selectBand, setSelectBand] = useState(new Set([]));
  const [selectedTKB, setSelectedTKB] = useState(new Set([]));
  const [selectedHour, setSelectedHour] = useState(new Set([]));
  const [selectedRoom, setSelectedRoom] = useState(new Set([]));

  const [courseTouched, setCourseTouched] = useState(false);
  const [bandTouched, setBandTouched] = useState(false);
  const [TKBTouched, setTKBTouched] = useState(false);
  const [HourTouched, setHourTouched] = useState(false);
  const [RoomTouched, setRoomTouched] = useState(false);

  // const [isLoadingRooom, setIsLoadingRoom] = useState(false);

  const [rooms, setRooms] = useState<any[]>([]);

  const [courseNameValue, setCourseNameValue] = useState('');
  const [countSessionValue, setCountSessionValue] = useState('');
  // const [isLoading, setIsLoading] = useState(false);
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

  const subClassrooms = [
    { label: 'B1.02', value: 'B102' },
    { label: 'B1.04', value: 'B104' },
    { label: 'B1.06', value: 'B106' },
  ];

  const teachers = [
    { label: 'Nguyễn Văn A', value: 'Nguyễn Văn A' },
    { label: 'Nguyễn Văn B', value: 'Nguyễn Văn B' },
    { label: 'Nguyễn Văn C', value: 'Nguyễn Văn C' },
  ];
  //Query Gender
  useEffect(() => {
    const getRooms = async () => {
      try {
        const res = await fetch('/api/room');
        const data = await res.json();
        console.log(res);
        setRooms(data.data);
      } catch (error) {
        // Handle fetch or parsing errors here
        console.error('Error fetching or parsing data:', error);
      }
    };
    getRooms();
  }, []);
  // const skills = [
  //   { id: 1, skill: 'Reading' },
  //   { id: 2, skill: 'Listening' },
  //   { id: 3, skill: 'Writing' },
  //   { id: 4, skill: 'Speaking' },
  // ];
  const onSubmit1 = async () => {
    const valuesArrayCourse = Array.from(selectedCourse);
    const provinceCode = valuesArrayCourse[0];
    const CourseValue = modules.find(
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

    const numberSession = parseInt(countSessionValue);
    console.log(
      courseNameValue,
      CourseValue,
      bandValue,
      numberSession,

      TKBValue,
      HourValue,
      RoomValue,
      date
    );
    setCurrentTab('course_detail');
    // setIsLoading(true);
    // const res = await postRequest({
    //   endPoint: '/api/user/address',
    //   formData: {
    //     city: CourseValue,
    //     TKB: TKBValue,
    //     Hour: HourValue,
    //     street: streetValue,
    //     houseNumber: countSessionValue,
    //     userId: session?.data?.user?.id,
    //   },
    //   isFormData: false,
    // });
    // setIsLoading(false);
    // if (res?.message === 'success') {
    //   toast.success('Add address successfully');
    // }
  };

  const [date, setDate] = useState<Date>();
  const [currentTab, setCurrentTab] = useState<Key>('basic_info');

  return (
    <div className="flex w-full flex-col p-4">
      <Breadcrumbs sizes="lg" color="primary">
        <BreadcrumbItem startContent={<AiFillHome />}>Home</BreadcrumbItem>
        <BreadcrumbItem startContent={<RiAdminFill />}>Admin</BreadcrumbItem>
        <BreadcrumbItem startContent={<BsFillBookmarkPlusFill />}>
          Add Course
        </BreadcrumbItem>
      </Breadcrumbs>

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
                <div className="row-span-2 col-span-1 flex justify-center items-center flex-col gap-4">
                  {files?.length ? (
                    <div className="flex items-center gap-2">
                      {files.map((file, i) => (
                        <Zoom key={i}>
                          <Image
                            src={file.preview}
                            alt={file.name}
                            className="h-20 w-20 shrink-0 rounded-md object-cover object-center"
                            width={150}
                            height={80}
                          />
                        </Zoom>
                      ))}
                    </div>
                  ) : null}
                  <FileDialog
                    name="image"
                    files={files}
                    setFiles={setFiles}
                    maxFiles={1}
                    maxSize={4 * 1024 * 1024}
                  />
                </div>
                {/* End Image */}

                {/* Start course type */}
                <div className="row-start-3 row-span-1 col-span-1 flex flex-col">
                  <Select
                    isRequired
                    label="Loại khóa học"
                    placeholder="Lựa chọn loại khóa học"
                    labelPlacement="outside"
                    radius="sm"
                    isInvalid={isCourseValid || !courseTouched ? false : true}
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
                        : 'Vui lòng chọn loại khóa học'
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
                <div className=" row-start-3 row-span-1 col-start-2 col-span-2 flex flex-col">
                  <Input
                    isRequired
                    radius="sm"
                    label="Tên khóa học"
                    placeholder="Luyện thi Ielts 6.0"
                    labelPlacement="outside"
                    onChange={(e) => {
                      setCourseNameValue(e.target.value);
                    }}
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                  />
                </div>
                {/* End course name */}

                {/* Start intended course participants */}
                <div className=" row-start-4 row-span-1 col-start-2 col-span-2 flex flex-col">
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
                          b.moduleId === parseInt(Array.from(selectedCourse)[0])
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
                {/* End intended course participants */}

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
                        : 'Vui lòng chọn loại khóa học'
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
                        : 'Vui lòng chọn loại khóa học'
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
                      !isRoomValid
                    }
                    onClick={onSubmit1}
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
              <div className="flex items-center justify-center gap-4">
                <Button
                  color="primary"
                  variant="ghost"
                  className="w-[20%]"
                  onClick={() => setCurrentTab('basic_info')}
                >
                  Quay trở lại
                </Button>

                <Button
                  color="primary"
                  variant="ghost"
                  className="w-[20%]"
                  onClick={() => setCurrentTab('lesson_detail')}
                >
                  Lưu và tiếp tục
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab key="lesson_detail" title="Chi tiết buổi học">
          <Card>
            <CardBody>
              <div className="grid grid-rows-5 grid-flow-row gap-4">
                {/* Start reading section */}
                <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                  <div className="col-span-1 flex items-center justify-start font-medium">
                    <Label>Kỹ năng: Reading</Label>
                  </div>
                  <div className="col-span-2">
                    <Select
                      isRequired
                      label="Phòng học:"
                      placeholder="Lựa chọn phòng học"
                      labelPlacement="outside-left"
                      radius="sm"
                      className="w-full font-bold"
                      classNames={{
                        trigger: 'bg-old-lace',
                        value: 'font-normal text-black',
                        label: 'min-w-max',
                        base: 'items-center',
                      }}
                    >
                      {subClassrooms.map((subClassroom) => (
                        <SelectItem
                          key={subClassroom.value}
                          value={subClassroom.value}
                        >
                          {subClassroom.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Select
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
                    >
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.value} value={teacher.value}>
                          {teacher.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* End reading section */}

                {/* Start writing section */}
                <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                  <div className="col-span-1 flex items-center justify-start font-medium">
                    <Label>Kỹ năng: Writing</Label>
                  </div>
                  <div className="col-span-2">
                    <Select
                      label="Phòng học:"
                      placeholder="Lựa chọn phòng học"
                      labelPlacement="outside-left"
                      radius="sm"
                      className="w-full font-bold"
                      classNames={{
                        trigger: 'bg-old-lace',
                        value: 'font-normal text-black',
                        label: 'min-w-max',
                        base: 'items-center',
                      }}
                    >
                      {subClassrooms.map((subClassroom) => (
                        <SelectItem
                          key={subClassroom.value}
                          value={subClassroom.value}
                        >
                          {subClassroom.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Select
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
                    >
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.value} value={teacher.value}>
                          {teacher.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* End writing section */}

                {/* Start listening section */}
                <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                  <div className="col-span-1 flex items-center justify-start font-medium">
                    <Label>Kỹ năng: Listening</Label>
                  </div>
                  <div className="col-span-2">
                    <Select
                      label="Phòng học:"
                      placeholder="Lựa chọn phòng học"
                      labelPlacement="outside-left"
                      radius="sm"
                      className="w-full font-bold"
                      classNames={{
                        trigger: 'bg-old-lace',
                        value: 'font-normal text-black',
                        label: 'min-w-max',
                        base: 'items-center',
                      }}
                    >
                      {subClassrooms.map((subClassroom) => (
                        <SelectItem
                          key={subClassroom.value}
                          value={subClassroom.value}
                        >
                          {subClassroom.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Select
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
                    >
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.value} value={teacher.value}>
                          {teacher.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* End listening section */}

                {/* Start speaking section */}
                <div className="grid-cols-5 row-span-1 gap-4 grid grid-flow-row">
                  <div className="col-span-1 flex items-center justify-start font-medium">
                    <Label>Kỹ năng: Speaking</Label>
                  </div>
                  <div className="col-span-2">
                    <Select
                      label="Phòng học:"
                      placeholder="Lựa chọn phòng học"
                      labelPlacement="outside-left"
                      radius="sm"
                      className="w-full font-bold"
                      classNames={{
                        trigger: 'bg-old-lace',
                        value: 'font-normal text-black',
                        label: 'min-w-max',
                        base: 'items-center',
                      }}
                    >
                      {subClassrooms.map((subClassroom) => (
                        <SelectItem
                          key={subClassroom.value}
                          value={subClassroom.value}
                        >
                          {subClassroom.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Select
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
                    >
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.value} value={teacher.value}>
                          {teacher.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
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
                    onClick={() => setCurrentTab('finish')}
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
                <Label className="font-semibold">
                  Danh sách khóa học đã được tạo thành công
                </Label>
                <Image
                  className="object-cover rounded-xl"
                  src={`/tick_icon.png`}
                  alt="hero banner"
                  width={100}
                  height={50}
                  loading="lazy"
                />
                <Button
                  color="primary"
                  variant="ghost"
                  className="w-[20%]"
                  onClick={() => setCurrentTab('lesson_detail')}
                >
                  Quay lại danh sách khóa học
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
