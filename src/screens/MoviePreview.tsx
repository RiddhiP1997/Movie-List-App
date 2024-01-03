import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {useState} from 'react';
import COLORS from '../styles/Colors';
import {RouteProp, useRoute} from '@react-navigation/native';

interface INavigationParams {
  preview: string;
  title: string;
  overview: string;
}

const MoviePreview = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const route: RouteProp<
    Record<string, INavigationParams>,
    string
  > = useRoute();
  const {preview, title, overview} = route?.params;

  return (
    <View style={styles.bgImage}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            animating={loading}
            size="small"
            color={COLORS.red}
          />
        </View>
      )}
      {
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${preview}`,
          }}
          style={styles.imageStyle}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
      }
      <Text style={[styles.text, {fontSize: 20, fontWeight: 'bold'}]}>
        {title}
      </Text>
      <Text style={[styles.text, {fontSize: 14}]}>{overview}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.grey,
  },
  imageStyle: {height: 250, borderRadius: 15, marginBottom: 10},
  loadingContainer: {
    height: 250,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.white,
    paddingVertical: 8,
  },
});

export default MoviePreview;
