import { FlatList } from "react-native";
import DetailCourse from "../components/DetailCourse";
import Course from "../models/Course";
import { Text } from "react-native-paper";
import { useStoreZustand } from "../store/storeZustand";
import useSynchroApi from "../hook/useSynchroApi";

export default function TrainPlanifieScreen() {
  const courses = useStoreZustand((state) => state.courses);

  const { synchroApiPush, synchroApiPull } = useSynchroApi();

  console.log(`mount TrainPlanfieScreen `);

  const handleOnRefresh = async () => {
    console.log("refresh");
    await synchroApiPush();
    await synchroApiPull();
    console.log("end refresh");
  };

  const renderItem = ({ item }: { item: Course }) => {
    console.log("render Item");
    return <DetailCourse course={item} key={item.id.toString()} />;
  };

  return (
    <FlatList
      data={courses}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      onRefresh={handleOnRefresh}
      refreshing={false}
      ListEmptyComponent={<Text>La liste est vide </Text>}
    />
  );
}
