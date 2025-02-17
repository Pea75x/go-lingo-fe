import React from 'react'
import arrow from '../images/arrow.png'

function DropdownButton({text, classes, otherOptions = [], dropdownAction}) {
  const [optionsVisible, setOptionsVisible] = React.useState(false)
  
  return (
    <div className="flex flex-col justify-center items-center">
      <div 
        className={`${classes} flex justify-between items-center m-2 border border-black rounded-lg inline-block shadow-[5px_5px_5px_0_rgba(0,0,0,0.7)] hover:shadow-[0_0_0_0_rgba(0,0,0,0.7)] hover:transform hover:translate-x-1 hover:translate-y-1 transition ease-in-out bg-teal-300`}>
        <div className={`${text.length > 7 ? 'text-[22px]' : 'text-[25px]'} leading-[70px] pl-2`}>{text}</div>
        <img src={arrow} width="30px" className={`mr-3 ${optionsVisible && "rotate-180"} transition ease-in-out`} onClick={() => setOptionsVisible(!optionsVisible)}/>
        
      </div>
    {!!optionsVisible && (
      <div className={`bg-teal-200 rounded-xl ${classes} md:max-h-[80px] md:overflow-scroll`}>
        {otherOptions.map((option) => (
          <div key={option.location.name} className="hover:scale-105 hover:font-bold" onClick={() => dropdownAction(option.location.name)}>{option.location?.name}</div>
        ))}
      </div>)
    }
    </div>
  )
}

export default DropdownButton;
