import { Button } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { Howl } from 'howler';
import { FaVolumeHigh } from 'react-icons/fa6';

const MultipleChoiceQuestionCard = ({ data }) => {
  const [audio, setAudio] = useState(null);
  useEffect(() => {
    if (data.audio) {
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
      <div className="w-full h-fit flex flex-row justify-between items-center">
        <div>{data.question}</div>
        {data.audio ? (
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
        <div className="w-full h-fit flex flex-col gap-3">
          <div>A. {data.option1}</div>
          <div>C. {data.option3}</div>
        </div>
        <div className="w-full h-fit flex flex-col gap-3">
          <div>B. {data.option2}</div>
          <div>D. {data.option4}</div>
        </div>
      </div>
      <span className="font-bold">
        Đáp án:{' '}
        {data.answer == 1
          ? data.option1
          : data.answer == 2
          ? data.option2
          : data.answer == 3
          ? data.option3
          : data.option4}
      </span>
    </div>
  );
};

export default MultipleChoiceQuestionCard;
