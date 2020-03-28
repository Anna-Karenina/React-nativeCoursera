import React from 'react'
import { View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon, Rating } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseurl'
import { postFavorite, postComment } from '../redux/ActionsCreators'
import DishComment from './DishCommentComponent'

function RenderDish({dish, favorite, onPress,postComment, commetsLength}){
  if(dish !=null){
    return(
      <Card 
        featuredTitle={dish.name}
        image={{uri: baseUrl + dish.image}}>
          <Text style={{margin: 10}}>
            {dish.description}
          </Text>
          <View style = {{flexDirection: 'row', justifyContent: "center", alignContent: "center",alignItems:"center", flex: 1}}>
          <Icon 
            raised
            reverse 
            name={favorite ?  "heart" : 'heart-o'}
            type='font-awesome'
            color = '#f50'
            onPress= { ()=>  favorite ? console.log("allredy favorite") : onPress() } /> 
          <DishComment 
            postComment = {postComment}
            dishId={dish.id}
            commetsLength={commetsLength}/>
          </View>
      </Card>
    )
  }
  else{ 
    return(<View></View>)
  }
}

const RenderComments = ({comments})=>{
  const renderCommentItem = ({item , i}) => {
    return(
      <View key ={i} style = {{margin:10}}>
        <Text style ={{fontSize:14}}>{item.comment} </Text>
        <Text style ={{fontSize:12,margin: 8}}>
          <Rating 
            type='star'
            ratingCount={item.rating}
            imageSize={10}
            readonly
          />
        </Text>
        <Text style ={{fontSize:12}}>{`--${item.author}, ${item.date}`}</Text>
      </View>
    )
  }
  return(
    <Card title="Comments">
      <FlatList 
        data = {comments} 
        renderItem={renderCommentItem} 
        keyExtractor ={item =>item.id.toString()} 
      />
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
    this.props.postFavorite(dishId);
}
  static navigationOptions = {
      title: 'Dish Details'
  };

  render() {
      const dishId = this.props.navigation.getParam('dishId','');
      const commetsLength = this.props.comments.comments.length
      return(
        <ScrollView>
          <RenderDish 
            dish={this.props.dishes.dishes[+dishId]}  
            favorite={this.props.favorites.some(el => el === dishId)}
            onPress={()=> this.markFavorite(dishId)}
            postComment={this.props.postComment}
            commetsLength = {commetsLength}
            />
          <RenderComments 
            comments = {this.props.comments.comments.filter( (comment) => comment.dishId === dishId )} />
        </ScrollView>
      );
  }
}

const mapstate2props = state =>{
  return { 
    dishes : state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}
const mapDispatchToProps = dispatch => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  postComment:(data) =>dispatch(postComment(data))
})

export default connect(mapstate2props,mapDispatchToProps)(DishDetail)