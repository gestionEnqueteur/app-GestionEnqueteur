import axios from 'axios';
import { useStoreZustand } from '../store/storeZustand';
import { useMemo } from 'react';

export default function useApi() {
  
  const jwt = useStoreZustand(state => state.jwt); 
  const urlApi = useStoreZustand(state => state.urlApi); 

  const customAxios = useMemo(() => {
    
    const baseURL = urlApi;
    const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};
    return axios.create({
      baseURL,
      headers: headers
    });

  }, [jwt, urlApi])

  return customAxios;
}