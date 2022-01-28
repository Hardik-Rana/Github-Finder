import React, { useContext } from 'react';
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';

const Users=()=> {

  const githubContext=useContext(GithubContext);
    const {loading,users,text}=githubContext;

  if(loading)
  {
    return <Spinner/>
  }

  else if(users.length===0 && text!==''){
      return <div  className="alert alert-danger text-center">
         <i className="fas fa-user-times"/>  User Not Found!
        </div>;
  }

  else
  {
    return  <div style={userStyle}>
      {users.map(user=>(
        <UserItem key={user.id} user={user}/>
      ))}
    </div>;
    }  
}
  
const userStyle={

  display:'grid',
  gridTemplateColumns: 'repeat(3,1fr)',
  gridGap:'1rem'
}

export default Users;
