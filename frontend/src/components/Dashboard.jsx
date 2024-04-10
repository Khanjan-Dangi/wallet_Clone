import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios';
import Modal from './Modal';

const Dashboard = () => {

  const [users,setUsers] = useState([]);

  const [balance,setBalance] = useState("Loading....");

  const [modal,setModal] = useState("hidden");

  const [user,setUser] = useState({});

  let timer;

  useEffect(()=>{

    async function fetchData(){
      const response = await axios.get("http://localhost:3000/api/v1/user/users",{
        headers: {
          "authorization": localStorage.getItem("token")
        }
      });

      let user = [];
      
      const data = response.data;

      for(let i=0;i<data.length;i++){
        user.push(data[i]);
      }

      setUsers(user);
    }

    fetchData();

  },[])

  useEffect(()=>{
    getBalance()
  },[])

  const getBalance = async() => {
    const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
      headers: {
        "authorization": localStorage.getItem("token")
      }
    });

    setBalance(response.data.balance.toFixed(2));
  }

  const handleChange = async (e) => {

    clearTimeout(timer);

    timer = setTimeout(sendSeach,400);

      async function sendSeach(){
        const response = await axios.get("http://localhost:3000/api/v1/user/bulk",{
          params: {
            "filter": e.target.value
          },
          headers: {
            "authorization": localStorage.getItem("token")
          }
        });

        setUsers(response.data.users);
      };
  }

  const url = "https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fmeta-q.cdn.bubble.io%2Ff1512936020165x278911292087286720%2FA.png?w=&h=&auto=compress&dpr=1&fit=max"
  return (
    <div className=''>
    <Modal show={modal} userData={user} setShow={setModal} getBalance={getBalance}/>
      <div className='flex border-b-2'>
        <div className='basis-3/4 p-5 font-bold text-3xl'>Payments App</div>

        <div className='flex gap-2 basis-1/4 justify-end pr-10 pt-5 font-normal text-md'>
          <div className='my-2'>Hello, User</div>
          <img src={url} className="h-10 w-10" alt="userImg"/>
        </div>
      </div>

      <div className='flex flex-col py-10 px-5 gap-10'>
        <div className='text-2xl font-semibold'>Your Balance ${balance}</div>

        <div className='flex flex-col gap-5'>
          <input className='boder-solid border-2 p-2 rounded-md border-slate-300' onChange={handleChange} placeholder='Search User....'></input>
        </div>


        <div className='flex flex-col gap-2'>
        <div className='text-2xl'>Users</div>
          {users.map((user,idx)=>{
            return <Card key={idx} userData={user} setShow={setModal} setUser={setUser} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
