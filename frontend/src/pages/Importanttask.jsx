import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'

const Importanttask = () => {
  const [data, setData] = useState()

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }

  const fetchAllTasks = async()=>{
      const response = await axios.get("http://localhost:3000/api/v2/get-important-tasks",{
          headers: headers
      })
      setData(response.data.data);
      
  }

  useEffect(() => {
    fetchAllTasks();
}, [data]);

  return (
    <div>
      <Cards home = {"false"} data = {data} /> 
    </div>
  )
}

export default Importanttask
