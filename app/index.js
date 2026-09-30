import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HabitCard = ({ habit, onToggle, onLongPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.habitCard, habit.completed && styles.habitCardCompleted]} 
      onPress={() => onToggle(habit.id)}
      onLongPress={() => onLongPress(habit.id)}
      activeOpacity={0.7}
    >
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
    </TouchableOpacity>
  );
};

export default function TodayScreen() {
  const [habits, setHabits] = useState([]); 
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem('@timeble_habits');
      if (savedHabits !== null) {
        setHabits(JSON.parse(savedHabits));
      }
    } catch (e) {
      console.error("Failed to load habits", e);
    }
  };

  const saveHabits = async (habitsToSave) => {
    try {
      const jsonValue = JSON.stringify(habitsToSave);
      await AsyncStorage.setItem('@timeble_habits', jsonValue);
    } catch (e) {
      console.error("Failed to save habits", e);
    }
  };

  const handleAddHabit = () => {
    if (inputText.trim() === '') return;
    
    const newHabit = {
      id: Date.now().toString(),
      title: inputText,
      streak: 0,
      completed: false, 
    };

    const updatedHabits = [newHabit, ...habits];
    setHabits(updatedHabits);
    saveHabits(updatedHabits); 
    setInputText('');
  };

  const toggleHabit = (id) => {
    const updatedHabits = habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    );
    setHabits(updatedHabits);
    saveHabits(updatedHabits); 
  };

  const deleteHabit = (id) => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to remove this habit?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            const updatedHabits = habits.filter(habit => habit.id !== id);
            setHabits(updatedHabits);
            saveHabits(updatedHabits); 
          } 
        }
      ]
    );
  };

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
        renderItem={({ item }) => (
          <HabitCard 
            habit={item} 
            onToggle={toggleHabit} 
            onLongPress={deleteHabit} 
          />
        )}
        contentContainerStyle={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  inputContainer: { flexDirection: 'row', padding: 16, paddingBottom: 0 },
  input: { flex: 1, backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 12, fontSize: 16, marginRight: 12, borderWidth: 1, borderColor: '#E5E5EA' },
  addButton: { backgroundColor: '#007AFF', width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }
});