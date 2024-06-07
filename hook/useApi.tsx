import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { configurationState, jwtState } from "../store/storeAtom";

export default function useApi() {
  const config = useRecoilValue(configurationState);
  const jwt = useRecoilValue(jwtState);
  const baseURL = config.urlApi;
  const headers = jwt ? { Authorization: `Bearer ${jwt}` } : {};
  const customAxios = axios.create({
    baseURL,
    headers: headers
  });
  return customAxios;
}