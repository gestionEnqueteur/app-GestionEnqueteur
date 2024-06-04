import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { configurationState, userState } from "../store/storeAtom";

export default function useApi() {
  const config = useRecoilValue(configurationState);
  const user = useRecoilValue(userState);
  const baseURL = config.urlApi;

  const headers = user ? { Authorization: `Bearer ${user.token}` } : {};

  const customAxios = axios.create({
    baseURL,
    headers: headers
  });


  return customAxios;
}