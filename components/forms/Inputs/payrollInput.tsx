'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { GetPayrolls } from './actions';
import CacheContext from '@/lib/cacheContext';

export default function PayrollInput({
  PayrollId
}: { PayrollId?: number | null } = {}) {
  
  const { payrolls } = useContext(CacheContext);

  return (
    <Autocomplete
      isRequired
      name='payroll_id'
      label={'Seleciona una nómina'}
      selectedKey={PayrollId}
    >
      {payrolls.map((op) => (
        <AutocompleteItem key={op.payroll_id} value={op.name}>
          {op.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
