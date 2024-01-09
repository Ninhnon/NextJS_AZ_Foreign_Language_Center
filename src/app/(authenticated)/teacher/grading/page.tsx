'use client';
import React from 'react';
import GradingTable from './GradingTable';
import { useDisclosure } from '@nextui-org/react';
import EditCommentDialog from './EditCommentDialog';
import { Assignment_User } from '@/models';

const page = () => {
  const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
  const [selectedAssignment, setSelectedAssignment] =
    React.useState<Assignment_User>();

  React.useEffect(() => {
    console.log(selectedAssignment, selectedAssignment);
  }, [selectedAssignment]);

  return (
    <div>
      <GradingTable
        onOpen={onOpen}
        setSelectedAssignment={setSelectedAssignment}
      />

      <EditCommentDialog
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        selectedAssignment={selectedAssignment}
      />
    </div>
  );
};

export default page;
