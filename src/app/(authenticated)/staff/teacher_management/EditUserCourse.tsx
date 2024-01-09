'use client';
import { Controller, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  Spinner,
} from '@nextui-org/react';
import React from 'react';
import { FaChalkboardTeacher as RoleIcon } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useCourse } from '@/hooks/useCourse';

//quan ly form: react-hook-form
const formSchema = z.object({
  course: z.string().nonempty('Vui lòng chọn khóa học.'),
});

//validate form: zod
const EditUserCourse = ({ isOpen, onOpenChange, onClose, selectedUser }) => {
  /* Hooks */
  const { courses, isCoursesLoading, isCoursesFetching, onCheckOrder } =
    useCourse();

  /* Start Form state */
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
    control,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async () => {
    try {
      handleClose();
      toast.loading('Đang thêm người dùng vào khóa học ...', {
        style: {
          minWidth: '300px',
          minHeight: '50px',
          textAlign: 'left',
        },
        duration: 2000,
        position: 'bottom-right',
      });
      const response = await onCheckOrder(values.course, selectedUser.id);
      reset();

      if (response.status === 200) {
        toast.success('Thêm người dùng vào khóa học thành công', {
          style: {
            minWidth: '300px',
            minHeight: '50px',
            textAlign: 'left',
          },
          duration: 2000,
          position: 'bottom-right',
        });
      } else if (response.status === 201) {
        toast.success('Người dùng đã tồn tại trong khóa học', {
          style: {
            minWidth: '300px',
            minHeight: '50px',
            textAlign: 'left',
          },
          duration: 2000,
          position: 'bottom-right',
        });
      } else {
        toast.error('Đã có lỗi xảy ra', {
          style: {
            minWidth: '300px',
            minHeight: '50px',
            textAlign: 'left',
          },
          duration: 2000,
          position: 'bottom-right',
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  /* End Form state */
  const values = getValues();

  React.useEffect(() => {
    console.log(
      '🚀 ~ file: AddUserDialog.tsx:47 ~ AddUserDialog ~ values:',
      values
    );
    console.log(values, 'values', selectedUser, 'user');
  }, [values]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="top-center"
      scrollBehavior="outside"
      size="2xl"
      backdrop="blur"
      isDismissable={false}
      hideCloseButton={true}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Thêm người dùng vào khóa học
            </ModalHeader>
            <ModalBody>
              <div className="w-full">
                {/* Role */}
                {isCoursesLoading || isCoursesFetching ? (
                  <div className="flex flex-col items-center justify-center">
                    <Spinner />
                    <p className="text-lg">
                      Dữ liệu đang được tải lên, vui lòng chờ trong giây lát
                    </p>
                  </div>
                ) : (
                  <div>
                    <Controller
                      name="course"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select
                          label={
                            <span className="text-base text-black font-semibold">
                              Các khóa học{' '}
                              <span className="text-red-500 font-semibold">
                                (*)
                              </span>
                            </span>
                          }
                          placeholder="Lựa chọn khóa học"
                          labelPlacement="inside"
                          radius="sm"
                          className="w-full font-bold"
                          classNames={{
                            trigger: 'bg-old-lace',
                            value: 'font-normal text-slate-500',
                            label: 'text-slate-500 font-normal',
                          }}
                          startContent={
                            <RoleIcon className="text-xl text-black pointer-events-none flex-shrink-0" />
                          }
                          {...field}
                          onChange={(value) => {
                            field.onChange(value);
                            trigger('course');
                          }}
                        >
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Error message */}
              <div className="flex flex-row justify-between">
                <div className="w-full">
                  {errors.course && (
                    <p className="text-red-500 text-sm italic mt-2 mr-50">
                      {errors.course.message}
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={onSubmit}>
                Thêm
              </Button>

              <Button color="danger" variant="flat" onPress={handleClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditUserCourse;
