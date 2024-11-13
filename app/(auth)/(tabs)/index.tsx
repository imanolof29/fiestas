import { useEventList } from '@/api/events';
import EventCard from '@/components/EventCard';
import { EventDto } from '@/types/event';
import React from 'react';
import { FlatList, ActivityIndicator, Text, View, SafeAreaView } from 'react-native';

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

  return (
    <>
      <SafeAreaView />
      <FlatList data={data?.data} renderItem={({ item }: { item: EventDto }) => <EventCard event={item} />} />
    </>
  );
}
