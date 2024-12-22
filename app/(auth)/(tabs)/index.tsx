
import { Header } from '@/components/Header';
import { PlaceCard } from '@/components/PlaceCardComponent';
import { PlaceCardLoadingComponent } from '@/components/PlaceCardLoadingComponent';
import { usePlaceList } from '@/hooks/api/place.hook';
import { useLocation } from '@/provider/LocationProvider';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const { location, radius, getCurrentLocation } = useLocation();

  useEffect(() => {
    getCurrentLocation();
  }, [radius]);

  const { data, isLoading, error, hasNextPage, fetchNextPage } = usePlaceList(
    location?.coords.latitude ?? 0,
    location?.coords.longitude ?? 0,
    radius
  );

  const handleOpenPress = () => {
    router.push({
      pathname: "/(auth)/(modals)/filter"
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const LoadingView: React.FC = () => (
    <View style={{ flex: 1 }}>
      {new Array(5).fill(null).map((_, index) => (
        <PlaceCardLoadingComponent key={index} />
      ))}
    </View>
  );

  const EmptyResult = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: '#666' }}>
        No se encontraron lugares cercanos en este radio
      </Text>
      <Text style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
        Intenta aumentar el radio de búsqueda
      </Text>
    </View>
  );

  const ErrorView = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 16, color: '#666' }}>
        Ha ocurrido un error al cargar los lugares
      </Text>
      <Text style={{ fontSize: 14, color: '#999', marginTop: 8 }}>
        Por favor, intenta nuevamente más tarde
      </Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return <LoadingView />;
    }

    if (error) {
      return <ErrorView />;
    }

    if (!data || data.pages.flatMap(page => page.data).length === 0) {
      return <EmptyResult />;
    }

    return (
      <FlatList
        data={data.pages.flatMap(page => page.data)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header onFilterClick={handleOpenPress} />
      {location && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: "#333" }}>
            Mostrando a {radius / 1000}km de tu ubicación
          </Text>
        </View>
      )}
      {renderContent()}
    </View>
  );
}
