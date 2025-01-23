import React from 'react'

function Button({onClick, text}) {
  return (
    <div 
      onClick={onClick} 
      className='m-2 border border-black rounded-lg inline-block p-4 text-2xl shadow-[5px_5px_5px_0_rgba(0,0,0,0.7)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.7)] hover:transform hover:translate-x-1 hover:translate-y-1 transition ease-in-out bg-teal-300'>
      {text}
    </div>
  )
}

export default Button;
