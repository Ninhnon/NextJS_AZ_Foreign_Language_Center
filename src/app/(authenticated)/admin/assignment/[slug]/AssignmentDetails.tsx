import { Button, Select, SelectItem } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import {
  FaCircleQuestion,
  FaHouseChimney,
  FaPenToSquare,
} from 'react-icons/fa6';

const AssignmentDetails = ({ data, router }) => {
  console.log(
    '🚀 ~ file: AssignmentDetails.tsx:6 ~ AssignmentDetails ~ data:',
    data
  );
  const [module, setModule] = useState(new Set([]));
  const [skill, setSkill] = useState(new Set([]));
  const [band, setBand] = useState(new Set([]));
  const modules = [
    { id: 1, module: 'IELTS' },
    { id: 2, module: 'TOEIC' },
  ];
  const skills = [
    { id: 1, skill: 'Reading' },
    { id: 2, skill: 'Listening' },
    { id: 3, skill: 'Writing' },
    { id: 4, skill: 'Speaking' },
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

  useEffect(() => {
    const initialModule = modules.find((m) => m.id == data.module.id);
    const initialSkill = skills.find((s) => s.id == data.skill.id);
    const initialBand = bands.find(
      (b) => b.moduleId === initialModule.id && b.id == data.bandScore.id
    );

    setModule(new Set([initialModule.id]));
    setSkill(new Set([initialSkill.id]));
    setBand(new Set([initialBand.id]));
  }, []);

  console.log(Array.from(module)[0]);
  console.log(Array.from(skill)[0]);
  console.log(Array.from(band)[0]);

  return (
    <div className="w-full h-fit flex flex-col px-4 gap-4">
      <div className="w-fit h-fit flex flex-row items-center">
        <span className="font-bold">{data.name}</span>
        <Button className="ml-4" variant="light" radius="sm" isIconOnly>
          <FaPenToSquare />
        </Button>
      </div>
      <div className="iw-fit flex md:flex-row flex-col gap-8">
        <div className="w-[15rem] h-fit flex flex-row gap-3 items-center">
          <div className="w-fit min-w-[10ch] font-bold">Module</div>
          <Select
            style={{ height: '3rem' }}
            key={'type'}
            radius={'md'}
            size="sm"
            autoFocus={false}
            placeholder={modules.find((m) => m.id == data.module.id).module}
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
        <div className="w-[15rem] h-fit flex flex-row gap-3 items-center">
          <div className="w-fit min-w-[10ch]  font-bold">Kỹ năng</div>
          <Select
            style={{ height: '3rem' }}
            size="sm"
            key={'type'}
            radius={'md'}
            autoFocus={false}
            placeholder={skills.find((s) => s.id == data.skill.id).skill}
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
        <div className="w-[15rem] h-fit flex flex-row gap-3 items-center">
          <div className="w-fit min-w-[10ch]  font-bold">Trình độ</div>
          <Select
            style={{ height: '3rem' }}
            size="sm"
            key={'type'}
            radius={'md'}
            autoFocus={false}
            placeholder={bands.find((b) => b.id == data.bandScore.id).band}
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
      </div>
      <div className="w-fit h-fit flex flex-row font-bold">
        <span>Ngày khởi tạo: &nbsp; &nbsp;</span>
        <span>{new Date(data.startTime).toLocaleString()}</span>
      </div>
      <Button
        className="font-bold text-orange flex flex-row w-fit end-4"
        variant="light"
        radius="sm"
        startContent={<FaCircleQuestion />}
        onClick={() => {
          router.push(
            `/admin/assignment/${data.id}/multiple-choice-question?id=${data.id}`
          );
        }}
      >
        Câu hỏi trắc nghiệm
      </Button>
    </div>
  );
};

export default AssignmentDetails;
