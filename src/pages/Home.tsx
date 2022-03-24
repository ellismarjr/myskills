import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';
import Feather from 'react-native-vector-icons/Feather';

import { SkillCard } from '../components/SkillCard';
import { Header } from '../components/Header';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  containerAddSkill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1e25',
    borderRadius: 7,
    height: 56
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 18,
    paddingHorizontal: 15
  },
  button: {
    backgroundColor: '#565BFF',
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    height: 56,
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
  gretting: {
    color: '#CCC',
  },
});

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState('');

  function checkIfSkillIsExists(skillName: string): boolean {
    return mySkills.some(skill => skill.name === skillName);
  }

  async function handleAddNewSkill() {
    if (checkIfSkillIsExists(newSkill)) {
      return Alert.alert('Essa skill já foi cadastrada!');
    }

    if (newSkill) {
      const data = {
        id: String(uuid.v4()),
        name: newSkill
      };
      setMySkills(prevArray => [...prevArray, data]);
      setNewSkill('');

      await AsyncStorage.setItem('@myskillsApp:mySkills', JSON.stringify([...mySkills, data]));
      Keyboard.dismiss();
    } else {
      Alert.alert('Digite alguma skill');
    }
  }

  async function handleDeleteSkill(skillId: string) {
    const skillsFiltered = mySkills.filter(skill => skill.id !== skillId);

    setMySkills(skillsFiltered)
    await AsyncStorage.setItem('@myskillsApp:mySkills', JSON.stringify(skillsFiltered))
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Good afternoon');
    } else {
      setGretting('Good night');
    }
  }, []);

  useEffect(() => {
    async function loadMySkills() {
      const response = await AsyncStorage.getItem('@myskillsApp:mySkills');
      if (response) {
        const repsonseParsed = JSON.parse(response);
        setMySkills(repsonseParsed);
      }
    }
    loadMySkills();
  }, []);

  return (
    <View style={styles.container}>
      <Header gretting={gretting} />

      <View style={styles.containerAddSkill}>
        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#555"
          onChangeText={setNewSkill}
          value={newSkill}
          onSubmitEditing={handleAddNewSkill}
          returnKeyType="send"
        />

        <TouchableOpacity
          testID="addNewSkillButton"
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleAddNewSkill}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>



      <Text style={[styles.title, { marginVertical: 20 }]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <SkillCard handleDeleteSkill={() => handleDeleteSkill(item.id)} skill={item.name} />}
      />
    </View>
  );
}
