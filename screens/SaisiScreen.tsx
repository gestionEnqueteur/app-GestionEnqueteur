import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import useSynchroApi from "../hook/useSynchroApi";
import { useDispatchCourses } from "../hook/useDispatchCourses";
import { useRecoilValue } from "recoil";
import { courseAllSelector, coursesState } from "../store/storeAtom";

export default function SaisiScreen() {
  const { synchroApiPush, synchroApiPull } = useSynchroApi();
  const courses = useRecoilValue(courseAllSelector); 
  const dispatch = useDispatchCourses();


  const handlePull = async () => {
    try {
      await synchroApiPull(); 
    }
    catch(error) {
      console.error(error); 
    }
    
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => synchroApiPush()}>
        Push
      </Button>
      <Button mode="contained" onPress={() => handlePull()}>
        Pull
      </Button>
      <Button mode="contained" onPress={() => dispatch({type: "reset"})}>
        Drop data
      </Button>
      <Button mode="contained" onPress={() => console.log(courses)} >
        Log courses
      </Button>
      <Button mode="contained" onPress={() => {
          console.log(courses[0]);
      }} >
        Test function toJson
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
