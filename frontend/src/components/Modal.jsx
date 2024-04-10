import axios from 'axios';
import React, { useState } from 'react'

const Modal = ({show,setShow,userData,getBalance}) => {

    const [amount,setAmount] = useState(0);

    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    async function handleClick(){

        setShow("hidden");

        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
            to: userData._id,
            amount: amount,
        },{
        headers: {
            "authorization": localStorage.getItem("token"),
            }
        }); 

        if(response.status == 200) getBalance();

        console.log(response);
    }

  return (
    <div className={`flex fixed justify-center items-center inset-0 bg-opacity-25 bg-black backdrop-blur-sm ${show}`}>
      <div className='w-1/3 bg-slate-400 p-5 rounded-xl'>
        <div className='flex flex-col gap-3'>
            <div className='font-bold text-2xl'>Sending Money To {userData.firstName}</div>

            <div className='text-xl'>Enter Transfer Amount :</div>
            <input className="p-2 rounded-md" type='text' placeholder='$' onChange={handleChange}/>

            <button className='bg-black w-3/12 mx-auto text-white rounded-md p-2' onClick={handleClick}>Transfer</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
