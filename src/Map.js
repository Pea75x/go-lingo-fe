import React from 'react'
import axios from 'axios'
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import explorer from './images/explorer.png'
import Button from './Button'
import { useNavigate } from 'react-router-dom';

function Map() {
  const [coordinates, setCoordinates] = React.useState({});
  const [localLocations, setLocalLocations] = React.useState([]);
  const navigate = useNavigate();

  function locateUser() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        // getLocations(position.coords.latitude, position.coords.longitude)
        getLocations(50.716295, -1.875676)
      },
      (error) => {
        console.error("error getting location: ", error.message)
      }
    )
  }

  async function getLocations(latitude, longitude) {
    const options = {
      method: 'GET',
      url: `${process.env.REACT_APP_API_ENDPOINT}/get_locations_by_coordinates?lat=${latitude}&long=${longitude}`,
      headers: {
        Accept: 'application/json'
      //   authorization: process.env.REACT_APP_API_ENDPOINT
      }
    };

    const { data } = await axios.request(options);
    setLocalLocations(data.locations);
  }

  return (
      <div className="text-center font-mono">
        <h1 className="text-4xl my-6">Go-Lingo</h1>
        <img src={explorer} width="100px" className="absolute left-[calc(50%-50px)] top-[250px] z-50"/>
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
        {
          localLocations.length > 0 ? (
            <div>
              <p>Click on the location you would like phrases for</p>
              {
                localLocations.map((location) => (
                  <Button key={location} onClick={() => navigate(`/phrases`, {state: { location: location }} )} text={location}/>
                ))
              }
            </div>
          ) : (
            <Button onClick={locateUser} text="locate"/>
          )
        }
      </div>
  );
}

export default Map;
