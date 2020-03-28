import * as ActionTypes from './ActionCONST'
import { baseUrl } from './../shared/baseurl'
import {COMMENTS} from './../shared/comments'
import {DISHES} from './../shared/dishes'
import {PROMOTIONS} from './../shared/promotions'
import {LEADERS} from './../shared/leaders'

//ActionCreators
export const commentsFailed = (errmess) => ({
  type:ActionTypes.COMMENTS_FAILED,
  payload: errmess
})
export const addComments = (comments) => ({
  type:ActionTypes.ADD_COMMENTS,
  payload: comments
})
export const addComment = (data) =>({
  type: ActionTypes.ADD_COMMENT,
  payload: data
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
export const addFavorite = (dishId) =>({
  type: ActionTypes.ADD_FAVORITE,
  payload: dishId
})
export const deleteFavorite = (dishId) => ({
  type: ActionTypes.DELETE_FAVORITE,
  payload: dishId
});


//______________________________________
//_______________Thunks_________________
 export const fetchComments = () => dispatch => {

   return new Promise((resolve)=>{
     setTimeout(function(){
      resolve(COMMENTS)
    }, 2500);
   })
    .then(response =>{
      if(response){
        return response
      } else { 
        var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
        error.response = response
        throw error
      }
    })
    .then( comments => dispatch(addComments(comments)) )
    .catch( error => {
      console.log(error)
      dispatch(commentsFailed(error.message)) }) 
 }


 export const fetchDishes = () => dispatch => {
   dispatch(dishesLoading())

   return new Promise((resolve)=>{
    setTimeout(function(){
     resolve(DISHES)
   }, 2500);
  })

   .then(response =>{
     if(response){
       return response
     } else { 
       var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
       error.response = response
       throw error
     }
   } )
   .then( dishes => dispatch(addDishes(dishes)) )
   .catch( error => dispatch(dishesFailed(error.message)) ) 
}

 export const fetchPromotions = () => dispatch => {
   dispatch(promotionsLoading())

   return new Promise((resolve)=>{
    setTimeout(function(){
     resolve(PROMOTIONS)
   }, 2500);
  })
   .then(response =>{
     if(response){
       return response
     } else { 
       var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
       error.response = response
       throw error
     }
   }
   )
   .then( promotions => dispatch(addPromotions(promotions)) )
   .catch( error => dispatch(promotionsFailed(error.message)) ) 
}

 export const fetchLeaders = () => dispatch => {
   dispatch(leadersLoading())
   
   return new Promise((resolve)=>{
    setTimeout(function(){
     resolve(LEADERS)
   }, 12800);
  })
   .then(response =>{
     if(response){
       return response
     } else { 
       var error = new Error(`Error' ${response.status}: ${response.statusText} ` )
       error.response = response
       throw error
     }
   }
   )
   .then( leaders => dispatch(addLeaders(leaders)) )
   .catch( error => dispatch(leadersFailed(error.message)) ) 
}
export const postFavorite = (dishId)  => (dispatch) => {
  setTimeout(() => {
      dispatch(addFavorite(dishId));
  }, 1000);
};
export const postComment = (data)  => (dispatch) => {
  setTimeout(() => {
      dispatch(addComment(data));
  }, 2000);
};
//___________________________________________
