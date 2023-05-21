import { all } from "axios";
import { CREATE_ACTIVITY, FILTER_BY_ACTIVITY, FILTER_BY_CONTINENT, GET_ACTIVITIES, ORDER_BY_NAME, ORDER_BY_POPULATION } from "./actions";
import { GET_COUNTRIES, GET_COUNTRY_BY_NAME, GET_COUNTRY } from "./actions";

const initialState = {
    countries: [],  
    allCountries:[],
    activities: [],
    detail: [],
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_COUNTRIES:
            return {...state, countries: action.payload, allCountries: action.payload}

        case GET_COUNTRY_BY_NAME:
            return {...state, countries: action.payload}

        case GET_COUNTRY:
            return {...state, detail: action.payload} 

        case FILTER_BY_CONTINENT:
            const allCountries = state.allCountries;
            const continentFilter = action.payload === 'All' ? allCountries : allCountries.filter(el => el.continents === action.payload)
            return{ ...state, countries: continentFilter}

        case ORDER_BY_NAME:
            if(action.payload === 'asc'){ 
                return{ 
                ...state, countries: state.countries.sort((a,b) => {
                    if(a.name > b.name) {
                        return 1;
                    }
                    if(b.name > a.name){
                        return -1;
                    }
                    return 0;
                })
            }
            }else if(action.payload === 'des'){
                return{ 
                ...state, countries: state.countries.sort((a,b) => {
                    if(a.name > b.name) {
                        return -1;
                    }
                    if(b.name > a.name){
                        return 1;
                    }
                    return 0;
                })
                }
            }else{
                return {...state}
            }
          
            break;

        case ORDER_BY_POPULATION:
            if (action.payload === "asc") {
                let countriesMaMe = state.countries.sort((a, b) =>
                  a.population > b.population ? 1 : a.population < b.population ? -1 : 0
                );
                return {
                  ...state,
                  countries: countriesMaMe,
                };
              } else if (action.payload === "des") {
                let countriesMeMa = state.countries.sort((b, a) =>
                  a.population > b.population ? 1 : a.population < b.population ? -1 : 0
                );
                return {
                  ...state,
                  countries: countriesMeMa,
                };
              }else return{...state}   
           
        case GET_ACTIVITIES:
            return{...state, activities: action.payload}

        case CREATE_ACTIVITY:
            return {...state}
    
        case FILTER_BY_ACTIVITY:
            const mapeoCountries =
                action.payload === 'All'
                    ? state.allCountries
                    : state.allCountries.filter((c) => {
                        // console.log(c);
                          const mapeo = c.activities?.map((act) => act.name);
                        //   console.log(mapeo);
                          if (mapeo?.includes(action.payload)) {
                            return c;
                          }
                      });
                    //   console.log(mapeoCountries);
        
            return {
                ...state,
                countries: mapeoCountries,
            };

        default:
            return {...state }; 
    }
};



export default rootReducer;