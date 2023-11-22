import { Avatar } from "react-native-paper"
import { CompositionEnum } from "../../models/enum"
import { useEffect, useState } from "react";

type Props = {
  composition: CompositionEnum
}

export default function CompositionTrain(props: Readonly<Props>) {

  const { composition } = props; 

  const [output, setOutput ] = useState<string>("US"); 

  useEffect(() => {
    // a chaque changement de la composition
    switch(composition) {
      case CompositionEnum.US: 
        setOutput("US");
        break; 
      case CompositionEnum.UM2: 
        setOutput("UM2"); 
        break; 
      case CompositionEnum.UM3: 
        setOutput("UM3"); 
        break; 
      default: 
        setOutput("?"); 
    }
  }, [composition]); 

  return (
    <Avatar.Text label={output} size={40} />
  )
  
}