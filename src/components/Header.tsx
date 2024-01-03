import {View, Image, StyleSheet} from 'react-native';
import COLORS from '../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  onSearchIconPress: () => void;
  searchSelected: boolean;
}

const Header = ({onSearchIconPress, searchSelected}: IProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/netflix.png')}
        style={styles.img}
        resizeMode={'contain'}
      />
      <Icon
        name="search"
        onPress={onSearchIconPress}
        size={25}
        color={searchSelected ? COLORS.red : COLORS.white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.grey,
    paddingHorizontal: 10,
  },
  img: {
    height: 70,
    width: 100,
  },
});

export default Header;
