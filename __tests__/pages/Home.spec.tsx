import React from 'react';

import { render, fireEvent, act } from '@testing-library/react-native';

import { Home } from '../../src/pages/Home';

jest.mock('react-native-vector-icons/Feather', () => 'Feather');

describe('Home', () => {
  it('should be able to render new added skills', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const inputElement = getByPlaceholderText('New skill');

    fireEvent.changeText(inputElement, 'React Native');
    fireEvent(inputElement, 'submitEditing');

    fireEvent.changeText(inputElement, 'Tests in React Native');
    fireEvent(inputElement, 'submitEditing');

    getByText('React Native');
    getByText('Tests in React Native');
  });

  it('should not be able to add an empty skills', () => {
    const { getByPlaceholderText, queryByText } = render(<Home />);
    const inputElement = getByPlaceholderText('New skill');

    fireEvent.changeText(inputElement, 'React Native');
    fireEvent(inputElement, 'submitEditing');

    fireEvent.changeText(inputElement, 'React Native');
    fireEvent(inputElement, 'submitEditing');

    expect(queryByText('')).toBeNull();
  });

  it('should be able to remove skills by "onPress" event', async () => {
    const { getByPlaceholderText, getByText, queryByText, getByTestId } = render(<Home />);
    const inputElement = getByPlaceholderText('New skill');

    fireEvent.changeText(inputElement, 'React Native');
    fireEvent(inputElement, 'submitEditing');
    
    fireEvent.changeText(inputElement, 'Tests in React Native');
    fireEvent(inputElement, 'submitEditing');

    const firstSkill = getByTestId('React Native-handleDeleteSkillButton');

    fireEvent.press(firstSkill);

    expect(queryByText('React Native')).toBeNull();
    getByText('Tests in React Native');
  });
});