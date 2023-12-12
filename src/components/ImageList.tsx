/** @format */

import { ImageCustom } from './ImageCustom';
import { ScrollArea } from './ui/scroll-area';
import { Zoom } from './ui/zoom-image';

export const ImageList = ({ files, width, height }) => {
  return (
    <ScrollArea className="h-fit">
      <div className="flex items-center gap-2 flex-wrap">
        {files && Array.isArray(files) && files.length > 0
          ? files.map((file, i) => {
              return (
                <Zoom key={i}>
                  <ImageCustom
                    src={file?.preview || file?.url}
                    alt={file?.name}
                    className={`h-${height} w-${width} shrink-0 rounded-md object-cover object-center`}
                  />
                </Zoom>
              );
            })
          : null}
      </div>
    </ScrollArea>
  );
};
