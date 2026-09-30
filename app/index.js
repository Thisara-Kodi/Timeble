import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MOCK_HABITS = [
  { id: '1', title: 'Drink 2L Water', streak: 5 },
  { id: '2', title: 'Read 10 Pages', streak: 2 },
  { id: '3', title: 'Morning Stretch', streak: 12 },
];

export default function TodayScreen() {
  const renderHabit = ({ item }) => (
    <View style={styles.habitCard}>
      <View style={styles.cardLeft}>
        <Ionicons 
          name={habit.completed ? "checkmark-circle" : "ellipse-outline"} 
          size={24} 
          color={habit.completed ? "#4CAF50" : "#8E8E93"} 
          style={styles.icon} 
        />
        <Text style={[styles.habitTitle, habit.completed && styles.habitTitleCompleted]}>
          {habit.title}
        </Text>
      </View>
      <View style={styles.streakBadge}>
        <Text style={styles.streakText}>🔥 {habit.streak}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="What habit do you want to build?"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddHabit}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={renderHabit}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listPadding: {
    padding: 16,
  },
  habitCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  streakBadge: {
    backgroundColor: '#FFF0E6',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  streakText: {
    fontSize: 13,
    color: '#FF8C00',
    fontWeight: 'bold',
  }
});