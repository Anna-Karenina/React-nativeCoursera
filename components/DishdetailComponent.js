import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseurl'

function RenderDish({dish, favorite, onPress}){
  if(dish !=null){
    return(
      <Card 
        featuredTitle={dish.name}
        image={{source:{uri: baseUrl + dish.image}}}>
          <Text style={{margin: 10}}>
            {dish.description}
          </Text>
          <Icon 
            raised
            reverse 
            name={favorite ?  "heart" : 'heart-o'}
            type='font-awesome'
            color = '#f50'
            onPress= { ()=>  favorite ? console.log("allredy favorite") : onPress() } /> 
      </Card>
    )
  }
  else{ 
    return(<View></View>)
  }
}

function RenderComments(props){
  const comments = props.comments
  const renderCommentItem = ({item , i}) => {
    return(
      <View key ={i} style = {{margin:10}}>
        <Text style ={{fontSize:14}}>{item.comment} </Text>
        <Text style ={{fontSize:12}}>{item.rating} Start</Text>
        <Text style ={{fontSize:12}}>{`--${item.author}, ${item.date}`} Start</Text>
      </View>
    )
  }
  return(
    <Card title="Comments">
      <FlatList data = {comments} renderItem={renderCommentItem} keyExtractor ={item =>item.id.toString()} />
    </Card>
  )
}
class DishDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
  }
  markFavorite(dishId) {
    this.setState({
      favorites: this.state.favorites.concat(dishId)
    })
  }
  static navigationOptions = {
      title: 'Dish Details'
  };

  render() {
      const dishId = this.props.navigation.getParam('dishId','');
      return(
        <ScrollView>
          <RenderDish 
            dish={this.props.dishes.dishes[+dishId]}  
            favorite = { this.state.favorites.some( el => el === dishId) }
            onPress={()=> this.markFavorite(dishId)}
            />
          <RenderComments 
            comments = {this.props.comments.comments.filter((comment)=> comment.dishId===dishId)} />
        </ScrollView>
      );
  }
}

const mapstate2props = state =>{
  return { 
    dishes : state.dishes,
    comments: state.comments
  }
}
export default connect(mapstate2props)(DishDetail)