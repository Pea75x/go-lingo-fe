# Go-Lingo project

### Technologies used

- JavaScript
- React
- GoogleMaps API

The aim of Go-Lingo is to provide the user with relevant phrases based on their location, Eg. If they are at a coffee shop they will be given useful phrases on how to order a coffee.

<img src="./readme/locate-user.png" alt='locate user' width="300" />

1. Once you click **locate**, it will take your geolocation coordinates and set them in the Googlemaps API. Googlemaps is only used for visual effect to show where you are on the map, and not used in the logic.

2. We then call my backend API to fetch locations, and provide it with the geolocation coordinates too. It returns an array of location names that are within 100m radius. We present this list as options for the user to choose.

<img src="./readme/choose-location.png" alt='locate user' width="300" />

3. Once the user has chosen a location, we will then call the backend again to fetch phrases based on the location name.

<img src="./readme/phrases.png" alt='locate user' width="300" />

### To do
1. Update previous locations button into a dropdown

2. Add tests

3. Deploy project to production

4. Configure continuous integration


