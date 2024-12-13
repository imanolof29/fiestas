
import { Header } from '@/components/Header';
import { PlaceCard } from '@/components/PlaceCardComponent';
import { PlaceCardLoadingComponent } from '@/components/PlaceCardLoadingComponent';
import { usePlaceList } from '@/hooks/api/place.hook';
import { useLocation } from '@/provider/LocationProvider';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {

  const router = useRouter()

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
    })
  }

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const LoadingView: React.FC = () => (
    <View style={{ flex: 1 }}>
      {new Array(5).fill(null).map((_, index) => (
        <PlaceCardLoadingComponent key={index} />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header onFilterClick={handleOpenPress} />
      {location && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#333' }}>Mostrando a {radius / 1000}km de tu ubicacion</Text>
        </View>
      )}
      {data && (
        <FlatList
          data={data.pages.flatMap(page => page.data)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceCard place={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
      {isLoading && <LoadingView />}
      {/* <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={-1}>
        <BottomSheetView style={{ flex: 1 }}>
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={handleClosePress} style={styles.closeButton}>
              <Ionicons style={styles.closeButtonIcon} name='close' />
            </TouchableOpacity>
            <View style={{ flex: 1, padding: 16 }}>
              <Text style={styles.title}>Filtrar por distancia</Text>
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Distancia: {tempRadius / 1000} km</Text>
                <Slider
                  value={tempRadius}
                  onValueChange={handleRadiusChange}
                  minimumValue={1000}
                  maximumValue={200000}
                  step={1}
                />
              </View>
              <TouchableOpacity onPress={applyRadiusChange} style={styles.filterButton}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>Aplicar filtros</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#FF4500',
    borderRadius: 10,
    color: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  }
})

