// src/context/DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import { GetStates, GetCities, GetNeighborhoods } from './Actions/locationActions';
import { states, cities, neighborhoods, banks, payrolls, affiliates } from '@prisma/client';

export type cacheType ={
    state: states[],
    city: cities[],
    neighborhood: neighborhoods[],
    // bank: banks[],
    // payroll: payrolls[],
    // affiliate: affiliates[]
}

const CacheContext = createContext<cacheType>({state: [], city:[],neighborhood:[]});

export const CacheProvider = ({ children }:
    {
        children: React.ReactNode
    }
) => {
  const [state, setStates] = useState<states[]>([]);
  const [city, setCities] = useState<cities[]>([]);
  const [neighborhood, setNeighborhoods] = useState<neighborhoods[]>([]);

  const [banks, setBanks] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [affiliates, setAffiliates] = useState([]);

  const [cache, setCache] = useState<cacheType>({state: [], city:[],neighborhood:[]});

    useEffect(() => {
        // Aquí puedes hacer fetch de tus datos y guardarlos en el estado
        const fetchData = async () => {
            const cacheStorage = localStorage.getItem("cache");
            if (cacheStorage) {
                const cacheJson = JSON.parse(cacheStorage);
                setCache(cacheJson);
            }
            
            const stateData = await GetStates();
            const citiesData = await GetCities();
            const neighborhoodsData = await GetNeighborhoods();

            setStates(stateData);
            setCities(citiesData);
            setNeighborhoods(neighborhoodsData);
            //   setBanks(citiesData);
            //   setPayrolls(citiesData);
            //   setAffiliates(citiesData);
            const localCache = { state, city, neighborhood};
            localStorage.setItem("cache", JSON.stringify(localCache));
            setCache(localCache);
        };

        fetchData();
    }, []);

  return (
    <CacheContext.Provider value={cache}>
      {children}
    </CacheContext.Provider>
  );
};

export default CacheContext;
