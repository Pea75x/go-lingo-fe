import React from 'react'

function Button({onClick, text, classes}) {

  return (
    <div 
      onClick={onClick} 
      className={`${classes} m-2 border border-black rounded-lg inline-block py-4 ${text.length > 7 ? 'text-[22px]' : 'text-[25px]'} shadow-[5px_5px_5px_0_rgba(0,0,0,0.7)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.7)] hover:transform hover:translate-x-1 hover:translate-y-1 transition ease-in-out bg-teal-300`}>
      {text}
    </div>
  )
}

export default Button;
