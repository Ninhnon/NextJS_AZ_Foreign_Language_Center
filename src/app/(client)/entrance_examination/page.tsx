import React from 'react';
import EntranceExaminationCard from '@/components/EntranceExaminationCard';

const page = () => {
  return (
    <div className="grid grid-cols-3 gap-4 w-full h-full bg-slate-50">
      <EntranceExaminationCard
        text="Luyện thi Ielts"
        src={`/writing.png`}
        backgroundColor="#FFAE42"
      />
      <EntranceExaminationCard
        text="Chương trình Ielts Junior"
        src={`/writing.png`}
        backgroundColor="#FF7426"
      />
      <EntranceExaminationCard
        text="Tiếng anh giao tiếp"
        src={`/writing.png`}
        backgroundColor="#4D2C5E"
      />
    </div>
  );
};

export default page;
