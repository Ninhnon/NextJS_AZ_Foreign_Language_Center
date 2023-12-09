import { Button, Select, SelectItem } from '@nextui-org/react';

const AssignmentFilter = ({
  module,
  setModule,
  skill,
  setSkill,
  band,
  setBand,
  onSubmit,
  setCurrentPage,
}) => {
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

  return (
    <div className="w-full h-full flex md:flex-row flex-col gap-16 justify-center md:justify-between items-center md:items-end">
      <div className="w-fit flex md:flex-row flex-col gap-8">
        <div className="w-[15rem] h-fit flex flex-col gap-3">
          <div className="font-bold">Module</div>
          <Select
            style={{ height: '3rem' }}
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
            style={{ height: '3rem' }}
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
            style={{ height: '3rem' }}
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
      </div>

      <Button
        className="w-fit h-[3rem] rounded-sm bg-orange text-white"
        onClick={() => {
          setCurrentPage(1);
          onSubmit(1);
        }}
      >
        Lọc dữ liệu
      </Button>
    </div>
  );
};

export default AssignmentFilter;
