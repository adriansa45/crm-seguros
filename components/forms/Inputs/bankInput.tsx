'use client';
import React, { useState, useEffect, Key } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { GetBanks } from './actions';

export default function BankInput({
  BankId
}: { BankId?: Key } = {}) {
  const [banks, setBanks] = useState<
    { bank_id: number; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchBanks() {
      try {
        const data = await GetBanks();
        setBanks(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }
    fetchBanks();
  }, []);

  return (
    <Autocomplete
    isRequired
      name='bank_id'
      label={'Seleciona un banco'}
    >
      {banks.map((op) => (
        <AutocompleteItem key={op.bank_id} value={op.name}>
          {op.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
