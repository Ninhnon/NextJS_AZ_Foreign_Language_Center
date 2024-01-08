'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GuestInformationForm = ({
  setPage,
  fullName,
  setFullName,
  email,
  setEmail,
}) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="w-[95%] h-full flex flex-col gap-y-6">
        <Input
          placeholder="Enter your Full name"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          label="Full name"
        />
        <Input
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
        />
      </div>
      <div className="mt-20 w-full flex justify-center">
        <Button
          onClick={() => {
            setPage('2');
          }}
          disabled={!fullName || !email}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default GuestInformationForm;
