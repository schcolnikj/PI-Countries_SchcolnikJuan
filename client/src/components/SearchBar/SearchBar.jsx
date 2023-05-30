import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_COUNTRY_BY_NAME, getCountryByName } from '../../redux/actions';
import style from './SearchBar.module.css'

const SearchBar = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState('');

    const onChangeHandler =  (event) =>{
        const value = event.target.value
        setName(value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(getCountryByName(name))
        setName('')
    }

    return(
        <div className={style.search}>
            <input 
                className={style.input}
                type="text"
                name = 'search'
                value={name}
                placeholder='Search...'
                onChange={event => onChangeHandler(event)}
            />
            <button 
            className={style.button}
            type='submit' 
            onClick={(event) => submitHandler(event)}
            >Search</button>
            
        </div>
    )


}


export default SearchBar;