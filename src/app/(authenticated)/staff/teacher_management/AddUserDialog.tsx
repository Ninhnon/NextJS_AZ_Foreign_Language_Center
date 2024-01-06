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
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Calendar } from '@/components/ui/calendar';
import { CiMail as MailIcon } from 'react-icons/ci';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import React from 'react';
import { FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import { FaRegUser as UserIcon } from 'react-icons/fa';
import { FaChalkboardTeacher as RoleIcon } from 'react-icons/fa';
import { format } from 'date-fns';
import { useEmail } from '@/hooks/useEmail';

const roles = [
  { label: 'Giáo viên', value: 'teacher' },
  { label: 'Học viên', value: 'user' },
];

//quan ly form: react-hook-form
const formSchema = z.object({
  fullName: z
    .string()
    .nonempty({ message: 'Họ tên không được để trống' })
    .refine((value) => !/\d/.test(value), 'Họ tên không được chứa số')
    .refine(
      (value) =>
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/i.test(
          value
        ),
      'Họ tên không được chứa kí tự đặc biệt'
    ),
  birthday: z
    .date()
    .optional()
    .refine(
      (value) => !value || value <= new Date(),
      'Ngày sinh không thể là tương lai'
    ),
  role: z.string().nonempty({ message: 'Vai trò không được để trống' }),
  email: z
    .string()
    .nonempty({ message: 'Email không được để trống' })
    .email({ message: 'Email không hợp lệ' }),
});

//validate form: zod
const AddUserDialog = ({ isOpen, onOpenChange }) => {
  /* Registration email */
  const { onConfirmationEmail } = useEmail();
  /* Start Form state */

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    trigger,
    control,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async () => {
    await onConfirmationEmail();
  });

  /* End Form state */
  const birthday = watch('birthday');
  const values = getValues();

  React.useEffect(() => {
    console.log(
      '🚀 ~ file: AddUserDialog.tsx:47 ~ AddUserDialog ~ values:',
      values
    );
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
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 items-center">
              Thêm người dùng
            </ModalHeader>
            <ModalBody>
              {/* Name */}
              <Input
                autoFocus
                endContent={
                  <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Họ và tên (*)"
                placeholder="Nhập họ tên người dùng"
                variant="bordered"
                classNames={{
                  inputWrapper: 'bg-old-lace',
                }}
                {...register('fullName')}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm italic ml-2">
                  {errors.fullName.message}
                </p>
              )}

              {/* Birthday & Role*/}
              <div className="flex flex-row items-center justify-between">
                {/* Birthday */}
                <div>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        className={`w-[240px] h-[56px] justify-start text-left font-normal ${
                          !birthday ? 'text-muted-foreground' : ''
                        }`}
                      >
                        <div className="flex flex-col justify-center h-full">
                          <span className="text-xs text-gray-500">
                            Ngày sinh
                          </span>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {birthday ? (
                              format(birthday, 'PPP')
                            ) : (
                              <span className="text-slate-500">
                                Chọn ngày tháng năm sinh
                              </span>
                            )}
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="w-auto">
                        <Calendar
                          mode="single"
                          selected={birthday}
                          onSelect={(date) => {
                            setValue('birthday', date); // cập nhật giá trị của trường 'birthday' khi người dùng chọn một ngày
                            trigger('birthday'); // kích hoạt việc validate trường 'birthday' ngay lập tức
                          }}
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Role */}
                <div>
                  <Controller
                    name="role"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select
                        label="Vai trò (*)"
                        placeholder="Lựa chọn vai trò"
                        labelPlacement="inside"
                        radius="sm"
                        className="w-[240px] font-bold"
                        classNames={{
                          trigger: 'bg-old-lace',
                          value: 'font-normal text-slate-500',
                          label: 'text-slate-500 font-normal',
                        }}
                        startContent={
                          <RoleIcon className="text-xl text-black pointer-events-none flex-shrink-0" />
                        }
                        {...field}
                      >
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                </div>
              </div>

              {/* Error message */}
              <div className="flex flex-row justify-between">
                <div className="w-[240px]">
                  {errors.birthday && (
                    <p className="text-red-500 text-sm italic mt-2 ml-2">
                      {errors.birthday.message}
                    </p>
                  )}
                </div>
                <div className="w-[240px]">
                  {errors.role && (
                    <p className="text-red-500 text-sm italic mt-2 mr-50">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <Input
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Email (*)"
                placeholder="Nhập email đăng ký"
                type="email"
                variant="bordered"
                classNames={{
                  inputWrapper: 'bg-old-lace',
                }}
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm italic ml-2">
                  {errors.email.message}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={() => onSubmit()}>
                Sign in
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddUserDialog;
