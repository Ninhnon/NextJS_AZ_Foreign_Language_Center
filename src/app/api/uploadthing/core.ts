// import { getSession } from '@/lib/auth';
import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

const handleAuth = async () => {
  // const session = await getSession();
  // if (!session) throw new Error('Unauthorized');
  return { userId: 'admin' };
};

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB', maxFileCount: 8 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  courseAttachment: f({
    video: { maxFileSize: '16MB', maxFileCount: 2 },
    audio: { maxFileSize: '8MB', maxFileCount: 2 },
    image: { maxFileSize: '4MB', maxFileCount: 8 },
    pdf: { maxFileSize: '16MB', maxFileCount: 2 },
    text: { maxFileSize: '64KB', maxFileCount: 2 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: '64MB' } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
