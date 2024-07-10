'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import CacheContext from '@/lib/cacheContext';
import { GetNeighborhoods } from '@/lib/Actions/locationActions';
import { neighborhoods } from '@prisma/client';

export default function AddressInput({stateId, cityId, zipCode, neighborhoodId}:{
  stateId?: number, cityId?: number, zipCode?: string, neighborhoodId?: number
}) {
  const [stateSelected, setStateSelected] = useState<number | null>(null);
  const [citySelected, setCitySelected] = useState<number | null>(null);
  const [zipcode, setZipCode] = useState<string>('');
  const [neighborhoods, setNeighborhoods] = useState<neighborhoods[]>([]);
  
  const { states, cities} = useContext(CacheContext);

  async function fetchCities(stateId: number) {
    setStateSelected(stateId);
    // Aquí podrías agregar la lógica para actualizar las ciudades según el estado seleccionado
  }

  async function fetchNeighborhoods(zip: string) {
    setZipCode(zip);
    const filteredNeighborhoods =  await GetNeighborhoods(zip, citySelected?.toString() || "");
    setNeighborhoods(filteredNeighborhoods);
    // Aquí podrías agregar la lógica para actualizar los vecindarios según el código postal
  }
  useEffect(()=>{

    async function fetchNeighborhoods(zip: string, city:number) {
      setZipCode(zip);
      const filteredNeighborhoods =  await GetNeighborhoods(zip, city.toString());
      setNeighborhoods(filteredNeighborhoods);
      // Aquí podrías agregar la lógica para actualizar los vecindarios según el código postal
    }

    if (neighborhoodId && zipCode && cityId){
      fetchNeighborhoods(zipCode, cityId);
    }
    
  },[])
  const filteredCities = cities.filter(c => c.state_id === (stateSelected || stateId));
  let filteredNeighborhoods = [];

  return (
    <>
      <Autocomplete
        isRequired
        label={'Seleciona un estado'}
        onSelectionChange={(o) => fetchCities(Number(o))}
        isDisabled={states.length < 1}
        defaultSelectedKey={stateId?.toString()}
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
        defaultSelectedKey={cityId?.toString()}
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
        defaultValue={zipCode}
      />
      <Autocomplete
        isRequired
        label={'Seleciona una colonia'}
        onSelectionChange={(o) => console.log(o)}
        isDisabled={neighborhoods.length < 1}
        name='neighborhood_id'
        defaultSelectedKey={neighborhoodId?.toString()}
      >
        {neighborhoods.map((op) => (
          <AutocompleteItem key={op.neighborhood_id} value={String(op.neighborhood_id)}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
