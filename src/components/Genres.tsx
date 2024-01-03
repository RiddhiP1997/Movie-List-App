import {View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import FilterButton from './Button';
import COLORS from '../styles/Colors';
import {IGenreData} from '../screens/MovieList';

interface IProps {
  genres: IGenreData[];
  onFilterItemPress: (id: number) => void;
}

const Genres = ({genres, onFilterItemPress}: IProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        horizontal={true}
        renderItem={({item}) => (
          <FilterButton
            title={item.name}
            selected={item.isSelected}
            onFilterItemPress={() => onFilterItemPress(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: COLORS.grey,
  },
});

export default Genres;
