import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import React from 'react';
import COLORS from '../styles/Colors';

interface IProps {
  title: string;
  selected: boolean;
  onFilterItemPress: () => void;
}

const FilterButton = ({title, selected, onFilterItemPress}: IProps) => {
  return (
    <TouchableOpacity
      onPress={onFilterItemPress}
      style={[
        styles.button,
        {backgroundColor: selected ? COLORS.red : COLORS.lightGrey},
      ]}>
      <Text style={styles.titleText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 6,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  titleText: {
    color: COLORS.white,
    fontSize: 14,
  },
});

export default FilterButton;
