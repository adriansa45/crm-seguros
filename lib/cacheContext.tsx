// src/context/DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import { GetStates, GetCities, GetNeighborhoods } from './Actions/locationActions';
import { states, cities, neighborhoods, banks, payrolls, affiliates } from '@prisma/client';
import { GetAffiliates, GetBanks, GetPayrolls } from './Actions/catalogActions';

export type cacheType ={
  states: states[],
  cities: cities[],
  neighborhoods: neighborhoods[],
  banks: banks[],
  payrolls: payrolls[],
  affiliates: affiliates[]
}

const CacheContext = createContext<cacheType>({states: [], cities:[],neighborhoods:[], banks:[], payrolls:[], affiliates:[]});

export const CacheProvider = ({ children }:
    {
        children: React.ReactNode
    }
) => {
  const [states, setStates] = useState<states[]>([]);
  const [cities, setCities] = useState<cities[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<neighborhoods[]>([]);

  const [banks, setBanks] = useState<banks[]>([]);
  const [payrolls, setPayrolls] = useState<payrolls[]>([]);
  const [affiliates, setAffiliates] = useState<affiliates[]>([]);

  const [cache, setCache] = useState<cacheType>({states: [], cities:[],neighborhoods:[], banks:[], payrolls:[], affiliates:[]});

    useEffect(() => {
        const fetchData = async () => {
            const cacheStorage = localStorage.getItem("cache");
            if (cacheStorage) {
                const cacheJson = JSON.parse(cacheStorage) as cacheType;
                setCache({...cacheJson, neighborhoods:[] });
            }
            
            const stateData = await GetStates();
            const citiesData = await GetCities();
            const neighborhoodsData = await GetNeighborhoods();

            const bankData = await GetBanks();
            const payrollData = await GetPayrolls();
            const affiliateData = await GetAffiliates();

            setStates(stateData);
            setCities(citiesData);
            setNeighborhoods(neighborhoodsData);
            setBanks(bankData);
            setPayrolls(payrollData);
            setAffiliates(affiliateData);
            localStorage.setItem("cache", JSON.stringify({ states: stateData, cities: citiesData}));
            console.log(neighborhoodsData)
            setCache({ states: stateData, cities: citiesData, neighborhoods: neighborhoodsData, 
              banks: bankData, payrolls: payrollData, affiliates: affiliateData});
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
