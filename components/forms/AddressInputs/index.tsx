'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import CacheContext from '@/lib/cacheContext';

export default function AddressInput() {
  const [stateSelected, setStateSelected] = useState<number | null>(null);
  const [citySelected, setCitySelected] = useState<number | null>(null);
  const [zipcode, setZipCode] = useState<string>('');
  
  const { states, cities, neighborhoods } = useContext(CacheContext);

  async function fetchCities(stateId: number) {
    setStateSelected(stateId);
    // Aquí podrías agregar la lógica para actualizar las ciudades según el estado seleccionado
  }

  async function fetchNeighborhoods(zip: string) {
    setZipCode(zip);
    // Aquí podrías agregar la lógica para actualizar los vecindarios según el código postal
  }
  useEffect(()=>{
    console.log(neighborhoods)
  },[])
  const filteredCities = cities.filter(c => c.state_id === stateSelected);
  const filteredNeighborhoods = neighborhoods.filter(n => n.zipcode === zipcode && n.city_id === citySelected);

  return (
    <>
      <Autocomplete
        isRequired
        label={'Seleciona un estado'}
        onSelectionChange={(o) => fetchCities(Number(o))}
        isDisabled={states.length < 1}
      >
        {states.map((op) => (
          <AutocompleteItem key={op.state_id} value={String(op.state_id)}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        isRequired
        label={'Seleciona un municipio'}
        onSelectionChange={(o) => setCitySelected(Number(o))}
        isDisabled={filteredCities.length < 1}
      >
        {filteredCities.map((op) => (
          <AutocompleteItem key={op.city_id} value={String(op.city_id)}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Input
        isRequired
        type="text"
        label="Código Postal"
        onValueChange={(o) => fetchNeighborhoods(o)}
      />
      <Autocomplete
        isRequired
        label={'Seleciona una colonia'}
        onSelectionChange={(o) => console.log(o)}
        isDisabled={filteredNeighborhoods.length < 1}
        name='neighborhood_id'
      >
        {filteredNeighborhoods.map((op) => (
          <AutocompleteItem key={op.neighborhood_id} value={String(op.neighborhood_id)}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
