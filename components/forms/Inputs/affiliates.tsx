'use client';
import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { GetAffiliates } from './actions';

export default function AffiliateInput({
  AffiliateId
}: { AffiliateId?: number | null } = {}) {
  const [affiliates, setAffiliates] = useState<
    { affiliate_id: number; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchAffiliate() {
      try {
        const data = await GetAffiliates();
        setAffiliates(data);
      } catch (error) {
        console.error('Error fetching affiliates:', error);
      }
    }
    fetchAffiliate();
  }, []);

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
