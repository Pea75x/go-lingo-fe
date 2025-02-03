import React from 'react'
import { useLocation } from 'react-router-dom';
import { searchPhrases } from '../api/phrases'
import { useNavigate } from 'react-router-dom';

function Phrases() {
  const [phrases, setPhrases] = React.useState({})
  const { state } = useLocation();
  const { location } = state;
  const navigate = useNavigate();

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
      <div 
        className='absolute right-[9%] top-[120px] border-4 border-teal-100 px-4 py-2 rounded-xl font-bold hover:scale-105'
        onClick={() => navigate(`/`)}>
          Return
      </div>
      {phrases.length ? (
        <div className="text-center w-10/12 mx-auto py-8 bg-teal-100 rounded-xl flex flex-wrap justify-around items-center">
          {phrases.map((phrase) => (
            <div key={phrase.id} className="bg-white w-80 h-40 flex flex-col justify-around text-xl border border-4 rounded-xl border-black p-2 m-auto inline-block m-3">
              <div className="font-bold">{phrase.english_phrase}</div>
              <div>{phrase.spanish_phrase}</div> 
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center w-10/12 mx-auto py-8 bg-teal-100 rounded-xl flex flex-wrap justify-around items-center">
          <div className="bg-white w-80 h-40 flex flex-col justify-around text-xl border border-4 rounded-xl border-black p-2 m-auto inline-block m-3">
            No phrases yet!
          </div>
        </div>
      )}
    </div>
  )
}

export default Phrases;