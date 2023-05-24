import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react'
import Card from "../Card/Card";
import style from './CardsContainer.module.css';
import { Paginado } from '../Paginado/Paginado';
import { filterByContinent, orderByName, orderByPopulation, filterByActivity } from "../../redux/actions";


const CardsContainer = () => {
  
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const dispatch = useDispatch()

    const countries = useSelector(state => state.countries)
    const { activities } = useSelector((state) => state);

    const lastCountryIndex = currentPage * countriesPerPage;
    const firstCountryIndex = lastCountryIndex - countriesPerPage;

    const currentCountries = countries.slice(firstCountryIndex, lastCountryIndex)

      
  const filtroActivity = activities.map((activity) => activity.name);
  const uniqueActivities = [...new Set(filtroActivity)];

    

    const [orden, setOrden] = useState('')
    let [input, setInput] = useState(1)

    const filterHandler = (event) => {
        dispatch(filterByContinent(event.target.value))
        setCurrentPage(1);
    }

    const sortNameHandler = (event) => {
        dispatch(orderByName(event.target.value))
        setOrden(`Ordenado ${event.target.value}`)
        setCurrentPage(1);
    }

    const sortPopulationHandler = (event) => {
        dispatch(orderByPopulation(event.target.value))
        setOrden(`Ordenado ${event.target.value}`)
        setCurrentPage(1);
    }

    const handleSelectActivity = (event) => {
        dispatch(filterByActivity(event.target.value));
        setInput(1);
        setCurrentPage(1);
      }

      
      
    return (
        <div>
            {countries.length === 0
            ?
            <div className={style.bkground}>
            <div className={style.wrapper}>
                <div className={style.circle}></div>
                <div className={style.circle}></div>
                <div className={style.circle}></div>
                <div className={style.shadow}></div>
                <div className={style.shadow}></div>
                <div className={style.shadow}></div>
            </div>
        </div>
        
            :

            <div className={style.container}>
                
            

                <div className={style.filtros}>
                        <select className={style.alfabetico} onChange={event => sortNameHandler(event)}>
                            <option value='all'>Alfabéticamente</option>
                            <option value='asc' >Ascendente</option>
                            <option value='des' >Descendente</option>
                        </select>

                        <select 
                        className={style.poblacionContinent} 
                        onChange={event => sortPopulationHandler(event)}
                        >
                            <option value='all'>Población</option>
                            <option value='asc' >Ascendente</option>
                            <option value='des' >Descendente</option>
                        </select>

                        <select
                            className={style.poblacionContinent} 
                            onChange={event=> filterHandler(event)}
                        >
                            <option value='All' >Todos los continentes</option>
                            <option value='Africa' >África</option>
                            <option value='South America' >Sudamérica</option>
                            <option value='North America' >Norteamérica</option> 
                            <option value='Asia' >Asia</option>
                            <option value='Europe' >Europa</option>
                            <option value='Oceania' >Oceanía</option>
                            <option value='Antarctica' >Artántida</option>
                        </select>

                        <select 
                        className={style.actividad}
                        onChange={(event) => handleSelectActivity(event)}
                        >
                            <option value="All">Actividad</option>
                            {uniqueActivities.map((item) => (
                                <option value={item} key={item}>
                                {item}
                                </option>
                            ))}
                        </select>

                </div>
                
                <div className={style.cardsContainer}>
                {currentCountries.map((country) => {
                    return <Card 
                    id = {country.id}
                    flag = {country.flags}
                    name = {country.name}
                    continent = {country.continents}/>
                })}
                </div>

                <div className={style.paginado}>
                    <Paginado 
                        totalCountries= {countries.length} countriesPerPage = {10} 
                        setCurrentPage={setCurrentPage} 
                        currentPage={currentPage}
                    />
                </div>
            
            </div>
            
            }

        </div>
    )
    
}

export default CardsContainer;