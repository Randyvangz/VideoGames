import axios from 'axios';

export function getCharacters(){
     return async function(dispatch){
          var json = await axios.get("http://localhost:3001/videogames");

          return dispatch({
               type: 'GET_CHARACTERS',
               payload: json.data
          })
     }
}

export function filterGamesByStatus(payload){
     console.log(payload)
     return{
          type: 'FILTER_BY_STATUS',
          payload
     }
}