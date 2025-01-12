import './App.css';
import React from 'react'
import axios from 'axios';
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

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
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_FOUR_SQUARE_ENDPOINT}?ll=${latitude}%2C${longitude}&radius=100`,
      headers: {
        Accept: 'application/json',
        authorization: process.env.REACT_APP_FOUR_SQUARE_TOKEN
      }
    };

    const { data } = await axios.request(options);
    return data;
  }

  return (
    <div className="App">
      <div onClick={buttonClick}>hello</div>
    </div>
  );
}

export default App;
