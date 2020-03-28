import * as ActionTypes from './ActionCONST'

export const favorites = (state = [], action) =>{
  switch(action.type){
    case ActionTypes.ADD_FAVORITE:
      if(state.some(e => e === action.payload)){
        return state
      }
      else {
        return state.concat(action.payload)
      }
    case ActionTypes.DELETE_FAVORITE:
        return state.filter((favorite) => favorite !== action.payload);
      default: return state
    }
}