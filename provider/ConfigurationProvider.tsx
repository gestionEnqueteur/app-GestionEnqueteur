import { ReactNode, createContext, useState, useEffect } from "react";
import ConfigurationType from "../models/ConfigurationType";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  children: ReactNode;
};

// création du context
export const ConfigurationContext: React.Context<any | null> = createContext<
  any | null
>(null);

export default function ConfigurationProvider(props: Props): JSX.Element {
  const [configuration, setConfiguration] = useState<ConfigurationType>({
    urlApi: "",
    user: "",
  });

  const getConfiguration = async (): Promise<ConfigurationType | undefined> => {
    try {
      const jsonValue: string | null = await AsyncStorage.getItem(
        "configuration"
      );
      return jsonValue != null ? JSON.parse(jsonValue) : undefined;
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect((): void => {
    // chargement de la configuration dans le context ConfigurationProvider
    try {
      getConfiguration().then((storedConfig?: ConfigurationType) => {
        if (storedConfig) setConfiguration(storedConfig);
      });
    } catch (e: any) {
      // ici on va gerer l'erreur en cas d'échec
      console.log("Echec du chargement de la configuration: " + e);
    }
  }, []);

  return (
    <ConfigurationContext.Provider value={{ configuration, setConfiguration }}>
      {props.children}
    </ConfigurationContext.Provider>
  );
}
