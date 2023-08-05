import { ReactNode, createContext, useEffect, useMemo } from "react";
import ConfigurationService from "../services/ConfigurationService";
import { ConfigurationContext } from "./ConfigurationProvider";

type Props = {
  children: ReactNode;
};

// création du context
export const AppContext = createContext<any>(null);

export default function AppProvider(props: Props) {
  // création de l'instance Configuration service
  const configurationService = useMemo(() => {
    console.log("Factory: configurationService")
    return new ConfigurationService({ urlApi: "", user: "" });
  }, []);

  useEffect(() => {
    // Init de l'application
    console.log("Mount: AppProvider")
  }, []);

  return (
    <AppContext.Provider value={configurationService}>
      {props.children}
    </AppContext.Provider>
  );
}
