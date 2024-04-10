import axios from 'axios';
import React from 'react'

const Card = ({setShow,setUser,userData}) => {
    
  const url = "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fmeta-q.cdn.bubble.io%2Ff1512936020165x278911292087286720%2FA.png?w=&h=&auto=compress&dpr=1&fit=max";

  const handleClick = async() => {
      setUser(userData);
      setShow("none");
    }

  return (
    <div>
      <div className='flex border-solid border-2 p-3 gap-5'>
          <img src={url} className='h-10 w-10 ' alt="hello"/>
          <div className='basis-9/12 my-auto'>{userData.firstName}</div>
          <button className='flex ml-auto justify-end my-auto bg-black p-2 rounded-md text-pink-50' onClick={handleClick}>Send Money</button>
      </div>
    </div>
  )
}

export default Card
