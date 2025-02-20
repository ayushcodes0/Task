import React, { useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddOutline } from "react-icons/io5";
import InputData from '../components/Home/InputData';


const Alltask = () => {
  const [inputDiv, setInputDiv] = useState("hidden")
  return (
    <>
      <div>
        <div className="flex items-end justify-end p-4">
          <button onClick={()=>setInputDiv("fixed")}><IoAddOutline className='text-3xl text-black bg-zinc-400 rounded-4xl cursor-pointer' /></button>
        </div>
        <Cards setInputDiv = {setInputDiv}  home={"true"}/>
      </div>
      <InputData inputDiv = {inputDiv} setInputDiv = {setInputDiv}/>
    </>
  )
}

export default Alltask
