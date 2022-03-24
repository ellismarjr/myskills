import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121015',
    paddingVertical: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greeting: {
    color: '#CCC',
  },
});

interface HeaderProps {
  greeting: string;
}

export function Header({ greeting }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Júnior</Text>
      <Text style={styles.greeting}>{greeting}</Text>
    </View>
  );
}