import { atom } from "recoil";

// import des types
import ConfigurationType from "../models/ConfigurationType";

// création du state configuration
export const configurationState = atom<ConfigurationType>({
  key: 'configurationState', 
  default: {urlApi: "", user: ""},
}); 

