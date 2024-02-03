import Course from "../models/Course";
import { CompositionEnum } from "../models/enum";
import { useDipatchCourses } from "./useDispatchCourses";


export default function useCheckAndAddStructureBscFunction() {
 
  // récupération de la fonction dispacth 
  const dispacth = useDipatchCourses(); 

  const addStructureBsc = (course: Course) => {
    // tous le code dans la fonction

  
    // on controle si il a la mesure BSC ( si déja la structure on fait rien ) 
    console.log("Début de la fonctionaddStructureBsc"); 
  
    // sinon a ajoute la structure BSC 
    if(!course.mesure) {
      // la structure n'existe pas 
  
      // je rajoute la structure de la BSC 
      const copyCourse = {...course} // je crée une copy pour travailler 
  
      console.log("ajout de la structure BSC"); 
      copyCourse.mesure = {
        
        infoTrain: {
          composition: CompositionEnum.US,
          numMaterial: "16420",
        },
        questionnaires: {
          distribuees: 0,
          vides: 0,
          inexploitables: 0,
          exploitables: 0,
        },
        commentaireNoSuccess: undefined, 
      }
      // mise a jour du state 
      dispacth({type: "update", course: copyCourse}); 
    } else {
      console.log("ne rentre pas dans le if"); 
    }

  }

  return addStructureBsc; 

    

}