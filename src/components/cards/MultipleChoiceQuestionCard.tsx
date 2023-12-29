import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { Button, Radio, RadioGroup } from '@nextui-org/react';
import { FaRegCircleCheck, FaVolumeHigh } from 'react-icons/fa6';
const MultipleChoiceQuestionCard = ({
  data,
  setScore,
  index,
  questionsMap,
  setQuestionsMap,
  isSuccess,
}) => {
  //Get the correct answer
  const correctAnswer = () => {
    switch (data.answer) {
      case 1:
        return data.option1;
      case 2:
        return data.option2;
      case 3:
        return data.option3;
      case 4:
        return data.option4;
    }
  };
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  console.log(
    '🚀 ~ file: MultipleChoiceQuestionCard.tsx:28 ~ selectedAnswer:',
    selectedAnswer
  );
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  //Handle change selected answer
  const onSelectedAnswerChange = (value) => {
    setSelectedAnswer(value);
    //Check if the answer is correct
    if (value === correctAnswer()) {
      setScore((score) => score + Math.round(100 / questionsMap.size) / 10);
      setIsCorrect(true);
    }
    //Check if the answer is incorrect
    //and the previous answer is correct
    else if (isCorrect) {
      setScore((score) => score - Math.round(100 / questionsMap.size) / 10);
      setIsCorrect(false);
    }
    //Check if the answer is incorrect
    //and the previous answer is incorrect or not answered
    else {
      setIsCorrect(false);
    }
    setQuestionsMap((prevQuestionsMap) => {
      const newQuestionsMap = new Map(prevQuestionsMap);
      newQuestionsMap.set(data.id, true);
      return newQuestionsMap;
    });
  };

  const [audio, setAudio] = useState(null);
  useEffect(() => {
    if (data.audio && JSON.parse(data.audio).length > 0) {
      setAudio(
        new Howl({
          src: [JSON.parse(data.audio)[0].url],
          html5: true,
          onend: () => {},
        })
      );
    }
  }, []);

  const playAudio = () => {
    audio.play();
  };
  return (
    <div className="w-full h-fit flex flex-col border-2 rounded-md p-2 gap-2">
      <span className="font-bold">Câu hỏi {index}</span>
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div>{data.question}</div>
        {data.audio && JSON.parse(data.audio).length > 0 ? (
          <Button
            className="bg-transparent fill-orange"
            size="lg"
            onClick={playAudio}
          >
            <FaVolumeHigh />
          </Button>
        ) : null}
      </div>
      <div className="w-full h-fit grid grid-cols-2 gap-2">
        <RadioGroup
          value={selectedAnswer}
          onValueChange={onSelectedAnswerChange}
        >
          <Radio value={data.option1} isDisabled={isSuccess}>
            <div className="flex flex-row gap-3 items-center">
              {' '}
              A. {data.option1}{' '}
              {isSuccess && data.option1 === correctAnswer() && (
                <FaRegCircleCheck className="text-green-600" />
              )}
            </div>
          </Radio>
          <Radio value={data.option2} isDisabled={isSuccess}>
            <div className="flex flex-row gap-3 items-center">
              {' '}
              B. {data.option2}{' '}
              {isSuccess && data.option2 === correctAnswer() && (
                <FaRegCircleCheck className="text-green-600" />
              )}
            </div>
          </Radio>
          <Radio value={data.option3} isDisabled={isSuccess}>
            <div className="flex flex-row gap-3 items-center">
              {' '}
              C. {data.option3}{' '}
              {isSuccess && data.option3 === correctAnswer() && (
                <FaRegCircleCheck className="text-green-600" />
              )}
            </div>
          </Radio>
          <Radio value={data.option4} isDisabled={isSuccess}>
            <div className="flex flex-row gap-3 items-center">
              {' '}
              D. {data.option4}{' '}
              {isSuccess && data.option4 === correctAnswer() && (
                <FaRegCircleCheck className="text-green-600" />
              )}
            </div>
          </Radio>
        </RadioGroup>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionCard;
