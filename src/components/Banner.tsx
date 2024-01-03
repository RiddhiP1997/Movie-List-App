import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import COLORS from '../styles/Colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../App';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProps {
  img: string;
  title: string;
  rating: number;
  preview: string;
  overview: string;
}

const Banner = ({img, title, rating, preview, overview}: IProps) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <TouchableOpacity
      style={styles.bannerContainer}
      onPress={() =>
        navigation.navigate('MoviePreview', {preview, title, overview})
      }>
      <ImageBackground
        source={{uri: `https://image.tmdb.org/t/p/w500/${img}`}}
        style={styles.bgImage}>
        <View style={styles.titleContainer}>
          <Text style={styles.titletext}>{title}</Text>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color={COLORS.gold} />
            <Text style={styles.ratingText}> {rating}</Text>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    flex: 1,
    height: 280,
    margin: 6,
  },
  bgImage: {
    height: 280,
    justifyContent: 'flex-end',
  },
  titleContainer: {
    padding: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titletext: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
    paddingBottom: 4,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default Banner;
