import{
    SEARCH_USERS,
    SET_LOADING,
    SET_TEXT,
    CLEAR_USERS,
    CLEAR_USER,
    GET_USER,
    GET_REPOS
 } from "../types";

 const githubReducer=(state,action)=>{
  
    switch(action.type)
    {   
        case SEARCH_USERS:
            return{
                ...state,
                users:action.payload,
                loading:false
            }
         
        case GET_USER:
            return{
                ...state,
                user:action.payload,
                loading:false
            } 

        case CLEAR_USERS:
           return{
                ...state,
                users:[],
                text:'',
                repos:[],
                user:{},
                loading:false
            }

        case CLEAR_USER:
            return{
                ...state,
                repos:[],
                text:'',
                user:{},
                loading:false
                
            }

        case SET_LOADING:
            return {
                ...state,
                loading:true
            }

        case GET_REPOS:
            return{
                    ...state,
                    repos:action.payload,
                    loading:false                  
            }
            
        case SET_TEXT: 
            return{
                ...state,
                text: action.payload
            }

        default:
            return state;
    }
 }

export default githubReducer;