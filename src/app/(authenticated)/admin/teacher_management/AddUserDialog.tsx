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
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/react';
import React from 'react';
import { FaCalendarAlt as CalendarIcon } from 'react-icons/fa';
import { FaRegUser as UserIcon } from 'react-icons/fa';
import { FaChalkboardTeacher as RoleIcon } from 'react-icons/fa';
import { IoIosMail as MailIcon } from 'react-icons/io';
import { format } from 'date-fns';
import { useEmail } from '@/hooks/useEmail';
import { FaSquarePhoneFlip as PhoneIcon } from 'react-icons/fa6';
import validator from 'validator';
import generator from 'generate-password';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import { users } from './data';

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
    .email({ message: 'Email không hợp lệ' })
    .refine(
      (value) => !users.some((user) => user.email === value),
      'Email đã được sử dụng, vui lòng thử lại với email khác'
    ),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^[0-9]+$/.test(value),
      'Số điện thoại chỉ được chứa số'
    )
    .refine(
      (value) => !value || validator.isMobilePhone(value, 'vi-VN'),
      'Số điện thoại không hợp lệ'
    ),
});

//validate form: zod
const AddUserDialog = ({ isOpen, onOpenChange, onClose }) => {
  /* Hooks */
  const { onConfirmationEmail } = useEmail();
  const { onAddUser, users } = useUser();
  const queryClient = useQueryClient();
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
    const password = generator.generate({
      length: 10,
      numbers: true,
      symbols: true,
      uppercase: true,
      lowercase: true,
    });

    try {
      handleClose();
      await onConfirmationEmail(values.fullName, values.email, password);
      await onAddUser(values, password);
      queryClient.invalidateQueries(['users']);

      reset();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  });

  /* End Form state */
  const birthday = watch('birthday');
  const values = getValues();

  React.useEffect(() => {
    console.log(
      '🚀 ~ file: AddUserDialog.tsx:47 ~ AddUserDialog ~ values:',
      values
    );
    console.log(users);
  }, [values]);

  const checkUniqueEmail = () => {
    if (users) return users.some((user) => user.email === values.email);
  };

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
              Thêm người dùng
            </ModalHeader>
            <ModalBody>
              {/* Name */}
              <Input
                autoFocus
                endContent={
                  <UserIcon className="text-2xl text-black font-semibold pointer-events-none flex-shrink-0" />
                }
                label={
                  <span className="text-base text-black font-semibold">
                    Họ và tên{' '}
                    <span className="text-red-500 font-semibold">(*)</span>
                  </span>
                }
                placeholder="Nhập họ tên người dùng"
                variant="bordered"
                classNames={{
                  inputWrapper: 'bg-old-lace',
                }}
                {...register('fullName')}
                onChange={(e) => {
                  setValue('fullName', e.target.value);
                  trigger('fullName');
                }}
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
                          <span className="text-sm text-black font-semibold">
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
                        label={
                          <span className="text-base text-black font-semibold">
                            Vai trò{' '}
                            <span className="text-red-500 font-semibold">
                              (*)
                            </span>
                          </span>
                        }
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
                        onChange={(value) => {
                          field.onChange(value);
                          trigger('role');
                        }}
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
                  <MailIcon className="text-3xl text-black font-bold pointer-events-none flex-shrink-0" />
                }
                label={
                  <span className="text-base text-black font-semibold">
                    Email{' '}
                    <span className="text-red-500 font-semibold">(*)</span>
                  </span>
                }
                placeholder="Nhập email đăng ký"
                type="email"
                variant="bordered"
                classNames={{
                  inputWrapper: 'bg-old-lace',
                }}
                {...register('email')}
                onChange={(e) => {
                  setValue('email', e.target.value);
                  trigger('email');
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-sm italic ml-2">
                  {errors.email.message}
                </p>
              )}

              {/* Phone number */}
              <Input
                endContent={
                  <PhoneIcon className="text-3xl text-black font-bold pointer-events-none flex-shrink-0" />
                }
                label={
                  <span className="text-base text-black font-semibold">
                    Số điện thoại{' '}
                  </span>
                }
                placeholder="Nhập số điện thoại"
                variant="bordered"
                classNames={{
                  inputWrapper: 'bg-old-lace',
                }}
                {...register('phoneNumber')}
                onChange={(e) => {
                  setValue('phoneNumber', e.target.value);
                  trigger('phoneNumber');
                }}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm italic ml-2">
                  {errors.phoneNumber.message}
                </p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onClick={async () => {
                  // Kiểm tra email tồn tại
                  if (checkUniqueEmail()) {
                    toast.error(
                      'Email đã tồn tại, vui lòng sử dụng email khác',
                      {
                        style: {
                          minWidth: '300px',
                          minHeight: '50px',
                        },
                        position: 'bottom-right',
                      }
                    );
                    return;
                  }

                  const result = await trigger();

                  if (result) {
                    toast.promise(
                      onSubmit(),
                      {
                        loading: 'Đang thêm người dùng ...',
                        success: 'Thêm người dùng thành công!',
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
                Sign in
              </Button>

              <Button color="danger" variant="flat" onPress={handleClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddUserDialog;
