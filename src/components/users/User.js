import React, { Fragment,useContext,useEffect} from 'react';
import Spinner from '../layout/Spinner';
import Repos from '../repos/Repos';
import {Link} from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User =({match})=> {

    const githubContext=useContext(GithubContext);
    const {getUser,user,loading,getUserRepos,repos,clearUser}=githubContext;

    useEffect(()=>{
         getUser(match.params.login);
        getUserRepos(match.params.login);
         //eslint-disable-next-line   
    },[]);

    const {
            name,
            company,
            avatar_url,
            location,
            bio,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        }=user;

        
        if(loading)
        {
            <Spinner/>
        }

        return (
            <Fragment>
                <Link to='/' onClick={clearUser} className='btn btn-light'>Back to Search</Link>
                Hireable: {'  '}
                {hireable? <i className="fas fa-check text-success"/>: <i className="fas fa-times-circle text-danger"/>}
        
                 <div className='card grid-2'>

                    <div className='all-center'>
                        <img src={avatar_url} alt="user_photo" className='round-img' style={{width:'150px'}} />
                        <h1>{name}</h1>
                        {location && <p>Location: {location}</p>} 
                </div>

                <div>
                    {bio && <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
            
            </Fragment>}

                    <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>
                    
                     <ul>
                        <li>
                                {login && <Fragment>
                                <strong>Username: </strong> {login}
                                </Fragment>}
                        </li>

                        
                        <li>
                                {company && <Fragment>
                                <strong>Company: </strong> {company}
                                </Fragment>}
                        </li>
                        
                        <li>
                                {blog && <Fragment>
                                <strong>Website: </strong> {blog}
                                </Fragment>}
                        </li>
                    </ul>
            </div>
        </div>
        
        <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-danger">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
        </div>
            <Repos repos={repos}/>
        </Fragment>
        );       
  }

export default User;
