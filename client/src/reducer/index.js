const initialState = {
     characters : [],
     characters2 : []
}


function rootReducer(state = initialState, actions){
     switch(actions.type){
          case 'GET_CHARACTERS':
               return{
                    ...state,
                    characters: actions.payload
                }
          case 'FILTER_BY_STATUS': 
                const todos = state.characters2;
                const hasActivity = todos.filter( e => e.Genre.length !== 0)
                const nuevoArr = hasActivity.filter(e => {
                    for(let i=0; i<e.Genre.length; i++){
                        if(e.Genre[i].name == actions.payload) return true
                    }
                })
                return{
                    ...state,
                    characters2: nuevoArr
                }
                default:return state;
     }
}

export default rootReducer;