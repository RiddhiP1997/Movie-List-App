import {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';
import Banner from '../components/Banner';
import axios from 'axios';
import {some} from 'lodash';
import Header from '../components/Header';
import Genres from '../components/Genres';
import COLORS from '../styles/Colors';
import SearchInput from '../components/SearchInput';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';

export interface IMovieData {
  backdrop_path: string;
  genre_ids: Number[];
  id: number;
  overview: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  title: string;
  original_language?: string;
  original_title?: string;
  video?: boolean;
  adult?: boolean;
  vote_average: number;
  vote_count?: number;
}

export interface IGenreData {
  id: number;
  name: string;
  isSelected: boolean;
}

const MovieList = (): JSX.Element => {
  const [movies, setMovies] = useState<IMovieData[]>([]);
  const [genres, setGenres] = useState<IGenreData[]>([]);
  const [filterSelected, setFilterSelected] = useState<boolean>(false);
  const [filteredResult, setFilteredResult] = useState<IMovieData[]>([]);
  const [searchText, setSearchText] = useState('');
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [releaseYear, setReleaseYear] = useState<number>(2012);
  const [loadingMoreData, setLoadingMoreData] = useState<boolean>(false);

  const flatlistRef: React.RefObject<FlashList<any>> =
    useRef<FlashList<any>>(null);

  useEffect(() => {
    getMovies();
  }, [releaseYear]);

  useEffect(() => {
    getGenres();
  }, []);

  const getGenres = (): void => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {api_key: API_KEY},
      })
      .then(response => {
        const {genres} = response.data;
        if (genres) {
          const updatedGenres = genres.map(
            (item: IGenreData): IGenreData => ({
              ...item,
              isSelected: false,
            }),
          );
          setGenres(updatedGenres);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getMovies = async (): Promise<void> => {
    try {
      const response = await axios.get(
        'https://api.themoviedb.org/3/discover/movie',
        {
          params: {
            api_key: API_KEY,
            sort_by: 'popularity.desc',
            primary_release_year: releaseYear,
            page: 1,
            'vote_count.gte': 100,
          },
        },
      );
      const {results} = response.data;
      !filterSelected ? setMovies([...movies, ...results]) : setMovies(results);
    } catch (error) {
      console.error(error);
    }
  };

  const onFilterItemPress = (genreId): void => {
    // scroll to top on filter selection
    flatlistRef?.current?.scrollToIndex({index: 0});

    const updatedGenres: IGenreData[] = [...genres];
    const getItemIndex: number = updatedGenres.findIndex(
      item => item.id === genreId,
    );
    updatedGenres[getItemIndex].isSelected =
      !updatedGenres[getItemIndex].isSelected;

    const isAnyGenreSelected: boolean = some(genres, {isSelected: true});
    setFilterSelected(isAnyGenreSelected);

    const sortedGenres = [...genres].sort(
      (a, b) => Number(b.isSelected) - Number(a.isSelected),
    );
    setGenres(sortedGenres);

    const idsOfSelectedGenres: Number[] = genres
      .filter(genre => genre.isSelected == true)
      .map(item => item.id);

    // on unselecting filter
    if (!updatedGenres[getItemIndex]?.isSelected) {
      var index: number = idsOfSelectedGenres.indexOf(genreId);
      if (index >= 0) {
        idsOfSelectedGenres.splice(index, 1);
      }

      if (!isAnyGenreSelected) {
        const sortByName = genres.sort((a, b) => a.name.localeCompare(b.name));
        setGenres(sortByName);
      }
    }

    const filteredData: IMovieData[] = filterMoviesByGenre(
      movies,
      idsOfSelectedGenres,
    );

    setFilteredResult(filteredData);
  };

  const filterMoviesByGenre = (movies, genreIds): IMovieData[] => {
    return movies.filter(movie =>
      movie.genre_ids.some(genreId => genreIds.includes(genreId)),
    );
  };

  const fetchMoreData = (): void => {
    if (!loadingMoreData && !filterSelected) {
      setLoadingMoreData(true);
      setReleaseYear(prev => prev + 1);
      setTimeout(() => {
        setLoadingMoreData(false);
      }, 1000);
    }
  };

  const handleSearch = (text: string): void => {
    setSearchText(text);
    const filteredData = searchMoviesByTitle(movies, text);
    setFilteredResult(filteredData);
  };

  const searchMoviesByTitle = (movies, textToSearch) => {
    return movies.filter(movie =>
      movie.title.toLowerCase().includes(textToSearch.toLowerCase()),
    );
  };

  const showEmptyText = (): JSX.Element => (
    <View style={styles.emptyListComponent}>
      <Text style={styles.emptyListText}>No items to show</Text>
    </View>
  );

  const showFooterLoader = (): JSX.Element => (
    <ActivityIndicator
      animating={loadingMoreData}
      size="large"
      color={COLORS.red}
    />
  );

  const renderSectionHeader = (title: string): JSX.Element => {
    return (
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeaderTitle}>{title}</Text>
      </View>
    );
  };

  const renderItemInner = ({item}): JSX.Element => {
    if (typeof item === 'string') {
      return renderSectionHeader(item);
    } else {
      return (
        <Banner
          img={item.poster_path}
          title={item.title}
          rating={item.vote_average}
          preview={item.backdrop_path}
          overview={item.overview}
        />
      );
    }
  };

  const formatMovies = (
    movies: IMovieData[],
  ): Array<string[] | IMovieData[]> => {
    const formattedData: Array<string[] | IMovieData[]> = [];
    const moviesByYear = {};

    movies.forEach((movie: IMovieData) => {
      const year = movie.release_date.split('-')[0];

      if (!moviesByYear[year]) {
        moviesByYear[year] = [];
      }

      const {
        backdrop_path,
        genre_ids,
        id,
        overview,
        poster_path,
        release_date,
        title,
        vote_average,
      } = movie;

      moviesByYear[year].push({
        backdrop_path,
        genre_ids,
        id,
        overview,
        poster_path,
        release_date,
        title,
        vote_average,
      });
    });

    Object.entries(moviesByYear).forEach(([year, movies]) => {
      formattedData.push([year], [...(movies as IMovieData[])]);
    });

    return formattedData;
  };

  const handleSearchIconPress = (): void => {
    setShowSearchInput(!showSearchInput);
    setSearchText('');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.grey} />
      <Header
        onSearchIconPress={handleSearchIconPress}
        searchSelected={showSearchInput}
      />
      {!showSearchInput ? (
        <Genres genres={genres} onFilterItemPress={onFilterItemPress} />
      ) : (
        <SearchInput
          handleSearch={handleSearch}
          onClearPress={(): void => setSearchText('')}
          searchText={searchText}
        />
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <FlashList
          ref={flatlistRef}
          data={
            filterSelected || searchText
              ? formatMovies(filteredResult)
              : formatMovies(movies)
          }
          renderItem={({item}): JSX.Element => {
            return (
              <View style={styles.flex}>
                <FlashList
                  data={item}
                  numColumns={2}
                  renderItem={renderItemInner}
                  estimatedItemSize={71}
                />
              </View>
            );
          }}
          estimatedItemSize={71}
          ListEmptyComponent={showEmptyText}
          onEndReached={fetchMoreData}
          onEndReachedThreshold={Platform.OS == 'android' ? 1 : 0.5}
          ListFooterComponent={showFooterLoader}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    margin: 10,
  },
  emptyListComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: COLORS.white,
    padding: 20,
  },
  sectionHeaderContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  sectionHeaderTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  flex: {
    flex: 1,
  },
});

export default MovieList;
