import React from 'react'
import axios from 'axios'
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import Button from './Button'
import { useNavigate } from 'react-router-dom';
import alien from './images/alien.png'
import alienBackground from './images/alien-background.png'
import explorer from './images/explorer.png'
import explorerBackground from './images/explorer-background.png'

function Map() {
  const [coordinates, setCoordinates] = React.useState({});
  const [localLocations, setLocalLocations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)
  const navigate = useNavigate();

  function locateUser() {
    setIsLoading(true)
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
        setIsLoading(false)
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
    setIsLoading(false)
  }

  return (
    <div className="pt-5 text-center font-mono">
      <div className='relative'>
        <img src={explorer} width="130px" className="absolute left-[calc(50%-65px)] top-[100px] z-50"/>
        <div className='h-[400px] my-2'>
          {coordinates.lat && coordinates.lng ? 
            (<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}>
              <GoogleMap
                mapContainerStyle={{
                  width: '400px',
                  height: '400px',
                  margin: 'auto',
                  borderRadius: '200px',
                  zoomControl: false,
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false, 
                }}
                center={coordinates}
                zoom={17}
                tilt={90}
              >
              </GoogleMap>
            </LoadScript>) : (
              <div style={{backgroundImage: "url(" + explorerBackground + ")"}} className={`h-[400px] w-[400px] m-auto bg-cover z-20 absolute relative top-0 ${isLoading && "spin-slow"}`}></div>
            )
          }
        </div>
      </div>
      {
        localLocations.length > 0 ? (
          <div>
            <p className='text-lg'>Which nearby location would you like phrases for?</p>
            <div className='flex w-[500px] mx-auto'>
              {
                localLocations.map((location) => (
                  <Button key={location} onClick={() => navigate(`/phrases`, {state: { location: location }} )} text={location} classes='w-full'/>
                ))
              }
            </div>
          </div>
        ) : (
          <div className="w-[500px] m-auto flex justify-between">
            <Button onClick={locateUser} text="Locate" classes="w-[150px]"/>
            <Button onClick={locateUser} text="Previous locations" classes="w-[300px]"/>
          </div>
        )
      }
    </div>
  );
}

export default Map;
