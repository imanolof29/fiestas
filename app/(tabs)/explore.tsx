import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href={{ pathname: "/event-details/[id]", params: { id: 1 } }} asChild>
        <Text>Explore</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
