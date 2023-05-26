import axios from 'axios';

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const GET_COUNTRY = 'GET_COUNTRY'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'
export const GET_COUNTRY_BY_NAME = 'GET_COUNTRY_BY_NAME'
export const FILTER_BY_CONTINENT = 'FILTER_BY_CONTINENT'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_POPULATION = 'ORDER_BY_POPULATION'
export const GET_ACTIVITIES = 'GET_ACTIVITIES'
export const FILTER_BY_ACTIVITY = 'FILTER_BY_ACTIVITY'
export const CLEAR = 'CLEAR'
export const LOADER = 'LOADER'

export const getCountries = () => {
    return async (dispatch) => {
        dispatch({type: LOADER, payload:true})
        
        const apiData = await axios('http://localhost:3001/countries');
        const countries = apiData.data;

        dispatch({type: GET_COUNTRIES, payload: countries});
    };
};

export const getCountry = (id) => {
    return async (dispatch) => {
        try {
            const apiData = await axios(`http://localhost:3001/countries/${id}`);
            const country = apiData.data;
    
            return dispatch({type: GET_COUNTRY, payload: country})
        } catch (error) {
            console.log(error);
        }
      
    }
}

export const getCountryByName = (nombre) => {
    return async (dispatch) => {
        try {
            const apiData = await axios ('http://localhost:3001/countries?name=' + nombre)
            const country = apiData.data;
       
            return dispatch ({
                type: GET_COUNTRY_BY_NAME,
                payload: country
            })
        } catch (error) {
            console.log(error);
        }
       
    }
}

export const filterByContinent = (payload) => {
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export const orderByName = (payload) => {
    return { type: ORDER_BY_NAME, payload }
}

export const orderByPopulation = (payload) => {
    return { type: ORDER_BY_POPULATION, payload}
}

export const createActivity = (input) => {
    return async (dispatch) => {
        try {
          const response = await axios.post('http://localhost:3001/activities', input);
          return response;
        } catch (error) {
          console.error('Error al crear la actividad:', error);
        }
      };
};

export const getActivities = () => {
    return async (dispatch) => {
        const activities = (await axios('http://localhost:3001/activities')).data;
        if(await activities?.length > 0){
        dispatch({type: GET_ACTIVITIES, payload: activities})
        }
    }
}

export const filterByActivity = (payload) => {
    return (dispatch) => {
        return dispatch({
          type: FILTER_BY_ACTIVITY,
          payload,
        });
      };
}

export const clear = () => {
    return (dispatch) => {
        return dispatch({
            type: CLEAR,
            payload: []
        });
    };
}