import React from 'react'
import { useLocation } from 'react-router-dom';
import { searchPhrases } from '../api/phrases'

function Phrases() {
  const [phrases, setPhrases] = React.useState({})
  const { state } = useLocation();
  const { location } = state;

    React.useEffect(() => {
    const getData = async () => {
      try {
        const allPhrases = await searchPhrases(location);
        setPhrases(allPhrases);
      } catch (error) {
        console.log('error', error);
      }
    };
    getData();
  }, []);
  
  return (
    <div className="text-center font-mono">
      <h1 className="text-5xl my-8">{location}</h1>
      {phrases.length ? (
        <div className="text-center w-10/12 mx-auto py-8 bg-teal-100 rounded-xl">
          {phrases.map((phrase) => (
            <div key={phrase.id} className="bg-white w-80 h-40 flex flex-col justify-between text-xl border border-4 rounded-xl border-black p-2 m-auto inline-block">
              <div className="font-bold">{phrase.english_phrase}</div>
              <div>{phrase.spanish_phrase}</div> 
            </div>
          ))}
        </div>
      ) : (
        <div>Hello?</div>
      )}
    </div>
  )
}

export default Phrases;