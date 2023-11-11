'use client';

import React, { Key, useState } from 'react';
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
<<<<<<< HEAD
  Breadcrumbs,
  BreadcrumbItem,
=======
>>>>>>> 4fcfb7d (Init: admin add course page)
} from '@nextui-org/react';
import { Label } from '@radix-ui/react-label';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { FileDialog } from '../FileDialog';
import { type FileWithPath } from 'react-dropzone';
import { Zoom } from '@/components/ui/zoom-image';
<<<<<<< HEAD
import { AiFillHome } from 'react-icons/ai';
import { RiAdminFill } from 'react-icons/ri';
import { BsFillBookmarkPlusFill } from 'react-icons/bs';
=======
>>>>>>> 4fcfb7d (Init: admin add course page)

export default function AddCourseCard() {
  // Image
  type FileWithPreview = FileWithPath & {
    preview: string;
  };
  const [files, setFiles] = React.useState<FileWithPreview[]>([]);

  const levels = [
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  const schedules = [
    { label: 'Thứ 2, 4, 6', value: '246' },
    { label: 'Thứ 3, 5, 7', value: '357' },
    { label: 'Thứ 7, CN', value: '78' },
  ];

  const courseTypes = [
    { label: 'Luyện thi Ielts', value: 'ielts' },
    { label: 'Luyện thi Toeic', value: 'toeic' },
    { label: 'Luyện thi VSTEP', value: 'vstep' },
    { label: 'Luyện thi TOEFL', value: 'toefl' },
  ];

  const classTimetables = [
    { label: '18:00 - 19:30', value: '18-19:30' },
    { label: '19:30 - 21:00', value: '19:30-21:00' },
    { label: '21:00 - 22:30', value: '21:00-22:30' },
  ];

  const mainClassrooms = [
    { label: 'Phòng B102', value: 'B102' },
    { label: 'Phòng B104', value: 'B104' },
    { label: 'Phòng B106', value: 'B106' },
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

  const [date, setDate] = useState<Date>();
  const [currentTab, setCurrentTab] = useState<Key>('basic_info');

  return (
    <div className="flex w-full flex-col p-4">
<<<<<<< HEAD
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
=======
>>>>>>> 4fcfb7d (Init: admin add course page)
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

                {/* Start level */}
                <div className="row-start-3 row-span-1 col-span-1 flex flex-col">
                  <Select
                    label="Trình độ"
                    placeholder="Lựa chọn trình độ"
                    labelPlacement="outside"
                    radius="sm"
                    className="w-full font-bold"
                    classNames={{
<<<<<<< HEAD
                      trigger: 'bg-old-lace hover:bg-parchment',
=======
                      trigger: 'bg-old-lace',
>>>>>>> 4fcfb7d (Init: admin add course page)
                      value: 'font-normal text-black',
                    }}
                  >
                    {levels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End level */}

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
                    radius="sm"
                    label="Số buổi học"
                    placeholder="Nhập số buổi học"
                    labelPlacement="outside"
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                  />
                </div>
                {/* End number of sessions */}

                {/* Start schedule */}
                <div className="row-start-6 row-span-1 col-span-1 flex flex-col">
                  <Select
                    label="Lịch học trong tuần"
                    placeholder="Lựa chọn lịch học"
                    labelPlacement="outside"
                    radius="sm"
                    className="w-full font-bold"
                    classNames={{
                      trigger: 'bg-old-lace',
                      value: 'font-normal text-black',
                    }}
                  >
                    {schedules.map((schedule) => (
                      <SelectItem key={schedule.value} value={schedule.value}>
                        {schedule.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End schedule */}

                {/* Start course type */}
                <div className=" row-span-1 col-start-2 col-span-2 flex flex-col">
                  <Select
                    label="Loại khóa học"
                    placeholder="Lựa chọn loại khóa học"
                    labelPlacement="outside"
                    radius="sm"
                    className="w-full font-bold"
                    classNames={{
                      trigger: 'bg-old-lace',
                      value: 'font-normal text-black',
                    }}
                  >
                    {courseTypes.map((courseType) => (
                      <SelectItem
                        key={courseType.value}
                        value={courseType.value}
                      >
                        {courseType.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End course type */}

                {/* Start course id */}
                <div className=" row-start-2 row-span-1 col-start-2 col-span-2 flex flex-col">
                  <Input
                    radius="sm"
                    label="ID khóa học"
                    placeholder="IELTS1112"
                    labelPlacement="outside"
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                  />
                </div>
                {/* End course id */}

                {/* Start course name */}
                <div className=" row-start-3 row-span-1 col-start-2 col-span-2 flex flex-col">
                  <Input
                    radius="sm"
                    label="Tên khóa học"
                    placeholder="Luyện thi Ielts 6.0"
                    labelPlacement="outside"
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                  />
                </div>
                {/* End course name */}

                {/* Start intended course participants */}
                <div className=" row-start-4 row-span-1 col-start-2 col-span-2 flex flex-col">
                  <Input
                    radius="sm"
                    label="Đối tượng học"
                    placeholder="Những người vượt qua bài kiểm tra 5.0 đầu vào"
                    labelPlacement="outside"
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                  />
                </div>
                {/* End intended course participants */}

                {/* Start course descriptions */}
                <div className=" row-start-5 row-span-1 col-start-2 col-span-2 flex flex-col">
                  <Input
                    radius="sm"
                    label="Mô tả khóa học"
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
                    label="Ca học"
                    placeholder="Lựa chọn khung giờ học"
                    labelPlacement="outside"
                    radius="sm"
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
                        {classTimetable.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End class timetable */}

                {/* Start class timetable */}
                <div className=" row-start-6 row-span-1 col-start-2 col-span-1 flex flex-col">
                  <Select
                    label="Ca học"
                    placeholder="Lựa chọn khung giờ học"
                    labelPlacement="outside"
                    radius="sm"
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
                        {classTimetable.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                {/* End class timetable */}

                {/* Start main classroom */}
                <div className=" row-start-6 row-span-1 col-start-3 col-span-1 flex flex-col">
                  <Select
                    label="Phòng học cố định"
                    placeholder="Lựa chọn phòng cố định"
                    labelPlacement="outside"
                    radius="sm"
                    className="w-full font-bold"
                    classNames={{
                      trigger: 'bg-old-lace',
                      value: 'font-normal text-black',
                    }}
                  >
                    {mainClassrooms.map((mainClassroom) => (
                      <SelectItem
                        key={mainClassroom.value}
                        value={mainClassroom.value}
                      >
                        {mainClassroom.label}
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
                    onClick={() => setCurrentTab('course_detail')}
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

<<<<<<< HEAD
                  <Button
                    color="primary"
                    variant="ghost"
                    className="w-[20%]"
                    onClick={() => setCurrentTab('finish')}
                  >
=======
                  <Button color="primary" variant="ghost" className="w-[20%]">
>>>>>>> 4fcfb7d (Init: admin add course page)
                    Lưu và tiếp tục
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
<<<<<<< HEAD

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
=======
>>>>>>> 4fcfb7d (Init: admin add course page)
      </Tabs>
    </div>
  );
}
