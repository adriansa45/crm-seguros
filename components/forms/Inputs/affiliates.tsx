'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { GetAffiliates } from './actions';
import CacheContext from '@/lib/cacheContext';

export default function AffiliateInput({
  AffiliateId
}: { AffiliateId?: number | null } = {}) {

  const { affiliates } = useContext(CacheContext);
  return (
    <Autocomplete
      isRequired
      name='affiliate_id'
      label={'Seleciona una afilación'}
      selectedKey={AffiliateId}
    >
      {affiliates.map((op) => (
        <AutocompleteItem key={op.affiliate_id} value={op.name}>
          {op.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
