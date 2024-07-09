'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import CacheContext from '@/lib/cacheContext';

export default function AddressInput() {
  const [citySelected, setCity] = useState<number>(0);
  const [stateSelected, setState] = useState<number>(0);
  const [neighborhoodSelected, setNeighborhood] = useState<number>(0);
  const [zipcode, setZipCode] = useState(null);
  
  const { state, neighborhood, city } = useContext(CacheContext);

  async function fetchCities(stateId: number) {
    setState(stateId);
    
  }

  async function fetchNeighborhoods(zipcode: string) {
    
  }

  return (
    <>
      <Autocomplete
        isRequired
        label={'Seleciona un estado'}
        onSelectionChange={(o) => fetchCities(o as number)}
        isDisabled={state.length < 1}
      >
        {state.map((op) => (
          <AutocompleteItem key={op.state_id} value={op.name}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        isRequired
        label={'Seleciona un municipio'}
        onSelectionChange={(o) => setCity(o as number)}
        isDisabled={city.length < 1}
      >
        {city.map((op) => (
          <AutocompleteItem key={op.city_id} value={op.name}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Input
        isRequired
        type="zipcode"
        label="Código Postal"
        onValueChange={(o) => fetchNeighborhoods(o)}
      />
      <Autocomplete
        isRequired
        label={'Seleciona una colonia'}
        onSelectionChange={(o) => setCity(o as number)}
        isDisabled={neighborhood.length < 1}
        name='neighborhood_id'
      >
        {neighborhood.map((op) => (
          <AutocompleteItem key={op.neighborhood_id} value={op.name}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
