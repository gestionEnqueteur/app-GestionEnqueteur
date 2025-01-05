import React, { ReactNode, useEffect } from "react";

type Props = {
  children: ReactNode;
};

export default function AppProvider(props: Readonly<Props>) {
  // Composant AppProvider

  console.log("mount AppProvider"); 
  

  useEffect(() => {
    // chargement des courses
    console.log("useEffect AppProvider"); 

    return () => { console.log("unmount AppProvider")}
  }, []);

  return <>{props.children}</>;
}
