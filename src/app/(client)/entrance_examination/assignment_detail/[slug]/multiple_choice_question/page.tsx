'use client';
import MultipleChoiceQuestionCard from '@/components/cards/MultipleChoiceQuestionCard';
import DialogCustom from '@/components/ui/dialogCustom';
import { useAssignment } from '@/hooks/useAssignment';
import { Button, Pagination, Spinner } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { FaHouseChimney } from 'react-icons/fa6';

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = parseInt(searchParams.get('id') || '1');

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [totalPage, setTotalPage] = useState(10);
  const { onGetMultipleChoiceQuestion, onPostMultipleChoiceQuestionResult } =
    useAssignment();

  // Questions Map
  const [questionsMap, setQuestionsMap] = useState(new Map());
  const [isInit, setIsInit] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  //Set selected answers
  const [selectedAnswers, setSelectedAnswers] = useState(new Map());

  //Score
  const [score, setScore] = useState(0.0);
  console.log('🚀 ~ file: page.tsx:25 ~ page ~ score:', score);

  const questionRefs = useRef([]);

  // Scroll to question when click on question number
  const scrollToQuestion = (index) => {
    const pageNumber = Math.ceil(index / itemsPerPage);
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    } else {
      questionRefs.current[index].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

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
  const { data: multipleChoiceQuestionData, isFetching } = useQuery(
    fetchQuestionByIdKey,
    fetchQuestionByIdData,
    {
      staleTime: Infinity,
      keepPreviousData: true,
    }
  );
  console.log(
    '🚀 ~ file: page.tsx:57 ~ page ~ multipleChoiceQuestionData:',
    multipleChoiceQuestionData
  );

  const onGetUserSession = async () => {
    const session = await getSession();
    console.log(
      '🚀 ~ file: page.tsx:80 ~ onGetUserSession ~ session:',
      session?.user.id
    );
    return session;
  };

  const onSubmit = async () => {
    await setIsSubmitting(true);

    //Check if all questions are answered
    for (const [key, value] of Array.from(questionsMap)) {
      console.log('🚀 ~ file: page.tsx:91 ~ onSubmit ~ key:', key);
      if (!value) {
        setIsSubmitting(false);
        toast.error('Bạn chưa trả lời hết các câu hỏi!');
        return;
      }
    }

    let clampedScore = score;

    //Check if score is valid
    if (score > 10) {
      clampedScore = 10;
      await setScore(10);
    } else if (score < 0) {
      clampedScore = 0;
      await setScore(0);
    }

    const userSession = await onGetUserSession();

    // const [data] = useQuery('key', func(), {});
    const ret = await onPostMultipleChoiceQuestionResult(
      JSON.stringify({
        assignmentId: id,
        userId: userSession.user.id,
        score: clampedScore,
      })
    );

    if (ret) {
      console.log(ret);

      await setIsSubmitting(false);
      await setIsSuccess(true);
    }
  };

  console.log('isSuccess', isSuccess);
  //Index question

  useEffect(() => {
    //Avoid setting question map when fetching data
    if (multipleChoiceQuestionData && !isInit) {
      setTotalPage(multipleChoiceQuestionData.totalPage);
      const newQuestionsMap = new Map();
      if (multipleChoiceQuestionData) {
        for (let i = 1; i <= multipleChoiceQuestionData.totalItems; i++) {
          newQuestionsMap.set(i, false);
        }
        setQuestionsMap(newQuestionsMap);
      }
      setIsInit(true);
    }
  }, [multipleChoiceQuestionData]);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full h-full flex justify-center py-8 px-16">
      {isFetching ? (
        <Spinner
          className="w-full h-full flex justify-center items-center"
          label="Đang tải..."
          color="warning"
          labelColor="warning"
        />
      ) : (
        <div className="w-full flex flex-col items-center">
          {' '}
          <div className="w-full flex flex-row justify-start items-start">
            <Button
              className="font-bold text-orange flex flex-row"
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
          <div className="w-full h-fit flex flex-row">
            <div className="w-[30%] h-fit flex flex-col items-center gap-6">
              <div className="w-fit h-fit grid grid-cols-4 gap-5 mt-2">
                {[...questionsMap.keys()].map((questionIndex) => (
                  <Button
                    className={`${
                      questionsMap.get(questionIndex)
                        ? 'bg-white border-orange text-orange'
                        : 'bg-orange text-white'
                    } border-2 font-bold flex-shrink-0`}
                    key={questionIndex}
                    size="sm"
                    onClick={() => scrollToQuestion(questionIndex)}
                  >
                    {questionIndex}
                  </Button>
                ))}
              </div>

              {!isSubmitting && !isSuccess && (
                <Button
                  className="w-fit p-2 fill-green border-2 text-white font-bold"
                  color="success"
                  onClick={onSubmit}
                >
                  Nộp bài
                </Button>
              )}

              {isSuccess && (
                <div className="w-full text-center font-bold text-xl">
                  Điểm số của bạn: {score}
                </div>
              )}
            </div>

            <div className="w-[70%] h-full flex flex-col justify-center">
              {multipleChoiceQuestionData ? (
                <div className="w-full h-fit flex flex-col justify-center items-center gap-6">
                  {multipleChoiceQuestionData?.data.map((question, index) => {
                    // Calculate the overall index based on the current page and items per page
                    const overallIndex =
                      (currentPage - 1) * itemsPerPage + index + 1;
                    return (
                      <div
                        key={overallIndex}
                        ref={(el) => (questionRefs.current[overallIndex] = el)}
                        className="w-full h-fit flex flex-row items-center justify-between px-16 my-2"
                      >
                        <MultipleChoiceQuestionCard
                          selectedAnswer={selectedAnswers.get(overallIndex)}
                          setSelectedAnswer={(value) =>
                            setSelectedAnswers(
                              (prev) => new Map(prev.set(overallIndex, value))
                            )
                          }
                          data={question}
                          setScore={setScore}
                          index={overallIndex}
                          questionsMap={questionsMap}
                          setQuestionsMap={setQuestionsMap}
                          isSuccess={isSuccess}
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
                  <div className="flex flex-col gap-3 items-center justify-center">
                    {/* Loading Dialog */}
                    {isSubmitting && !isSuccess && (
                      <DialogCustom
                        className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                        isModalOpen={isSubmitting}
                        notShowClose={true}
                      >
                        <div className="flex flex-col gap-3 items-center justify-center">
                          <Spinner size="lg" />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Đang lưu lại kết quả...
                          </div>
                        </div>
                      </DialogCustom>
                    )}

                    {/* Success Dialog */}
                    {isSuccess && (
                      <DialogCustom
                        className="w-[90%] lg:w-[50%] h-fit items-center justify-center"
                        isModalOpen={isSuccess}
                        notShowClose={false}
                      >
                        <div className="flex flex-col gap-3 items-center justify-center">
                          <FaCheckCircle className="text-gray-700" size={35} />
                          <div className="text-center font-semibold text-xs sm:text-sm">
                            Nộp bài thành công!
                          </div>
                          <div className="w-fit h-fit flex flex-row">
                            <div className="text-center font-semibold text-xs sm:text-sm">
                              Điểm số của bạn: &nbsp;
                            </div>
                            <div className="text-center font-semibold text-xs sm:text-sm">
                              {score}
                            </div>
                          </div>
                        </div>
                      </DialogCustom>
                    )}
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
          </div>
        </div>
      )}
    </div>
  );
}
