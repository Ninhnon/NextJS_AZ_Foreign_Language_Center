import CourseList from './CourseList';

export default function page() {
  const courses = [
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_1.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_2.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_3.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_4.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_1.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_2.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_3.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_4.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_1.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_2.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_3.png',
      band: '4.5 - 5.0',
    },
    {
      id: 'KH123',
      title: 'Luyện thi IELTS 4.5',
      thumbnail: '/course_4.png',
      band: '4.5 - 5.0',
    },
  ];
  return (
    <div className="w-full h-full">
      <CourseList data={courses} />
    </div>
  );
}
