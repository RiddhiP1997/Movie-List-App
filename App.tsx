import React from 'react';
import MovieList from './src/screens/MovieList';
import MoviePreview from './src/screens/MoviePreview';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import COLORS from './src/styles/Colors';

export type RootStackParamList = {
  MovieList: undefined;
  MoviePreview: {preview: string; title: string; overview: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MovieList">
        <Stack.Screen
          name="MovieList"
          component={MovieList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MoviePreview"
          options={{
            title: 'Preview',
            headerStyle: {
              backgroundColor: COLORS.black,
            },
            headerTintColor: COLORS.white,
            headerBackTitleVisible: false,
          }}
          component={MoviePreview}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
