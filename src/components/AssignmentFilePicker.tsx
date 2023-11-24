import React, { useEffect } from 'react';
import { FileDialog } from './FileDialog/FileDialog';
import FileCard from './FileCard';
import { Button } from '@nextui-org/react';

import { FaFileCirclePlus } from 'react-icons/fa6';

const AssignmentFilePicker = ({ data }) => {
  console.log(
    '🚀 ~ file: AssignmentFilePicker.tsx:9 ~ AssignmentFilePicker ~ data:',
    data
  );
  //Data state
  const [files, setFiles] = React.useState([]);
  const [lastModifiedAt, setLastModifiedAt] = React.useState<Date>();

  //Dialog state
  const [open, setOpen] = React.useState(false);

  //Set mode to edit
  //When files change for the first time
  useEffect(() => {
    setLastModifiedAt(new Date());
  }, [files]);

  console.log(
    '🚀 ~ file: AssignmentFilePicker.tsx:13 ~ AssignmentFilePicker ~ files:',
    files.length
  );

  const handleFileChange = (files) => {
    console.log(
      '🚀 ~ file: AssignmentFilePicker.tsx:32 ~ AssignmentFilePicker ~ files:',
      files
    );
  };

  return (
    <div className="w-full h-fit flex flex-row items-center border-2 border-orange rounded-md py-4 px-8 mx-3">
      <div className="w-full h-fit flex flex-col gap-4">
        {files?.length ? (
          <div className="flex flex-col gap-5">
            <div className="w-full h-fit flex flex-row  items-center gap-8 font-bold">
              <span>Bài tập</span>
              <div className="h-fit mt-3 flex flex-col lg:flex-row gap-5">
                {files?.length
                  ? files?.map((file, i) => (
                      <FileCard
                        key={i}
                        i={i}
                        files={files}
                        setFiles={setFiles}
                        file={file}
                      />
                    ))
                  : null}
              </div>
            </div>
            <div className="w-full h-fit flex flex-row mt-3  items-center gap-8 font-bold">
              <span>Chỉnh sửa lần cuối</span>
              <span>{lastModifiedAt.toLocaleDateString()}</span>
            </div>
            <div className="w-full h-fit flex flex-row justify-center items-center gap-4">
              <Button
                className={`
                  bg-white text-orange
             border-orange w-32 m-4`}
                variant="bordered"
                radius="sm"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Chỉnh sửa
              </Button>
              <Button
                className={`
                  bg-orange text-white
             border-orange w-32 m-4`}
                variant="bordered"
                radius="sm"
              >
                Lưu
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Button
              className="text-orange w-32 h-32 flex flex-col bg-transparent"
              onClick={() => {
                setOpen(true);
              }}
            >
              <FaFileCirclePlus size={80} />
              <span className="font-bold">Thêm bài tập</span>
            </Button>
          </div>
        )}

        <div className="flex h-0 flex-col gap-y-4 justify-center invisible">
          <div className="flex flex-row gap-x-4 items-center font-bold invisible">
            <span className="font-bold">Files</span>
            <FileDialog
              name="Images"
              setValue={handleFileChange}
              maxFiles={4}
              maxSize={1024 * 1024 * 4}
              files={files}
              setFiles={setFiles as any}
              disabled={false}
              open={open}
              onOpenChange={() => setOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
console.log(
  '🚀 ~ file: AssignmentFilePicker.tsx:112 ~ AssignmentFilePicker ~ t:',
  t
);
console.log(
  '🚀 ~ file: AssignmentFilePicker.tsx:112 ~ AssignmentFilePicker ~ t:',
  t
);

export default AssignmentFilePicker;
