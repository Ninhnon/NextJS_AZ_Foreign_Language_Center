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
  Input,
} from '@nextui-org/react';
import React from 'react';
import { FaRegUser as UserIcon } from 'react-icons/fa';
import { IoIosMail as MailIcon } from 'react-icons/io';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { useTeacher } from '@/hooks/useTeacher';

//quan ly form: react-hook-form
const formSchema = z.object({
  comment: z.string().nonempty({ message: 'Đánh giá không được để trống' }),
  score: z
    .string()
    .transform((value) => (value === '' ? undefined : parseFloat(value)))
    .refine(
      (value) =>
        value === undefined || (!isNaN(value) && value >= 1 && value <= 9),
      {
        message: 'Điểm số phải là một số từ 1 đến 9 hoặc để trống',
      }
    ),
});

//validate form: zod
const EditCommentDialog = ({
  isOpen,
  onOpenChange,
  onClose,
  selectedAssignment,
}) => {
  /* Hooks */
  const queryClient = useQueryClient();
  const { onUpdateAssignmentGrading } = useTeacher();
  /* Start Form state */
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
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

  /* End Form state */

  React.useEffect(() => {
    const resetForm = async () => {
      if (isOpen && selectedAssignment) {
        await reset({
          comment: selectedAssignment?.comment || '',
          score: selectedAssignment?.score || '',
        });
      }
    };

    resetForm();
  }, [selectedAssignment, isOpen, reset]);

  const onSubmit = handleSubmit(async () => {
    try {
      handleClose();
      console.log('Thu ma no goi', selectedAssignment, values);
      await onUpdateAssignmentGrading(selectedAssignment?.id, values);

      reset();
      queryClient.invalidateQueries(['assignments']);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  });

  const values = getValues();

  React.useEffect(() => {
    console.log(
      '🚀 ~ file: EditUserDialog.tsx:47 ~ EditUserDialog ~ values:',
      values
    );
    console.log(values);
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
              <div className="mt-2">Đánh giá bài làm của học viên</div>
            </ModalHeader>
            <ModalBody>
              {/* Name */}
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    endContent={
                      <UserIcon className="text-2xl text-black font-semibold pointer-events-none flex-shrink-0" />
                    }
                    label={
                      <span className="text-base text-black font-semibold">
                        Đánh giá{' '}
                        <span className="text-red-500 font-semibold">(*)</span>
                      </span>
                    }
                    placeholder="Nhập đánh giá"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                    onChange={(e) => {
                      setValue('comment', e.target.value);
                      trigger('comment');
                    }}
                  />
                )}
              />
              {errors.comment && (
                <p className="text-red-500 text-sm italic ml-2">
                  {errors.comment.message}
                </p>
              )}

              {/* Điểm số */}
              <Controller
                name="score"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    endContent={
                      <MailIcon className="text-3xl text-black font-bold pointer-events-none flex-shrink-0" />
                    }
                    label={
                      <span className="text-base text-black font-semibold">
                        Điểm số{' '}
                        <span className="text-red-500 font-semibold">(*)</span>
                      </span>
                    }
                    placeholder="Nhập điểm của bài tập"
                    variant="bordered"
                    classNames={{
                      inputWrapper: 'bg-old-lace',
                    }}
                    onChange={(e) => {
                      // Chỉ cập nhật giá trị nếu nó là số hợp lệ hoặc chuỗi rỗng
                      const scoreValue = e.target.value;
                      if (scoreValue === '' || !isNaN(scoreValue)) {
                        setValue('score', scoreValue);
                        trigger('score');
                      }
                    }}
                  />
                )}
              />

              {errors.score && (
                <p className="text-red-500 text-sm italic ml-2">
                  {errors.score.message}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={async () => {
                  const result = await trigger();

                  if (result) {
                    toast.promise(
                      onSubmit(),
                      {
                        loading: 'Đang cập nhật đánh giá bài tập học viên ...',
                        success: 'Cập nhật người đánh giá thành công!',
                        error: (err) => `${err}`,
                      },
                      {
                        style: {
                          minWidth: '300px',
                          minHeight: '50px',
                          textAlign: 'left',
                        },
                        position: 'bottom-right',
                      }
                    );
                  } else if (Object.keys(errors).length > 0) {
                    Object.values(errors).forEach((error) => {
                      toast.error(error.message, {
                        style: {
                          minWidth: '300px',
                          minHeight: '50px',
                        },
                        position: 'bottom-right',
                      });
                    });
                  }
                }}
              >
                Chỉnh sửa
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

export default EditCommentDialog;
