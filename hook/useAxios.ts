import axios from "axios";

export default function useAxios() {

  // A METTRE EN VARIABLE D'ENVIRONNEMENT
  const baseUrl = "https://jsonplaceholder.typicode.com";

  // A RECUPERER AILLEURS
  const jwt = "jwt";

  const get = async (from: string) => {
    return await axios.get(`${baseUrl}/${from}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
  }

  const post = async<T>(data: T) => {
    return await axios.post(`${baseUrl}/`, {
      data: data
    })
  }



  return { get, post };
}