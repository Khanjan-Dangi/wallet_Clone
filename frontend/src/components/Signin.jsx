import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signin = () => {

  const [data,setData] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate();

  function handleChange(e){
    setData({...data,[e.target.name]: e.target.value});
  }

  async function handleClick(){
    const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
            username: data.username,
            password: data.password
    })

    if(response.status == 200){
      localStorage.setItem("token","Bearer " + response.data.token)
      navigate('/dashboard');
    }
  }

  return (
    <div className='flex flex-col h-screen items-center content-center bg-slate-400'>
      <div className='m-auto bg-slate-700 text-slate-50 p-5 rounded-md flex flex-col gap-5 text-md'>
        <div className='text-center text-2xl font-bold'>Sign In</div>
        <div className='text-lg'>Enter your credentials to access your account.</div>

        <div className='flex flex-col gap-2'>
          <div className='font-semibold'>Email</div>
          <input type='email' onChange={handleChange} name='username' placeholder='example@email.com' className='p-2 rounded-md text-slate-900'></input>
        </div>

        <div className='flex flex-col gap-2'>
          <div className='font-semibold'>Password</div>
          <input type='password' onChange={handleChange} name="password" className='p-2 rounded-md text-slate-900'></input>
        </div>

        <Link className='flex mt-3 items-center justify-center bg-sky-600 text-slate-50 p-2 rounded-md'><button onClick={handleClick}>Sign In</button></Link>
        
        <div className='flex items-center justify-center'>Don't have an account? <Link to="/signup" className='underline underline-offset-1 mx-2'>Sign Up</Link></div>
      </div>
    </div>
  )
}

export default Signin
