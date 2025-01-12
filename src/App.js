import React from 'react'
import axios from 'axios';
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import girl from './images/girl.png'

function App() {
  const [coordinates, setCoordinates] = React.useState({});
  const [localData, setLocalData] = React.useState({})

  function buttonClick() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
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
    setLocalData(data);
    console.log(data)
  }

  return (
      <div className="text-center font-mono">
        <h1 className="text-4xl my-6">Go-Lingo</h1>
        <img src={girl} width="100px" className="absolute left-[calc(50%-50px)] top-[250px] z-50"/>
        <div className='h-[400px] my-2'>
          {coordinates.lat && coordinates.lng && 
            <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}>
              <GoogleMap
                mapContainerStyle={{
                  width: '50%',
                  height: '400px',
                  margin: 'auto',
                  borderRadius: '5px',
                  border: '1px solid black'
                }}
                center={coordinates}
                zoom={20}
                tilt={90}
              >
              </GoogleMap>
            </LoadScript>
          }
        </div>
        <div onClick={buttonClick} className='my-2 border border-black rounded-lg inline-block p-4 text-2xl shadow-[5px_5px_5px_0_rgba(0,0,0,0.7)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.7)] hover:transform hover:translate-x-1 hover:translate-y-1 transition ease-in-out bg-teal-300'>Locate</div>
      </div>
  );
}

export default App;
