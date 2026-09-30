import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_HABITS = [
  { id: '1', title: 'Drink 2L Water', streak: 5 },
  { id: '2', title: 'Read 10 Pages', streak: 2 },
];

const HabitCard = ({ habit }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <TouchableOpacity 
      style={[styles.habitCard, isCompleted && styles.habitCardCompleted]} 
      onPress={() => setIsCompleted(!isCompleted)}
      activeOpacity={0.7}
    >
      <View style={styles.cardLeft}>
        <Ionicons 
          name={isCompleted ? "checkmark-circle" : "ellipse-outline"} 
          size={24} 
          color={isCompleted ? "#4CAF50" : "#8E8E93"} 
          style={styles.icon} 
        />
        <Text style={[styles.habitTitle, isCompleted && styles.habitTitleCompleted]}>
          {habit.title}
        </Text>
      </View>
      <View style={styles.streakBadge}>
        <Text style={styles.streakText}>🔥 {habit.streak}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function TodayScreen() {
  // 1. Lift the habits list into state so it can be updated
  const [habits, setHabits] = useState(INITIAL_HABITS);
  // 2. State to hold the text the user is currently typing
  const [inputText, setInputText] = useState('');

  // 3. Function to add the new habit to the top of the list
  const handleAddHabit = () => {
    if (inputText.trim() === '') return;
    
    const newHabit = {
      id: Date.now().toString(), // Generate a quick unique ID
      title: inputText,
      streak: 0,
    };

    setHabits([newHabit, ...habits]);
    setInputText(''); // Clear the input field after adding
  };

  return (
    <View style={styles.container}>
      {/* NEW: Input Row */}
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="What habit do you want to build?"
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAddHabit} // Triggers when user hits "Enter" on keyboard
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddHabit}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={habits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HabitCard habit={item} />}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... Keep all your previous styles! Just add these three new ones below:
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  listPadding: { padding: 16 },
  habitCard: { backgroundColor: 'white', padding: 16, borderRadius: 16, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  habitCardCompleted: { backgroundColor: '#F0FFF0', borderColor: '#4CAF50', borderWidth: 1 },
  cardLeft: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 12 },
  habitTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  habitTitleCompleted: { color: '#8E8E93', textDecorationLine: 'line-through' },
  streakBadge: { backgroundColor: '#FFF0E6', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 12 },
  streakText: { fontSize: 13, color: '#FF8C00', fontWeight: 'bold' },
  
  // NEW STYLES
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 0,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  addButton: {
    backgroundColor: '#007AFF', // Standard iOS blue
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  }
});