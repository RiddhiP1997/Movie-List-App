import {View, TextInput, StyleSheet} from 'react-native';
import COLORS from '../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SearchInput = ({searchText, onClearPress, handleSearch}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        onChangeText={handleSearch}
        value={searchText}
        selectionColor={COLORS.white}
        returnKeyType={'done'}
      />
      <Icon
        name="close"
        onPress={onClearPress}
        size={16}
        color={COLORS.white}
        style={styles.clearIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexdirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: COLORS.grey,
  },
  searchInput: {
    backgroundColor: COLORS.lightGrey,
    height: 38,
    paddingLeft: 10,
    color: COLORS.white,
  },
  clearIcon: {
    position: 'absolute',
    right: 20,
  },
});

export default SearchInput;
