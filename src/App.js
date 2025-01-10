import './App.css';
import React from 'react'
import axios from 'axios';

function App() {
  function buttonClick() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchPlaces(position.coords.latitude, position.coords.longitude)
      },
      (error) => {
        console.error("error getting location: ", error.message)
      }
    )
  }

  async function searchPlaces(latitude, longitude) {
    const endpoint = `https://api.foursquare.com/v3/places/search`;

    const response = await fetch(
      `${endpoint}?ll=${latitude}%2C${longitude}&radius=100`
    )

    const data = await response.json();
    console.log("Nearby Places:", data);
  }

  return (
    <div className="App">
      <div onClick={buttonClick}>hello</div>
    </div>
  );
}

export default App;
