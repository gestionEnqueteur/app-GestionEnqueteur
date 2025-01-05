import axios from 'axios';
import { useStoreZustand } from '../store/storeZustand';

export default function useApi() {
  
  const { jwt, urlApi } = useStoreZustand(state => ({jwt: state.jwt, urlApi: state.urlApi}))
  const baseURL = urlApi;
  const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};
  const customAxios = axios.create({
    baseURL,
    headers: headers
  });
  return customAxios;
}