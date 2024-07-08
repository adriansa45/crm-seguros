'use client';
import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { GetPayrolls } from './actions';

export default function PayrollInput({
  PayrollId
}: { PayrollId?: number | null } = {}) {
  const [payrolls, setBanks] = useState<
    { payroll_id: number; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchPayrolls() {
      try {
        const data = await GetPayrolls();
        setBanks(data);
      } catch (error) {
        console.error('Error fetching payrolls:', error);
      }
    }
    fetchPayrolls();
  }, []);

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
