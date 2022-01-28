import React, {useReducer} from "react";
import  axios  from "axios";
import  GithubContext  from "./githubContext";
import GithubReducer from "./githubReducer";
import{
     SEARCH_USERS,
     SET_LOADING,
     SET_TEXT,
     CLEAR_USERS,
     CLEAR_USER,
     GET_USER,
     GET_REPOS
  } from "../types";

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
  githubClientId =process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret= process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
else{
  githubClientId =process.env.GITHUB_CLIENT_ID;
  githubClientSecret= process.env.GITHUB_CLIENT_SECRET;
}

const GithubState=props=>{

    const initialState={
        users:[],
        user:{},
        repos:[],
        loading: false,
        text:''
    }
  
    const [state,dispatch]=useReducer(GithubReducer,initialState);

    //Search Users
      const searchUsers=async text=>{

        setText(text);
        setLoading();
    
        const res= await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`);
      
        dispatch({
            type:SEARCH_USERS,
            payload:res.data.items  
        });
        
      }

    //Get User
      const getUser=async username =>{
        setLoading();
    
        const res= await axios.get(`https://api.github.com/users/${username}?&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`);
    
       dispatch({type:GET_USER, payload:res.data});
    }
    
    //Get Repos
      const getUserRepos=async username =>{
        setLoading();
        const res= await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&
        client_secret=${githubClientSecret}`);
        dispatch({type:GET_REPOS,payload:res.data});
      }
    
    //Clear Users
      const clearUsers=()=> dispatch({type:CLEAR_USERS});
    
    //Clear User
      const clearUser=()=> dispatch({type:CLEAR_USER});

    //Set Loading
      const setLoading=()=> dispatch({type:SET_LOADING});

    //Set Text
      const setText=(text)=> dispatch({type:SET_TEXT , payload:text});

    return <GithubContext.Provider 
    value={
        {
            users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            text:state.text,
            searchUsers,
            clearUsers,
            clearUser,
            getUser,
            getUserRepos
        }
    } 
    >
      {props.children}

    </GithubContext.Provider>
}

export default GithubState;