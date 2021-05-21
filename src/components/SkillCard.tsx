import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1f1e25',
    padding: 15,
    borderRadius: 7,
    marginBottom: 10,
  },
  buttonSkill: {
    backgroundColor: '#E53E3E',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7
  },
  buttonSkillText: {
    color: '#CCC',
    fontWeight: 'bold',
  },
  skills: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

type SkillProps = {
  skill: string;
  handleDeleteSkill: () => void;
};

export function SkillCard({ skill, handleDeleteSkill }: SkillProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.skills}>{skill}</Text>
      <TouchableOpacity onPress={handleDeleteSkill} activeOpacity={0.7} style={styles.buttonSkill}>
        <Text style={styles.buttonSkillText}>Excluir</Text>
    </TouchableOpacity>
    </View>
  );
}
