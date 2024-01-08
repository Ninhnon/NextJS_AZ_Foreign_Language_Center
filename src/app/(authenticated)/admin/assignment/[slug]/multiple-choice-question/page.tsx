'use client';
import {
  Button,
  Input,
  Pagination,
  Spinner,
  Textarea,
} from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { FaCirclePlus, FaHouseChimney } from 'react-icons/fa6';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAssignment } from '@/hooks/useAssignment';
import { useQuery } from '@tanstack/react-query';

import DialogCustom from '@/components/ui/dialogCustom';
import { Label } from '@/components/ui/label';
import { Controller, useForm } from 'react-hook-form';

import { FileWithPath } from 'react-dropzone';
import { OurFileRouter } from '@/app/api/uploadthing/core';
import { generateReactHelpers } from '@uploadthing/react/hooks';

import { FileDialog } from '@/components/FileDialog';
import FileCard from '@/components/FileCard';
import toast from 'react-hot-toast';
import { FaExclamationTriangle } from 'react-icons/fa';
import AdminMultipleChoiceQuestionCard from '@/components/cards/AdminMultipleChoiceQuestionCard';

type FileWithPreview = FileWithPath & {
  preview: string;
};

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id') || '1');
  console.log('🚀 ~ file: page.tsx:13 ~ page ~ id:', id);

  //Get first n items of data
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(10);

  //Index the questions
  const [questionsMap, setQuestionsMap] = useState(new Map());
  console.log('🚀 ~ file: page.tsx:48 ~ page ~ questionsMap:', questionsMap);
  const { onGetMultipleChoiceQuestion, onPostMultipleChoiceQuestion } =
    useAssignment();
  //useForm
  const { handleSubmit, control, reset } = useForm();

  //dialog open state
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isShowAudioFileDialog, setIsShowFileDialog] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  //UploadThing
  const { startUpload } = useUploadThing('courseAttachment');

  //Audio file
  const [audioFile, setAudioFile] = useState<FileWithPreview[]>([]);

  // Define a query key and fetch function for fetching review rating data
  const fetchQuestionByIdKey = ['multipleQuestion' + page, currentPage];
  const fetchQuestionByIdData = async () => {
    const fetchedAssignmentByIdData = await onGetMultipleChoiceQuestion(
      id,
      currentPage,
      itemsPerPage
    );
    return fetchedAssignmentByIdData;
  };

  // Fetch review data
  const { data, isFetched, isFetching, refetch } = useQuery(
    fetchQuestionByIdKey,
    fetchQuestionByIdData,
    {
      staleTime: 1000 * 60 * 1,
      keepPreviousData: true,
    }
  );
  console.log('🚀 ~ file: page.tsx:35 ~ page ~ refetch:', refetch);
  console.log('🚀 ~ file: page.tsx:35 ~ page ~ isFetched:', isFetched);

  //Set total page when data is fetched
  useEffect(() => {
    if (data) {
      setTotalPage(data.totalPage);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const newQuestionsMap = new Map();
      data.data.forEach((question, index) => {
        // Calculate the overall index based on the current page and items per page
        const overallIndex = (currentPage - 1) * itemsPerPage + index + 1;
        newQuestionsMap.set(overallIndex, false);
      });
      setQuestionsMap(newQuestionsMap);
    }
  }, [data, currentPage, itemsPerPage]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const onSubmit = async (data) => {
    console.log('🚀 ~ file: page.tsx:97 ~ onSubmit ~ data:', data);
    await setIsInvalid(false);

    if (data.question === '') {
      setIsInvalid(true); // Set isInvalid to true if title is empty
      return;
    }
    if (data.option1 === '') {
      setIsInvalid(true); // Set isInvalid to true if content is empty
      return;
    }

    if (data.option2 === '') {
      setIsInvalid(true); // Set isInvalid to true if content is empty
      return;
    }

    if (data.option3 === '') {
      setIsInvalid(true); // Set isInvalid to true if content is empty
      return;
    }

    if (data.option4 === '') {
      setIsInvalid(true); // Set isInvalid to true if content is empty
      return;
    }

    if (data.answer !== '') {
      switch (data.answer) {
        case data.option1: {
          data.answer = 1;
          break;
        }
        case data.option2: {
          data.answer = 2;
          break;
        }
        case data.option3: {
          data.answer = 3;
          break;
        }
        case data.option4: {
          data.answer = 4;
          break;
        }
        default: {
          setIsInvalid(true);
          return;
        }
      }
    } else {
      setIsInvalid(true);
      return;
    }
    // //If all input is valid, then submit
    // // Set loading state to true when submitting for submiting dialog

    setIsLoading(true);

    const audio = await startUpload([...audioFile]).then((res) => {
      const ret = res?.map((file) => ({
        id: file.key,
        name: file.name,
        url: file.url,
      }));
      return ret ?? null;
    });

    // const [data] = useQuery('key', func(), {});
    const ret = await onPostMultipleChoiceQuestion(
      JSON.stringify({
        ...data,
        assignmentId: id,
        audio: JSON.stringify(audio),
      })
    );

    if (ret) {
      console.log(ret);
      toast.success('Thêm câu hỏi thành công!');
      await setIsLoading(false);
      await setIsShowDialog(false);
      reset();
      refetch();
    }

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

    // if (ret) {
    //   console.log(ret);
    //   // Set loading state to false and show success dialog
    //   setIsLoading(false);
    //   setShowSuccess(true);

    //   // Reset form and other state variables after submission after 2sec
    //   setTimeout(() => {
    //     reset();
    //     setFiles([]);
    //     setRating(0);
    //     setHover(0);
    //     setIsShowDialog(false);
    //     setIsLoading(false);
    //     setShowSuccess(false);
    //     setIsInvalid(false);
    //   }, 2000);
    //   reviewItemRefetch();
    //   reviewRatingRefetch();
    // }
  };

  console.log('🚀 ~ file: page.tsx:25 ~ page ~ data:', data);

  return (
    <>
      {isFetching ? (
        <Spinner
          className="w-full h-full flex justify-center items-center"
          label="Đang tải..."
          color="warning"
          labelColor="warning"
        />
      ) : (
        <div>
          {' '}
          {data ? (
            <div className="w-full h-full flex flex-col py-6 px-32 justify-center gap-8">
              <div className="w-fit h-fit flex flex-col">
                <Button
                  className="font-bold text-orange flex flex-row end-4"
                  variant="light"
                  radius="sm"
                  startContent={<FaHouseChimney />}
                  onClick={() => {
                    router.back();
                  }}
                >
                  Câu hỏi trắc nghiệm
                </Button>
              </div>

              <div className="w-fit h-fit flex flex-col ml-6">
                <Button
                  className="font-bold text-orange flex flex-row end-4"
                  variant="light"
                  radius="sm"
                  startContent={<FaCirclePlus />}
                  onClick={() => {
                    setIsShowDialog(true);
                  }}
                >
                  Thêm câu hỏi trắc nghiệm
                </Button>
              </div>

              {isShowDialog ? (
                <DialogCustom
                  warningOnClose={true}
                  className="flex justify-center items-center w-[90%] lg:w-[60%] h-[90%]"
                  isModalOpen={isShowDialog}
                  setIsModalOpen={setIsShowDialog}
                  callBack={() => {}}
                >
                  <div className="flex flex-col w-full h-auto pr-4 gap-6">
                    <div className="w-full h-fit flex flex-col pt-2 items-center gap-3">
                      <span className="text-[12px] sm:text-sm md:text-base font-semibold">
                        THÊM CÂU HỎI TRẮC NGHIỆM
                      </span>
                    </div>

                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        Câu hỏi
                      </Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="question"
                        render={({ field }) => {
                          return (
                            <Textarea
                              className="h-full"
                              minRows={20}
                              size="sm"
                              type="textarea"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          );
                        }}
                      />
                    </div>

                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        Đáp án A
                      </Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="option1"
                        render={({ field }) => {
                          return (
                            <Input
                              className="h-full"
                              size="sm"
                              type="input"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        Đáp án B
                      </Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="option2"
                        render={({ field }) => {
                          return (
                            <Input
                              className="h-full"
                              size="sm"
                              type="input"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        Đáp án C
                      </Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="option3"
                        render={({ field }) => {
                          return (
                            <Input
                              className="h-full"
                              size="sm"
                              type="input"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          );
                        }}
                      />
                    </div>
                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        Đáp án D
                      </Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="option4"
                        render={({ field }) => {
                          return (
                            <Input
                              className="h-full"
                              size="sm"
                              type="input"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          );
                        }}
                      />
                    </div>

                    <div className="flex w-full flex-col flex-wrap md:flex-nowrap gap-3">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        Đáp án đúng
                      </Label>
                      <Controller
                        control={control}
                        defaultValue={''}
                        name="answer"
                        render={({ field }) => {
                          return (
                            <Input
                              className="h-full"
                              size="sm"
                              type="input"
                              value={field.value}
                              onChange={field.onChange}
                            />
                          );
                        }}
                      />
                    </div>

                    <div className="flex flex-col">
                      <Label className="font-semibold text-[10px] sm:text-[14px]">
                        File âm thanh (nếu có)
                      </Label>
                      <Button onClick={() => setIsShowFileDialog(true)}>
                        Chọn file
                      </Button>
                      <div className="h-fit mt-3 flex flex-col lg:flex-row gap-5">
                        {audioFile?.length
                          ? audioFile?.map((file, i) => (
                              <FileCard
                                key={i}
                                i={i}
                                files={audioFile}
                                setFiles={setAudioFile as any}
                                file={file}
                              />
                            ))
                          : null}
                      </div>
                      <div className="invisible">
                        <FileDialog
                          name="images"
                          accept={{
                            'audio/mp3': ['.mp3'],
                          }}
                          setValue={() => {}}
                          maxFiles={1}
                          maxSize={1024 * 1024 * 4}
                          files={audioFile}
                          setFiles={setAudioFile as any}
                          disabled={false}
                          open={isShowAudioFileDialog}
                          onOpenChange={() => setIsShowFileDialog(false)}
                        />
                      </div>
                    </div>
                    <div className="flex w-full mt-5 justify-center items-center">
                      <Button
                        className="w-[50%] inset-0 border-transparent hover:scale-105 hover:transition text-[13px] sm:text-[16px] hover:duration-200 font-semibold bg-orange text-white rounded-md"
                        onClick={async () => {
                          try {
                            await handleSubmit(onSubmit)();
                          } catch (error) {
                            // Handle submission error if needed
                          }
                        }}
                      >
                        Xác nhận
                      </Button>
                    </div>

                    {isLoading && (
                      <DialogCustom
                        className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                        isModalOpen={isLoading}
                        notShowClose={true}
                      >
                        <div className="flex flex-col gap-3 items-center justify-center">
                          <Spinner size="lg" className="fill-orange" />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Đang lưu câu hỏi...
                          </div>
                        </div>
                      </DialogCustom>
                    )}
                    {isInvalid ? (
                      <DialogCustom
                        className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                        isModalOpen={isInvalid}
                      >
                        <div className="flex flex-col gap-3 items-center justify-center">
                          <FaExclamationTriangle
                            className="text-gray-700 fill-orange"
                            size={35}
                          />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Vui lòng nhập đầy đủ và chính xác thông tin câu hỏi!
                          </div>
                        </div>
                      </DialogCustom>
                    ) : null}
                  </div>
                </DialogCustom>
              ) : null}

              <div className="w-full h-fit flex flex-col items-center">
                {data ? (
                  <>
                    {' '}
                    {isFetching ? (
                      <Spinner
                        className=""
                        label="Đang tải..."
                        color="warning"
                        labelColor="warning"
                      />
                    ) : (
                      <div className="w-full h-fit flex flex-col items-center">
                        {data?.data.map((item, index) => {
                          // Calculate the overall index based on the current page and items per page
                          const overallIndex =
                            (currentPage - 1) * itemsPerPage + index + 1;
                          return (
                            <div
                              key={item.id}
                              className="w-full h-fit flex flex-row items-center justify-between px-16 my-2"
                            >
                              <AdminMultipleChoiceQuestionCard
                                data={item}
                                index={overallIndex}
                              />
                            </div>
                          );
                        })}
                        <Pagination
                          color="warning"
                          showControls
                          total={totalPage}
                          initialPage={1}
                          onChange={(page) => {
                            onPageChange(page);
                          }}
                          page={currentPage}
                        />
                      </div>
                    )}
                  </>
                ) : null}
              </div>
            </div>
          ) : (
            <Spinner
              className="w-full h-full flex justify-center items-center"
              label="Đang tải..."
              color="warning"
              labelColor="warning"
            />
          )}
        </div>
      )}
    </>
  );
}

export default page;
