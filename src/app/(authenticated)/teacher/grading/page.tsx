'use client';
import React from 'react';
import GradingTable from './GradingTable';
import { useDisclosure } from '@nextui-org/react';

const page = () => {
  const { onOpen } = useDisclosure();
  const [selectedAssignment, setSelectedAssignment] = React.useState(null);

  React.useEffect(() => {
    console.log(selectedAssignment, selectedAssignment);
  }, [selectedAssignment]);

  return (
    <div>
      <GradingTable
        onOpen={onOpen}
        setSelectedAssignment={setSelectedAssignment}
      />
    </div>
  );
};

export default page;
