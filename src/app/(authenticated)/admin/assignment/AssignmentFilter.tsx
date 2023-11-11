import { Button, Select, SelectItem } from '@nextui-org/react';
import React, { useState } from 'react';

const AssignmentFilter = () => {
  const [module, setModule] = useState(new Set([]));
  const [skill, setSkill] = useState(new Set([]));
  const [band, setBand] = useState(new Set([]));

  const modules = [
    { id: 1, module: 'IELTS' },
    { id: 2, module: 'TOEFL' },
    { id: 3, module: 'TOEIC' },
  ];
  const skills = [
    { id: 1, skill: 'Reading' },
    { id: 2, skill: 'Listening' },
    { id: 3, skill: 'Writing' },
    { id: 4, skill: 'Speaking' },
  ];
  const bands = [
    { id: 1, moduleId: 1, band: '4.5 - 5.0' },
    { id: 2, moduleId: 1, band: '5.0 - 5.5' },
    { id: 3, moduleId: 1, band: '5.5 - 6.0' },
    { id: 4, moduleId: 1, band: '6.0 - 6.5' },
    { id: 5, moduleId: 2, band: '0-31' },
    { id: 6, moduleId: 2, band: '32-34' },
    { id: 7, moduleId: 2, band: '35-45' },
    { id: 8, moduleId: 2, band: '46-59' },
    { id: 9, moduleId: 3, band: '0-300' },
    { id: 10, moduleId: 3, band: '301-600' },
    { id: 11, moduleId: 3, band: '601-990' },
  ];

  console.log(Array.from(module)[0]);
  console.log(Array.from(skill)[0]);
  console.log(Array.from(band)[0]);

  return (
    <div className="w-full h-full flex flex-row gap-16 justify-center items-center">
      <div className="w-[15rem] h-fit flex flex-col gap-3">
        <div className="font-bold">Module</div>
        <Select
          key={'type'}
          radius={'md'}
          size="sm"
          value={modules[0].module}
          autoFocus={false}
          placeholder="Chọn module"
          selectedKeys={module}
          onSelectionChange={setModule}
          className="max-w-xs"
        >
          {modules?.map((c) => (
            <SelectItem key={c.id} value={c.module}>
              {c.module}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-[15rem] h-fit flex flex-col gap-3">
        <div className="font-bold">Kỹ năng</div>
        <Select
          size="sm"
          key={'type'}
          radius={'md'}
          value={skills[0].skill}
          autoFocus={false}
          placeholder="Chọn kỹ năng"
          selectedKeys={skill}
          onSelectionChange={setSkill}
          className="max-w-xs"
        >
          {skills?.map((c) => (
            <SelectItem key={c.id} value={c.skill}>
              {c.skill}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-[15rem] h-fit flex flex-col gap-3">
        <div className="font-bold">Trình độ</div>
        <Select
          size="sm"
          key={'type'}
          radius={'md'}
          value={bands[0].band}
          autoFocus={false}
          placeholder="Chọn trình độ"
          selectedKeys={band}
          onSelectionChange={setBand}
          className="max-w-xs"
        >
          {bands
            .filter((b) => b.moduleId === parseInt(Array.from(module)[0]))
            .map((filteredBand) => (
              <SelectItem key={filteredBand.id} value={filteredBand.id}>
                {filteredBand.band}
              </SelectItem>
            ))}
        </Select>
      </div>
      <Button className="w-[10rem] rounded-sm bg-orange text-white">
        Lọc dữ liệu
      </Button>
    </div>
  );
};

export default AssignmentFilter;
