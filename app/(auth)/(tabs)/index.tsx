import { usePlaceList } from '@/api/places';
import { Header } from '@/components/Header';
import { PlaceCard } from '@/components/PlaceCardComponent';
import { PlaceCardLoadingComponent } from '@/components/PlaceCardLoadingComponent';
import { useLocation } from '@/provider/LocationProvider';
import { useEffect, useState } from 'react';
import { FlatList, View, StyleSheet, Modal, Text, Button } from 'react-native';

const discos = [
  {
    id: '1',
    name: 'Fever Club Bilbao',
    address: 'Calle Particular de Allende 2, Bilbao',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60',
    latitude: 43.2630,
    longitude: -2.9350,
    price: '€€',
    musicType: 'House / EDM',
    openHours: '23:30 - 06:00'
  },
  {
    id: '2',
    name: 'Sonora Donostia',
    address: 'Reyes Católicos 11, San Sebastián',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1581974944026-5d6ed762f617?auto=format&fit=crop&w=500&q=60',
    latitude: 43.3183,
    longitude: -1.9812,
    price: '€€',
    musicType: 'Pop / Urban',
    openHours: '00:00 - 06:30'
  },
  {
    id: '3',
    name: 'Kutxa Vitoria',
    address: 'Calle Eduardo Dato 31, Vitoria-Gasteiz',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?auto=format&fit=crop&w=500&q=60',
    latitude: 42.8467,
    longitude: -2.6716,
    price: '€€€',
    musicType: 'Techno / Electronic',
    openHours: '23:00 - 07:00'
  },
  {
    id: '4',
    name: 'Shake Bilbao',
    address: 'Licenciado Poza 43, Bilbao',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60',
    latitude: 43.2627,
    longitude: -2.9388,
    price: '€€',
    musicType: 'Commercial / Urban',
    openHours: '00:00 - 05:30'
  },
  {
    id: '5',
    name: 'Bataplan Donostia',
    address: 'Paseo de la Concha 3, San Sebastián',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60',
    latitude: 43.3125,
    longitude: -1.9864,
    price: '€€€',
    musicType: 'Electro / House',
    openHours: '23:30 - 06:00'
  },
  {
    id: '6',
    name: 'Drow Vitoria',
    address: 'Calle San Prudencio 18, Vitoria-Gasteiz',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60',
    latitude: 42.8475,
    longitude: -2.6722,
    price: '€€',
    musicType: 'Reggaeton / Urban',
    openHours: '00:00 - 05:30'
  },
  {
    id: '7',
    name: 'Tiffanys Barakaldo',
    address: 'Calle Gernikako Arbola 14, Barakaldo',
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60',
    latitude: 43.2956,
    longitude: -2.9977,
    price: '€€',
    musicType: 'House / Pop',
    openHours: '23:00 - 06:00'
  },
  {
    id: '8',
    name: 'New Gastes',
    address: 'Calle Portal de Castilla 62, Vitoria-Gasteiz',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=500&q=60',
    latitude: 42.8439,
    longitude: -2.6780,
    price: '€€€',
    musicType: 'Electronic / Techno',
    openHours: '00:00 - 06:30'
  }
];

export default function HomeScreen() {

  const { location, radius, getCurrentLocation } = useLocation()

  useEffect(() => {
    getCurrentLocation()
  }, [])

  const { data, isLoading, error } = usePlaceList(location?.coords.latitude ?? 0, location?.coords.longitude ?? 0, radius)

  const [visible, setVisible] = useState<boolean>(false)

  const LoadingView = () => {
    return (
      <View style={styles.container}>
        {new Array(5).fill(null).map((item) => <PlaceCardLoadingComponent key={item} />)}
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Header onFilterClick={() => setVisible(!visible)} />
      <Modal animationType='slide' transparent={true} visible={visible} onRequestClose={() => setVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text>Modal text</Text>
            <Button title="Cerrar Modal" onPress={() => setVisible(false)} />
          </View>
        </View>
      </Modal>
      {data && (
        <FlatList
          data={data?.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <PlaceCard place={item.item} />}
        />
      )}
      {isLoading && (<LoadingView />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
})

