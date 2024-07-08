'use client';
import React, { useState, useEffect } from 'react';
import { Autocomplete, AutocompleteItem, Input } from '@nextui-org/react';
import { GetStates, GetCities, GetNeighborhoods } from './actions';

export default function AddressInput() {
  const [state, setState] = useState<number>(0);
  const [city, setCity] = useState<number>(0);
  const [zipcode, setZipCode] = useState(null);
  const [states, setStates] = useState<{ state_id: number; name: string }[]>(
    []
  );
  const [cities, setCities] = useState<{ city_id: number; name: string }[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<
    { neighborhood_id: number; name: string }[]
  >([]);

  useEffect(() => {
    async function fetchStates() {
      try {
        const states = await GetStates();
        setStates(states);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }

    if (states.length < 1) fetchStates();
  }, []);

  async function fetchCities(stateId: number) {
    setState(stateId);
    try {
      const cities = await GetCities(stateId.toString());
      setCities(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  async function fetchNeighborhoods(zipcode: string) {
    try {
      const cities = await GetNeighborhoods(city.toString(), zipcode);
      setNeighborhoods(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }

  return (
    <>
      <Autocomplete
        isRequired
        label={'Seleciona un estado'}
        onSelectionChange={(o) => fetchCities(o as number)}
        isDisabled={states.length < 1}
      >
        {states.map((op) => (
          <AutocompleteItem key={op.state_id} value={op.name}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
      <Autocomplete
        isRequired
        label={'Seleciona un municipio'}
        onSelectionChange={(o) => setCity(o as number)}
        isDisabled={cities.length < 1}
      >
        {cities.map((op) => (
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
        isDisabled={neighborhoods.length < 1}
        name='neighborhood_id'
      >
        {neighborhoods.map((op) => (
          <AutocompleteItem key={op.neighborhood_id} value={op.name}>
            {op.name}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </>
  );
}
