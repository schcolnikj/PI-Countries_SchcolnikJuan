import { useEffect, useState } from "react";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getActivities, clear, LOADER } from "../../redux/actions";
import style from './Home.module.css'



const Home = () => {


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCountries());
        dispatch(getActivities());
        dispatch(clear());
    }, [dispatch]);
    
    
    return (
        <div className={style.image}>
           
            <div>

                <CardsContainer />
             
            </div>
            
        </div>
    )
}

export default Home;