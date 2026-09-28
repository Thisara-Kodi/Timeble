import { View, Text } from 'react-native';
import {Link} from 'expo-router';

export default function ExampleScreen() {
  return (
    <View>
      <Text>Welcome To Timeble</Text>
      <Link href="/settings" style={{ maruginTop:20, color: 'blue' }}>
        Go to Settings
      </Link>
    </View>
  );
}