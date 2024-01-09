'use client';
import React from 'react';
import TeacherTable from './TeacherTable';
import AddUserDialog from './AddUserDialog';
import { useDisclosure } from '@nextui-org/react';
import EditUserDialog from './EditUserDialog';
import { User } from '@/models';

const page = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = React.useState<User>();
  const [modalStatus, setModalStatus] = React.useState('view');

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
    onClose: onEditClose,
  } = useDisclosure();

  React.useEffect(() => {
    console.log('🚀 ~ file: page.tsx:11 ~ selectedUser:', selectedUser);
  }, [selectedUser]);

  return (
    <div>
      <TeacherTable
        onOpen={onOpen}
        onEditOpen={onEditOpen}
        setSelectedUser={setSelectedUser}
        setModalStatus={setModalStatus}
      />
      <AddUserDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
      <EditUserDialog
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        onClose={onEditClose}
        selectedUser={selectedUser}
        modalStatus={modalStatus}
      />
    </div>
  );
};

export default page;
