import { ReactNode, createContext, useState, useEffect } from "react";
import ConfigurationType from "../models/ConfigurationType";
import { getConfiguration } from "../services/ConfigurationService";

type Props = {
  children: ReactNode;
};

// création du context
export const ConfigurationContext = createContext<any>(null);

export default function ConfigurationProvider(props: Props) {
  const [configuration, setConfiguration] = useState<ConfigurationType>({
    urlApi: "",
    user: "",
  });

  useEffect(() => {
    // chargement de la configuration dans le context ConfigurationProvider
    getConfiguration()
      .then((storedConfig: ConfigurationType) => {
        if (storedConfig !== null) setConfiguration(storedConfig);
      })
      .catch((e: Error) => {
        console.log("Echec du chargement de la configuration: " + e);
      });
  }, []);

  return (
    <ConfigurationContext.Provider value={{ configuration, setConfiguration }}>
      {props.children}
    </ConfigurationContext.Provider>
  );
}
