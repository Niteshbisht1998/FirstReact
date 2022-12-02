import './App.css';
import {useState,useEffect} from 'react'
import axios from "axios"
import React from 'react';
import { useNavigate } from 'react-router-dom';


const App = ()=>{
  const navigate = useNavigate();
  
  const [nameVal,setNameVal] =useState("")
  const [emailVal, setEmailVal] = useState("")
  const [passVal, setPassVal] = useState("")
  const [emailVallogin, setEmailVallogin] = useState("")
  const [passVallogin, setPassVallogin] = useState("")
  const [data, setData] = useState({name:null,email:null, password:null})
  const [datalogin, setDatalogin] = useState({name:null,email:null, password:null})
  const [resp, setResp]  = useState()
  useEffect(()=>{
    setData({name:nameVal,email:emailVal, password:passVal})
  },[nameVal,emailVal, passVal])
  useEffect(()=>{
    setDatalogin({email:emailVallogin, password:passVallogin})
  },[emailVallogin, passVallogin])
  const handlesubmit =async(e)=>{
    e.preventDefault()
    const getapi=async()=>{
         await axios.post("http://localhost:5200/register",{
          data,
          headers:{'Content-Type':'application/json'}
        })
        
    }
    getapi()
    
  }
  const handlesubmitlogin = async(e)=>{
    e.preventDefault()
    
    const getapi = async()=>{
      const result =  await axios.post('http://localhost:5200/login',{datalogin,
    headers:{'Content-type':'application/json'}})
    let resp = result.data.status
    if(resp===200){
      localStorage.setItem('user',JSON.stringify(result.data.UserData))
      localStorage.setItem('token',result.data.auth)
      navigate('/success')
    }
    
    
   
    
    
    
    }
    getapi()
    
    


  }
  
  return (
    <>
    <div>
    <h3>Hello this is react app</h3>
    <form onSubmit={handlesubmit}>
      <h1>This registration form</h1>
      <label>Name</label>
    <input type = "text" value= {nameVal} onChange = {(e)=>{setNameVal(e.target.value)}} />
    <label>Email</label>
      <input type = "email" value= {emailVal} onChange = {(e)=>{setEmailVal(e.target.value)}} /><br/>
      <label >Password</label>
      <input type = "password" value={passVal} onChange = {(e)=>{setPassVal(e.target.value)}}/>
      <button type = "submit"> Submit</button>
    </form>
    <h1>This is login form</h1>
    <form onSubmit={handlesubmitlogin}>
    <label>Email</label>
      <input type = "email" value= {emailVallogin} onChange = {(e)=>{setEmailVallogin(e.target.value)}} /><br/>
      <label>Password</label>
      <input type = "password" value={passVallogin} onChange = {(e)=>{setPassVallogin(e.target.value)}}/>
      <button type = "submit"> Submit</button>
    </form>
    
    </div>
    
    </>
  )
}
export default App;
