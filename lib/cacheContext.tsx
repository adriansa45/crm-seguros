// src/context/DataContext.js
import React, { createContext, useState, useEffect } from 'react';
import { GetStates, GetCities } from './Actions/locationActions';
import { states, cities, neighborhoods, banks, payrolls, affiliates } from '@prisma/client';
import { GetAffiliates, GetBanks, GetPayrolls } from './Actions/catalogActions';

export type cacheType ={
  states: states[],
  cities: cities[],
  banks: banks[],
  payrolls: payrolls[],
  affiliates: affiliates[]
}

const CacheContext = createContext<cacheType>({states: [], cities:[], banks:[], payrolls:[], affiliates:[]});

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

  const [cache, setCache] = useState<cacheType>({states: [], cities:[],banks:[], payrolls:[], affiliates:[]});

    useEffect(() => {
        const fetchData = async () => {
            const cacheStorage = localStorage.getItem("cache");
            if (cacheStorage) {
              try{
                const cacheJson = JSON.parse(cacheStorage) as cacheType;
                setCache(cacheJson);
                console.log(cacheJson)
                if (cacheJson.affiliates.length > 0) return;
                console.log("localStorage Incomplete")
              }catch{

              }
              console.log(cache)
            }
            
            const stateData = await GetStates();
            const citiesData = await GetCities();

            const bankData = await GetBanks();
            const payrollData = await GetPayrolls();
            const affiliateData = await GetAffiliates();

            setStates(stateData);
            setCities(citiesData);

            setBanks(bankData);
            setPayrolls(payrollData);
            setAffiliates(affiliateData);

            const fetchCache = { states: stateData, cities: citiesData, banks: bankData, payrolls: payrollData, affiliates: affiliateData}
            localStorage.setItem("cache", JSON.stringify(fetchCache));
            setCache(fetchCache);
            console.log(fetchCache)
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
