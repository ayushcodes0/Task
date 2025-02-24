import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddOutline } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';


const Alltask = () => {
  const [inputDiv, setInputDiv] = useState("hidden")
  const [data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const fetchAllTasks = async()=>{
      const response = await axios.get("http://localhost:3000/api/v2/get-all-tasks",{
          headers: headers
      })
      setData(response.data.data.task);
  }

useEffect(() => {
    fetchAllTasks();
}, [])

  return (
    <>
      <div>
        <div className="flex items-end justify-end p-4">
          <button onClick={()=>setInputDiv("fixed")}><IoAddOutline className='text-3xl text-black bg-zinc-400 rounded-4xl cursor-pointer' /></button>
        </div>
        <Cards setInputDiv = {setInputDiv}  home={"true"} data = {data} fetchAllTasks={fetchAllTasks}/>
      </div>
      <InputData inputDiv = {inputDiv} setInputDiv = {setInputDiv} fetchAllTasks={fetchAllTasks}/>
    </>
  )
}

export default Alltask
