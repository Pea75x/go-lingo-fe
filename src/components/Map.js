import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import Button from './Button'
import DropdownButton from './DropdownButton'
import { useNavigate } from 'react-router-dom';
import alien from '../images/alien.png'
import alienBackground from '../images/alien-background.png'
import explorer from '../images/explorer.png'
import explorerBackground from '../images/explorer-background.png'
import { searchLocation } from '../api/phrases'
import { getUser } from '../api/auth'

function Map() {
  const [coordinates, setCoordinates] = React.useState({});
  const [localLocations, setLocalLocations] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [previousLocations, setPreviousLocations] = React.useState([])
  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      try {
        const userData = await getUser()
        setPreviousLocations(userData.locations)
      } catch(error) {
        console.log(error)
      }
    }
    getData();
  }, [])

  function locateUser() {
    setErrorMessage("")
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
    try {
      const data = await searchLocation(latitude, longitude)
      setLocalLocations(data.locations);

      if(data.locations.length < 1) {
        setErrorMessage("Cannot find nearby locations")
      }
      console.log("search locations data:", data)
    } catch(error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  function getLocationPhrases(location) {
    navigate(`/phrases`, {state: { location: location }} )
  }

  return (
    <div className="pt-5 text-center font-mono">
      <div className='relative'>
        {!!errorMessage && <div className="absolute z-[100] top-[290px] left-1/2 transform -translate-x-1/2 text-red-600 font-bold text-xl w-[380px] bg-red-100 rounded-full border-2 border-red-600">{errorMessage}</div>}
        <img src={explorer} width="130px" className="absolute left-[calc(50%-65px)] top-[100px] z-50"/>
        <div className='h-[380px]'>
          {coordinates.lat && coordinates.lng ? 
            (<LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_TOKEN}>
              <GoogleMap
                mapContainerStyle={{
                  width: '380px',
                  height: '380px',
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
              <div style={{backgroundImage: "url(" + explorerBackground + ")"}} className={`h-[380px] w-[380px] m-auto bg-cover z-20 absolute relative top-0 ${isLoading && "spin-slow"}`}></div>
            )
          }
        </div>
      </div>
      {
        localLocations && localLocations.length > 0 ? (
          <div>
            <p className='md:text-lg text-m'>Which nearby location would you like phrases for?</p>
            <div className={`flex lg:flex-row flex-col justify-center w-10/12 mx-auto`}>
              {
                localLocations.map((location) => (
                  <Button key={location} onClick={() => getLocationPhrases(location)} text={location} classes='w-full lg:w-[170px]'/>
                ))
              }
            </div>
          </div>
        ) : (
          <div className='relative'>
            <div className="w-[500px] m-auto flex justify-center">
              <Button onClick={locateUser} text="Locate" classes="w-[150px]"/>
              { previousLocations.length > 0 && <DropdownButton onClick={locateUser} text="Previous locations" classes="w-[300px]" otherOptions={previousLocations} dropdownAction={getLocationPhrases}/>}
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Map;
