import React from 'react'
import { View, Text, ScrollView, FlatList, PanResponder, Alert } from 'react-native'
import { Card, Icon, Rating } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseurl'
import { postFavorite, postComment } from '../redux/ActionsCreators'
import DishComment from './DishCommentComponent'
import * as Animatable from 'react-native-animatable'

function RenderDish({dish, favorite, onPress,postComment, commetsLength}){
  const recognizeDrag = ({ moveX, moveY, dx, dy }) =>{
    if(dx < -150){
      return true
    }
    else false
  }
  
  handleViewRef = ref => this.view = ref;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e, getstureState ) =>{
      return true
    },
    onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},

    onPanResponderEnd: (e, getstureState) =>{
      if(recognizeDrag(getstureState))
        Alert.alert(
          'Добавить в избраное',
          `Вы уверены что хотите добавить ${dish.name} в избраное`,
          [
            {
              text:'Отмена',
              onPress: ()=> console.log('действие отменено'),
              style: 'cancel'
            },
            {
              text:'ОК',
              onPress: () => favorite ? console.log("allredy favorite") : onPress(),
              style: "default"
            }
          ], {cancelable: false}
        )
      return true
    }
  })
  if(dish !=null){
    return(
      <Animatable.View 
        animation='fadeInDown' 
        duration ={ 2000 } 
        delay ={1000}
        ref={this.handleViewRef}
        {...panResponder.panHandlers}
      >
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
      </Animatable.View>
    )
  }
  else{ 
    return(<View></View>)
  }
}

const RenderComments = ({comments})=>{
  const renderCommentItem = ({item , i}) => {
    return(
      <Animatable.View animation='fadeInUp' duration ={ 2000 } delay ={1000}>
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
      </Animatable.View>
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