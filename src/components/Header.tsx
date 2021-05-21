import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

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
  gretting: {
    color: '#CCC',
  },
});

interface HeaderProps {
  gretting: string;
}

export function Header({ gretting }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Júnior</Text>
      <Text style={styles.gretting}>{gretting}</Text>
    </View>
  );
}