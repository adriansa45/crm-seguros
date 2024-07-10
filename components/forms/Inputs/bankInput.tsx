'use client';
import React, { useState, useEffect, Key, useContext } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { GetBanks } from './actions';
import CacheContext from '@/lib/cacheContext';

export default function BankInput({
  BankId
}: { BankId?: Key } = {}) {
  const { banks } = useContext(CacheContext);

  return (
    <Autocomplete
    isRequired
      name='bank_id'
      label={'Seleciona un banco'}
      defaultSelectedKey={BankId?.toString()}
    >
      {banks.map((op) => (
        <AutocompleteItem key={op.bank_id} value={op.name}>
          {op.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
