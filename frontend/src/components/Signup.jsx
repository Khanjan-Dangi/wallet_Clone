import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

function Signup() {

    const navigate = useNavigate();

    const [data,setData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: ""
    });

    const handlePress = (e) => {
        setData({...data,[e.target.name]: e.target.value});

    }

    const handleClick = async(e) => {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password
        })

        if(response.status == 200) {
            localStorage.setItem("token","Bearer " + response.data.token)
            navigate("/dashboard");
        }else{
            e.preventDefault();
        }
    }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-slate-400'>
        <div className='bg-slate-700 p-10 rounded-md flex flex-col gap-5 text-slate-50 text-md'>
        <div className='text-center text-2xl font-bold'>Sign Up</div>
        <div className='text-lg'>Enter your information to create an account.</div>

        <div className='flex flex-col gap-2'>
            <div className='font-semibold'>First Name</div>
            <input type='text' onChange={handlePress} placeholder='John' className='p-2 rounded-md text-slate-900' name='firstName' />
        </div>

        <div className='flex flex-col gap-2'>
            <div className='font-semibold'>Last Name</div>
            <input type='text' onChange={handlePress} placeholder='Doe' className='p-2 rounded-md text-slate-900' name='lastName'/>
        </div>

        <div className='flex flex-col gap-2'>
            <div className='font-semibold'>Email</div>
            <input type='email' onChange={handlePress} placeholder='example@gmail.com' className='p-2 rounded-md text-slate-900' name="username"/>
        </div>

        <div className='flex flex-col gap-2'>
            <div className='font-semibold'>Password</div>
            <input type='password' onChange={handlePress} placeholder="********" className='p-2 rounded-md text-slate-900' name="password"/>
        </div>

        <Link className='flex mt-3 items-center justify-center bg-sky-600 text-slate-50 p-2 rounded-md'><button onClick={handleClick}>Sign Up</button></Link>

        <div className='flex items-center justify-center'>Already have an account? <Link to='/signin' className='underline underline-offset-1 mx-2'>Login</Link></div>
        </div>
    </div>
  )
}

export default Signup;  
