'use client';

import React from 'react';

import { StripeCheckout } from './childComponents/StripeCheckout';

export const PaymentForm = ({
  checkedItems,
  total,
  userFullName,
  userEmail,
}) => {
  return (
    <div className="w-full h-full px-1">
      <StripeCheckout
        userFullName={userFullName}
        userEmail={userEmail}
        checkedItems={checkedItems}
        total={total}
      />
    </div>
  );
};
