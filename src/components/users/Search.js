import React, {useContext, useState} from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search =()=>{
    
    const  githubContext=useContext(GithubContext);
    const  alertContext=useContext(AlertContext);
    const [text,setText]=useState('');
    
    const onChange= e => setText(e.target.value);
    
    const clear=()=>{
        githubContext.clearUsers();
        setText('');
    }
    
    const onSubmit= e => {
        e.preventDefault();
           
        if(text ==='')
        {
            alertContext.setAlert('Please enter something!', 'light' );
        }
        else{
            githubContext.searchUsers(text);
            }
    }
    
    return <div>
    <form  onSubmit={onSubmit} className='form'>
        <input type="text" name="text" autoComplete='off' value={text} spellCheck="false" onChange={onChange} placeholder="Search Users..." />
        <input type="submit" value="Search" className='btn btn-dark btn-block' />
        </form>
        {githubContext.users.length>0 && ( <button className="btn btn-light btn-block" onClick={clear}>Clear</button>) }
        {githubContext.users.length === 0 && githubContext.text!=='' && ( <button className="btn btn-light btn-block" onClick={clear}>Clear</button>) }
    </div>
  }

export default Search;
