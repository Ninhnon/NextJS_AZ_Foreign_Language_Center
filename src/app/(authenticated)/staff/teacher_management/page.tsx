'use client';
import React from 'react';
import TeacherTable from './TeacherTable';
import AddUserDialog from './AddUserDialog';
import { useDisclosure } from '@nextui-org/react';

const page = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // onClose

  return (
    <div>
      <TeacherTable onOpen={onOpen} />
      <AddUserDialog isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default page;
