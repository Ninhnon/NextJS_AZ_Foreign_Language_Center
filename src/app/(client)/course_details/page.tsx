'use client';
import ProvideExplainationCard from '@/components/ProvideExplainationCard';
import RegisterForm from '@/components/RegisterForm';
import ReviewSwiper from '@/components/swipers/ReviewSwiper';
import Image from 'next/image';

const page = () => {
  const userData = [
    {
      id: 1,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 2,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 3,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 4,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
    {
      id: 5,
      user: {
        id: 1,
        name: 'Clara R.Altman',
        skill: 'Intermediate',
        avatar: '/user_1.png',
      },
      content:
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour',
    },
  ];
  return (
    <div className="h-full w-full">
      <div>
        <div className="md:block hidden sticky top-10 translate-y-20">
          <div className="w-2/5 ml-auto mr-2 max-h-0">
            <RegisterForm />
          </div>
        </div>
        {/* Start top page */}
        <div
          className="flex bg-[url('/background_course_details.png')] 
      bg-cover bg-no-repeat min-h-full overflow-hidden p-4 space-x-4"
        >
          {/* Start Text */}
          <div
            className="flex flex-col flex-initial p-4 space-y-10
        md:w-3/5"
          >
            <span className="text-5xl font-bold ml-20 mt-20">
              Ielts Junior English Foundation
            </span>

            <span className="text-base font-normal ml-20">
              Khóa học IELTS Junior English Foundation dành cho học sinh đang
              theo học cấp Trung học cơ sở có mong muốn chinh phục bài thi
              IELTS, phát triển kiến thức xã hội và tự tin sử dụng tiếng Anh.
              Chương trình được xây dựng dựa trên sự phối hợp của 4 khía cạnh:
              Ngôn ngữ - Tư duy - Kiến thức - Chiến lược.
            </span>
          </div>
          {/* End Text */}
          {/* <div className="flex flex-1 md:block hidden">
            <RegisterForm />
          </div> */}
        </div>
        {/* End top page*/}
      </div>

      {/* Start course info */}
      <div className="min-h-full bg-white grid-rows-6 p-4 ml-20 lg:w-1/2">
        <div className="flex flex-row items-center space-x-10">
          <span className="text-xl font-medium">Thông tin khóa học</span>
          <Image
            className="object-cover"
            src={`/light.png`}
            alt="light"
            width={80}
            height={80}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col mt-4">
          <span className="text-xl font-bold">Đối tượng:</span>
          <span className="text-lg font-normal">
            Người học hoàn toàn chưa có nền tảng tiếng anh.
          </span>
        </div>

        <div className="flex flex-col mt-2">
          <span className="text-xl font-bold">Đầu ra:</span>
          <span className="text-lg font-normal">
            Học viên có nền tảng từ vựng – ngữ pháp – phát âm để diễn tả cơ bản
            các ý tưởng của mình và đọc/nghe hiểu được ý chính.
          </span>
        </div>

        <div className="flex flex-col mt-2">
          <span className="text-xl font-bold">Cấu trúc khóa học:</span>
          <span className="text-lg font-normal">
            32 buổi phát âm và từ vựng cơ bản.
          </span>
        </div>

        <div className="flex flex-col mt-2">
          <span className="text-xl font-bold">Cam kết chất lượng:</span>
          <span className="text-lg font-normal">
            1. Kiểm tra trình độ đầu vào chính xác và miễn phí: A&Z đánh giá
            chính xác trình độ của học viên trước khi xếp lớp. <br />
            2. Học thử trải nghiệm khách quan trước khi đăng ký: Học viên an tâm
            thử nghiệm trước khi quyết định đăng ký học. <br />
            3. Cam kết đảm bảo đầu ra Zero-risk uy tín: Học viên được đào tạo
            lại miễn phí nếu không đạt chuẩn đầu ra. <br />
            4. Hệ thống học liệu hoàn thiện và phương pháp giảng dạy cá nhân
            hoá: đảm bảo học viên được trải nghiệm chất lượng chuyên môn tốt
            nhất. <br />
            5. Giảng viên trình độ tối thiểu 950 TOEIC. Giảng viên tại A&Z có
            trình độ chuyên môn ưu tú và đã tham gia các dự án phát triển nguồn
            học liệu và phương pháp sư phạm tại A&Z.
          </span>
        </div>
      </div>
      {/* End course info */}

      {/* Start teacher info */}

      {/* End teacher info */}

      {/* Start review info & explaination*/}
      <div
        className="w-full min-h-0 bg-[url(/bg-ellipse-left.png),_url(/bg-ellipse-right.png)] 
        bg-[length:20rem,_20rem] bg-[repeat:no-repeat,_no-repeat] 
      bg-[position:left__top_,_right_bottom]  bg-no-repeat px-4"
      >
        {/* Start review */}
        <div className="flex flex-row my-10 items-center justify-center font-semibold text-2xl">
          <span>Những câu chuyện thành công cùng &nbsp;</span>
          <span className="text-[#FF7426]"> IELTS Tại A&Z</span>
        </div>

        <div className="h-fit w-full flex items-center">
          <ReviewSwiper data={userData} />
        </div>
        {/* End review */}

        {/* Start explaination Card */}
        <div className="flex justify-center items-center lg:h-[12rem] my-4">
          <div className="w-3/4 h-full">
            <ProvideExplainationCard />
          </div>
        </div>
        {/* End explaination Card */}
      </div>
      {/* End review info */}
    </div>
  );
};

export default page;
