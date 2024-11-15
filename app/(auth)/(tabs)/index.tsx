import { Header } from '@/components/Header';
import { Clock, MapPin, Music, Star } from 'lucide-react-native';
import { FlatList, Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';

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

  const DiscoCard = ({ disco }: any) => (
    <TouchableOpacity style={styles.discoCard}>
      <Image source={{ uri: disco.image }} style={styles.discoImage} />
      <View style={styles.discoInfo}>
        <View style={styles.discoHeader}>
          <Text style={styles.discoName}>{disco.name}</Text>
          <View style={styles.ratingContainer}>
            <Star size={16} color="#FF5A36" fill="#FF5A36" />
            <Text style={styles.ratingText}>{disco.rating}</Text>
          </View>
        </View>
        <View style={styles.discoDetails}>
          <MapPin size={16} color="#666" />
          <Text style={styles.discoAddress}>{disco.address}</Text>
        </View>
        <View style={styles.discoFeatures}>
          <View style={styles.feature}>
            <Clock size={14} color="#666" />
            <Text style={styles.featureText}>{disco.openHours}</Text>
          </View>
          <View style={styles.feature}>
            <Music size={14} color="#666" />
            <Text style={styles.featureText}>{disco.musicType}</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureText}>{disco.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList data={discos} renderItem={(item) => <DiscoCard disco={item.item} />} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    backgroundColor: '#FF5A36',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  filterButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    height: '50%',
  },
  discoList: {
    flex: 1,
  },
  discoCard: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  discoImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  discoInfo: {
    flex: 1,
  },
  discoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  discoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#FF5A36',
    fontWeight: '600',
  },
  discoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  discoAddress: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  discoFeatures: {
    flexDirection: 'row',
    gap: 12,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navText: {
    color: '#666',
  },
  navTextActive: {
    color: '#FF5A36',
  },
  filterContainer: {
    flex: 1,
    padding: 16,
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  resetText: {
    color: '#FF5A36',
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  categoryChipSelected: {
    backgroundColor: '#FF5A36',
  },
  categoryText: {
    color: '#666',
  },
  categoryTextSelected: {
    color: '#FFF',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  distanceButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  distanceButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  distanceText: {
    fontSize: 16,
  },
  showResultsButton: {
    backgroundColor: '#FF5A36',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  showResultsText: {
    color: '#FFF',
    fontWeight: '600',
  },
});
