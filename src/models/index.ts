export interface Assignment {
  id: number;
  name: string;
  moduleId: number;
  skillId: number;
  bandScoreId: number;
  startTime: Date;
  files: string[];
  lastModifiedTime: Date;
}

export interface Assignment_ClassSession {
  id: number;
  classSessionId: number;
  assignmentId: number;
}

export interface Assignment_User {
  id: number;
  userId: number;
  assignmentId: number;
}

export interface BandScore {
  id: number;
  moduleId: number;
  name: string;
}

export interface ClassSession {
  id: number;
  courseId: number;
  teacherId: number;
  roomId: number;
  StartTime: Date;
  timeId: number;
  classShiftId: number;
  CategoryColor: string;
}

export interface ClassShift {
  id: number;
  roomId: number;
  timeId: number;
}

export interface Course {
  id: number;
  moduleId: number;
  BandScoreId: number;
  name: string;
  totalSession: number;
  startTime: Date;
  endTime: Date;
  totalAttendance: number;
  tuitionFee: number;
  totalCost: number;
  recommendCourseId: number;
  thumbnail: string;
  courseDetails: CourseDetails[];
}

export interface CourseDetails {
  id: number;
  courseId: number;
  subtitle: string;
  description: string;
}

export interface Facility {
  id: number;
  name: string;
  roomId: number;
  broom: number;
  ceilingFan: number;
  chair: number;
  table: number;
  waterPurifier: number;
}

export interface IndexSalary {
  id: number;
  value: number;
}

export interface Module {
  id: number;
  name: string;
}

export interface Room {
  id: number;
  name: string;
  status: string;
  typeId: number;
  note: string;
  attendance: number;
  capacity: number;
  floor: number;
  toilet: number;
}

export interface RoomType {
  id: number;
  name: string;
}

export interface Skill {
  id: number;
  name: string;
}

export interface TimeShift {
  id: number;
  time: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
  address: string;
  birthDay: Date;
  indexSalary: number;
  level: number;
}

export interface MultipleChoiceQuestion {
  id: number;
  assignmentId: number;
  question: string;
  answer: number;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  audio: string;
  name: string;
}
