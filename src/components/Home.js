import React from 'react'
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../images/logout.png'

function Home() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate('/login');
  }

  return (
    <div className="text-center font-mono border-b md:flex items-center py-6 bg-teal-100 relative">
      <h1 className="text-4xl font-bold px-5">Go-Lingo</h1>
      <p className="pt-2 text-xl px-5">Connecting places to phrases</p>
      <img src={logoutIcon} className="absolute right-0 m-4 font-xl hover:scale-105" alt="logout" onClick={logout} width="60"/>
    </div>
  )
}

export default Home;
