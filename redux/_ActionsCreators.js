import * as ActionTypes from './ActionCONST'
import { baseUrl } from './../shared/baseurl'

//ActionCreators
export const commentsFailed = (errmess) => ({
  type:ActionTypes.COMMENTS_FAILED,
  payload: errmess
})
export const addComments = (comments) => ({
  type:ActionTypes.ADD_COMMENTS,
  payload: comments
})


export const dishesLoading =()=>({
  type: ActionTypes.DISHES_LOADING
})
export const dishesFailed = (errmess) =>({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
})
export const addDishes = (dishes) =>({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
})


export const leadersLoading =()=>({
  type: ActionTypes.LEADERS_LOADING
})
export const leadersFailed = (errmess) =>({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
})
export const addLeaders = (leaders) =>({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
})


export const promotionsLoading =()=>({
  type: ActionTypes.PROMOS_LOADING
})
export const promotionsFailed = (errmess) =>({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
})
export const addPromotions = (promotions) =>({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
})


//______________________________________
//_______________Thunks_________________
 export const fetchComments = () => dispatch => {

  return fetch(`${baseUrl}/comments`)
    .then(response =>{
      if(response.ok){
        return response
      } else { 
        var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
        error.response = response
        throw error
      }
    }, 
    error => {
      var error = new Error(error.message)
       throw error
    })
    .then( response => {
      console.log(`LINE 74!!!!!!!!! :${response}`)
      response.json() 
    }  )
    .then( comments => dispatch(addComments(comments)) )
    .catch( error => {
      console.log(`LINE 79!!!!!!!!! :${error}`)
      dispatch(commentsFailed(error.message)) }) 
 }


 export const fetchDishes = () => dispatch => {
   dispatch(dishesLoading())

   return fetch(`${baseUrl}/dishes`)
   
   .then(response =>{

      console.log(response)
     if(response.ok){
       return response
     } else { 
       var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
       error.response = response
       throw error
     }
   }, 
   error => {
     var error  = new Error(error.message)
      throw error
   })
   .then( response => response.json() )
   .then( dishes => dispatch(addDishes(dishes)) )
   .catch( error => dispatch(dishesFailed(error.message)) ) 
}

 export const fetchPromotions = () => dispatch => {
   dispatch(promotionsLoading())

   return fetch(baseUrl + '/promotions')
   .then(response =>{
     if(response.ok){
       return response
     } else { 
       var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
       error.response = response
       throw error
     }
   }, 
   error => {
     var error  = new Error(error.message)
      throw error
   })
   .then( response => response.json() )
   .then( promotions => dispatch(addPromotions(promotions)) )
   .catch( error => dispatch(promotionsFailed(error.message)) ) 
}

 export const fetchLeaders = () => dispatch => {
   dispatch(leadersLoading())

  return fetch(`${baseUrl}/leaders`)
   .then(response =>{
     if(response.ok){
       return response
     } else { 
       var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
       error.response = response
       throw error
     }
   }, 
   error => {
     var error  = new Error(error.message)
      throw error
   })
   .then( response => response.json() )
   .then( leaders => dispatch(addLeaders(leaders)) )
   .catch( error => dispatch(leadersFailed(error.message)) ) 
}
//___________________________________________
