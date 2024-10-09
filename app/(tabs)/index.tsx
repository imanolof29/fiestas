import { useEventList } from '@/api/events';
import EventCard from '@/components/EventCard';
import { Link } from 'expo-router';
import { StyleSheet, FlatList, ActivityIndicator, Text, View, SafeAreaView } from 'react-native';

export default function HomeScreen() {

  const { data, isLoading, error } = useEventList()

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error al cargar</Text>
      </View>
    )
  }

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Link href={{ pathname: "/event-details/[id]", params: { id: item.id } }} asChild>
        <Text>{item.name}</Text>
      </Link>
    )
  }

  return (
    <>
      <SafeAreaView />
      <FlatList data={data} renderItem={({ item }: { item: any }) => <EventCard event={item} />} />
    </>
  );
}
