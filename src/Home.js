import React, { useEffect } from 'react'
import {useState} from 'react'
import axios from 'axios'

const Home = () => {
  const [value, setValue] = useState("")
  const auth = localStorage.getItem('token');
  const handlesubmit = async(e)=>{
    e.preventDefault();
    const result = await axios.get('http://localhost:5200/search',{
      headers:{
        'Content-type':'application/json',
        'authorization':"bear "+auth
      },
      
    })
    console.log("this is result for search api", result)
    

  }
  return (
    <div>
      {auth?<div><h1>This is our home page as you have logged in succesffully</h1>
      <form onSubmit={handlesubmit}>
      <input type ="text" value = {value} onChange={(e)=>setValue(e.target.value)}/>
      <button type = "submit">submit</button>
      </form>
      
      </div>:<h1>you are not logged in</h1>}
        
    </div>
  )
}
export default Home;
