import { usePlaceList } from '@/api/places';
import { Header } from '@/components/Header';
import { PlaceCard } from '@/components/PlaceCardComponent';
import { PlaceCardLoadingComponent } from '@/components/PlaceCardLoadingComponent';
import { useLocation } from '@/provider/LocationProvider';
import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Modal, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const { location, radius, getCurrentLocation, setRadius } = useLocation();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const { data, isLoading, error } = usePlaceList(
    location?.coords.latitude ?? 0,
    location?.coords.longitude ?? 0,
    radius
  );

  const [visible, setVisible] = useState<boolean>(false);

  const handleRadiusChange = (distance: number) => {
    setRadius(distance);
    setVisible(false);
  };

  const LoadingView: React.FC = () => (
    <View style={styles.container}>
      {new Array(5).fill(null).map((_, index) => (
        <PlaceCardLoadingComponent key={index} />
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header onFilterClick={() => setVisible(!visible)} />
      <Modal transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una distancia</Text>
            {[5000, 10000, 20000, 25000, 50000, 100000, 150000].map((distance) => (
              <TouchableOpacity
                key={distance}
                style={[
                  styles.option,
                  radius === distance && styles.optionSelected,
                ]}
                onPress={() => handleRadiusChange(distance)}
              >
                <Text style={styles.optionText}>{distance} km</Text>
              </TouchableOpacity>
            ))}

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {location && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#333' }}>Mostrando a {radius / 1000}km de tu ubicacion</Text>
        </View>
      )}
      {data && (
        <FlatList
          data={data.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PlaceCard place={item} />}
        />
      )}
      {isLoading && <LoadingView />}
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  option: {
    padding: 10,
    marginVertical: 5,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  optionSelected: {
    backgroundColor: '#007bff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})

