import React, { useEffect, useLayoutEffect } from 'react';
import { FileDialog } from './FileDialog/FileDialog';
import FileCard from './FileCard';
import { Button, Spinner } from '@nextui-org/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { useAssignment } from '@/hooks/useAssignment';
import { FaCheckCircle } from 'react-icons/fa';
import DialogCustom from './ui/dialogCustom';

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const AssignmentFilePicker = ({ data }) => {
  //Data state
  const [files, setFiles] = React.useState([]);
  const [lastModifiedTime, setLastModifiedTime] = React.useState<Date>();

  //Dialog state
  const [open, setOpen] = React.useState(false);
  //Set loading state
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  //uploadthing
  const { startUpload } = useUploadThing('courseAttachment');
  //Update to db
  const { onUpdateAssignment } = useAssignment();

  useLayoutEffect(() => {
    const initData = async () => {
      if (data?.files?.length) {
        await setFiles(JSON.parse(data?.files));
      }
      await setLastModifiedTime(new Date(data?.lastModifiedTime));
    };
    initData();
  }, []);
  //Set mode to edit
  //When files change for the first time
  useEffect(() => {
    setLastModifiedTime(new Date());
  }, [files]);

  const handleFileChange = (files) => {
    console.log(
      '🚀 ~ file: AssignmentFilePicker.tsx:46 ~ AssignmentFilePicker ~ files:',
      files
    );
  };

  const onSubmit = async () => {
    //Set loading state
    await setLoading(true);
    await setSuccess(false);

    //Seperate between already uploaded files and new files
    const newFiles = files.filter((file) => file instanceof File);
    const oldFiles = files.filter(
      (file) => typeof file === 'object' && !(file instanceof File)
    );

    const jsonFiles = await startUpload([...newFiles]).then((res) => {
      const ret = res?.map((file) => ({
        id: file.key,
        name: file.name,
        url: file.url,
      }));

      return ret ?? [];
    });

    //Set new value for data
    //Files with url, name, id
    data.files = JSON.stringify([...oldFiles, ...jsonFiles]);
    //Last modified time
    data.lastModifiedTime = lastModifiedTime;

    //Update to db
    const res = await onUpdateAssignment(data);
    console.log('🚀 ~ file: AssignmentFilePicker.tsx:79 ~ onSubmit ~ res', res);

    if (res) {
      //Set loading state
      await setLoading(false);
      if (res.status === 200) {
        //Set success state
        await setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          window.location.reload();
        }, 2000);
      }
    }

    // useEffect(() => {

    //   if (!loading) {
    //     setTimeout(() => {
    //       setSuccess(false);
    //     }, 2000);
    //   }
    // }, [success, loading]);

    // // const [data] = useQuery('key', func(), {});
    // const ret = await onPostProductReview(
    //   JSON.stringify({
    //     ...data,
    //     rating: parseInt(data.rating),
    //     image: [...images],
    //     userId: userId,
    //     productId: product.id,
    //     reviewDate: new Date(),
    //   })
    // );
  };

  return (
    <div className="w-full h-fit flex flex-row items-center border-2 border-orange rounded-md py-4 px-8 mx-3">
      {!loading && (
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
                <span>{lastModifiedTime?.toLocaleString()}</span>
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
                  onClick={onSubmit}
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
      )}

      {loading && (
        <DialogCustom
          className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={loading}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <Spinner
              className="w-full h-full flex justify-center items-center"
              color="warning"
              labelColor="warning"
            />
            <div className="text-center font-semibold text-xs sm:text-sm text-orange">
              Đang lưu lại bài tập...
            </div>
          </div>
        </DialogCustom>
      )}

      {!loading && success && (
        <DialogCustom
          className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
          isModalOpen={success}
          notShowClose={true}
        >
          <div className="flex flex-col gap-3 items-center justify-center">
            <FaCheckCircle size={30} className="text-green-600" />
            <div className="text-center font-semibold text-xs sm:text-sm text-green-600 ">
              Lưu thành công!
            </div>
          </div>
        </DialogCustom>
      )}
    </div>
  );
};
export default AssignmentFilePicker;
