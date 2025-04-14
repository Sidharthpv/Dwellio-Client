import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { getAllUsersAPI } from '../services/allAPI';

function Users() {

    const[users,setUsers] = useState([])

    const fetchAllUsers = async()=>{
        const token = sessionStorage.getItem("token")
        if(token){
            const reqHeader = {
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }

            try{
                const result = await getAllUsersAPI(reqHeader)
                console.log(result.data);
                if(result.status==200){
                    setUsers(result.data.users)
                }
            }catch(err){
                console.log(err);
                
            }
        }
    }

    useEffect(()=>{
      fetchAllUsers()
    },[])

  return (
    <div style={{backgroundColor:'#124559',height:'100vh',margin:'0',paddingTop:'20px'}}>
      <h1 className='text-light ms-4'>All Users</h1>

      <div className="row">
        <div className="col-2"></div>
        <div className="col-8 container d-flex flex-row justify-content-evenly">
        {users.map((user)=>(
          <Card style={{ width: '13rem',backgroundColor:'#598392' }}>
            <img width={"100px"} height={"100px"} src="./src/assets/user.png" alt="" className='align-self-center mt-2'/>
            <Card.Body>
              <Card.Text>
                <p className='text-center'>{user?.name}</p>
                <p className='text-center'>{user?.email}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          )
          )}
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  )
}

export default Users
