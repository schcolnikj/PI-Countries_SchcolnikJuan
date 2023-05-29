import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createActivity, getCountries } from "../../redux/actions";
import { useHistory } from 'react-router-dom';
import style from './Form.module.css'

const Form = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const countries = useSelector((state) => state.countries)

    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
    });

    const [errors, setErrors] = useState({  
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: [],
    });

    // const[mostrarError, setMostrarError] = useState(false)

    useEffect(() => {
    dispatch(getCountries());
    }, [dispatch]);


    const handleChange = (event) => {
        setInput({
            ...input, 
            [event.target.name]: event.target.value,
          });

          setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
    }

    const handleSeasonSelect = (event) => {
        setInput({
            ...input, 
            [event.target.name]: event.target.value,
          });

          setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
    }

    const handleCountrySelect = (event) => {
        if (input.countries.includes(event.target.value)) {
            console.log("You can not repeat the same country");
          } else {
            setInput({
              ...input,
              countries: [...input.countries, event.target.value],
            });
          }

            setErrors(validate({
                ...input,
                [event.target.name]: event.target.value
              }));
        //   }
    }

    const handleRemove = (event) => {
        setInput({
            ...input,
            countries: input.countries.filter(
              (country) => country !== event.target.value
            ),
          });
    }

    const handleChoose = (event) => {
        setInput({
            ...input,
           [ event.target.name] : event.target.value
        })

        setErrors(validate({
            ...input,
            [event.target.name]: event.target.value
          }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
      
        dispatch(createActivity(input));
        alert(`Your activity ${input.name} has been created succesfully!`)
        setInput({
        name: "",
        difficulty: 0,
        duration: "",
        season: "",
        countries: [],
        });
        history.push('/home')
    }   

    const validate = (input) => {
        let errors = {};
        const { name, difficulty, countries, season, duration } = input
        if(!name.trim() ||
        !/^[a-zA-Z áéíóúÁÉÍÓÚñÑ\s]*$/.test(name) ||
        name.length < 3){
            errors.name = 'Your name must be 3 letters long!' 
        }else if(!difficulty) {
            errors.difficulty = 'You must choose a difficulty for your activity!'
        }else if(!duration){
            errors.duration = 'You need to set a duration time!'
        }else if(!season){
            errors.season = 'You need to select one of the seasons!'
        }else if(countries.length < 1){
            errors.countries = 'You must select one or more countries for your activity!'
        }

        
        return errors
    }

    return(
        <div className={style.imagen}>
            <div className={style.formBox}>
                <h1 className={style.h1}>create your activity</h1>
                <form onSubmit={(event) => handleSubmit(event)}>

                    <div className={style.nameContainer}>
                        <label className={style.label}>Activity </label>
                        <input 
                            // placeholder="Activity Name"
                            type="text"
                            value={input.name}
                            name = 'name'
                            className={style.nameInput}
                            onChange={(event) => handleChange(event)}
                            required
                        />
                        {errors.name && (<span className={style.error}>{errors.name}</span>)}
                    </div>

                    <div className={style.difficultyContainer}>
                    <label htmlFor="difficulty" className={style.label}>Difficulty</label>
                    <div>
                        <label className={style.difficultyLabel}>1</label>
                        <input 
                        className={style.difficultyInput}
                        type="radio"
                        value= '1'
                        id="1" 
                        name = 'difficulty'
                        onChange={(event) => handleChoose(event)}
                        required
                        />
                        <label className={style.difficultyLabel}>2</label>
                        <input 
                        className={style.difficultyInput}
                        type="radio"
                        value= '2' 
                        id="2"
                        name = 'difficulty'
                        onChange={(event) => handleChoose(event)}
                        required
                        />
                        <label className={style.difficultyLabel}>3</label>
                        <input 
                        className={style.difficultyInput}
                        type="radio"
                        value= '3' 
                        id="3"
                        name = 'difficulty'
                        onChange={(event) => handleChoose(event)}
                        required
                        />
                        <label className={style.difficultyLabel}>4</label>
                        <input 
                        className={style.difficultyInput}
                        type="radio"
                        value= '4' 
                        id="4"
                        name = 'difficulty'
                        onChange={(event) => handleChoose(event)}
                        required
                        />
                        <label className={style.difficultyLabel}>5</label>
                        <input 
                        className={style.difficultyInput}
                        type="radio"
                        value= '5' 
                        id="5"
                        name = 'difficulty'
                        onChange={(event) => handleChoose(event)}
                        required
                        />
                        
                        </div>
                    </div>
                        {errors.difficulty && (<span className={style.error}>{errors.difficulty}</span>)}

                    <div className={style.durationContainer}>
                        <label htmlFor="Duration" className={style.label}>Duration: </label>
                        <input 
                        type="time"
                        name="duration" 
                        value={input.duration}
                        min="00:01"
                        max="23:59"
                        className={style.durationInput}
                        onChange={(event) => handleChange(event)}
                        required
                        />
                        {errors.duration && (<span className={style.error}>{errors.duration}</span>)}
                    </div>

                    <div className={style.seasonContainer}>
                    <label htmlFor="season" className={style.label}>Season: </label>
                        <select
                        className={style.seasonSelect} 
                        name="season" 
                        id="season"
                        placeholder="Select a season..."
                        onChange={(event) => handleSeasonSelect(event)}
                        required
                        >
                            
                            <option>Select a season...</option>
                            <option value="Summer" className={style.seasonOption}>Summer</option>
                            <option value="Autum"  className={style.seasonOption}>Autum</option>
                            <option value="Winter" className={style.seasonOption}>Winter</option>
                            <option value="Spring" className={style.seasonOption}>Spring</option>
                        </select>
                        
                        {errors.season && (<span className={style.error}>{errors.season}</span>)}
                    </div>

                    <div className={style.countriesContainer}>
                    <label htmlFor="countries" className={style.label} >Country</label>
                        <select 
                        name="countries" 
                        id="countries"
                        className={style.countriesSelect}
                        onChange={(event) => handleCountrySelect(event)}
                        placeholder="Select one or more countries..."
                        required
                        >
                            <option className={style.countriesLabel}>Select one or more countries</option>
                                {countries?.map((element) => {
                                    return (
                                    <option value={element.id} key={element.id}>
                                        {element.name}
                                    </option>
                                    );
                                })};
                        </select>
                        {errors.countries && (<span className={style.error}>{errors.countries}</span>)}
                    </div>
                    <hr />
                    <label className={style.label}>Current countries: </label>
                    <div className={style.selectedCountriesContainer}>
                        {input.countries?.map((country) => {
                            return (
                            <div key={Math.random()}>
                                <div className={style.contenedorCountry}>
                                <button
                                    className={style.buttonClose}
                                    value={country}
                                    type="button"
                                    onClick={(e) => handleRemove(e)}
                                >
                                    X
                                </button>
                                <p className={style.parrafo}>
                                    {countries.find((c) => c.id === country).name}
                                </p>
                                </div>
                            </div>
                            );
                        })}
                    </div>

                    <button 
                    className={style.submitButton} 
                    type='submit'
                    disabled={!input.name || errors.name || !input.difficulty || !input.duration || !input.season || input.countries.length === 0}
                    >
                        Create Activity!
                    </button>
                </form>
            </div>
        </div>
    )
     
    
}

export default Form;

