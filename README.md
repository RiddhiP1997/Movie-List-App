# Movie List App

A React Native application that provides information about movies using The Movie Database (TMDb) API. The app displays top 20 movies for each year, allows users to filter by genre, search and dynamically loads additional movies as the user scrolls through the list.

## Preview

https://github.com/RiddhiP1997/Movie-List-App/assets/56933507/27c0f86b-4025-4c9c-8e7a-5ab61e69485b

## Running the project

- Clone this project
```
git clone https://github.com/RiddhiP1997/Movie-List-App.git
```

- Navigate to the project directory
```
cd Movie-List-App
```

- Install dependencies
```
npm install
```
- To run the project on android run below command and you are good to go!

```
npm run android
```
- To run the project on iOS, an additional step is required, run below command:

```
cd ios && pod install && cd ..
```

- Finally, run below command:

```
npm run ios
```

- You are all set!

> If you wish to run the app using yarn, pls refer [this](https://medium.com/@julien-ctx/how-to-clone-build-and-run-a-react-native-app-from-a-github-repository-7ab781e52a14) article.


## Requirements

### Covered
- Create React Native App.
- Integration of The Movie Database (TMDb) API.
- Display Top 20 movies for each year sorted in descending order of popularity.
- Paginate by loading movies dynamically on scroll up.
- Filter movies by genre.
- Search functionality to find movies by title.
- React Navigation for navigation between preview and movies list screens.
- Preview screen that shows the movie banner image, title and and a short description related to the movie on click of any movie poster.

### Not Covered.
- Infinite scroll for dynamic loading movies when user scrolls down.

