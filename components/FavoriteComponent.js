import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListItem } from 'react-native-elements';
import { Loading } from './LoadingComponent';
import { View, Text, FlatList, Alert } from 'react-native';
import Swipeout from 'react-native-swipeout'
import { deleteFavorite } from '../redux/ActionsCreators';
import * as Animatable from 'react-native-animatable'

class Favorites extends Component{

  static navigationOptions = {
    title: 'My Favorites'
};
  render(){
    const { navigate } = this.props.navigation 

    const renderMenuItem = ({ item, index }) =>{
      const rightButton = [
        {
            text: 'Delete', 
            type: 'delete',
            onPress: () =>
            {
              Alert.alert(
                'Delete Favorite?',
                `Вы уверенны что хотите удалить блюдо ${item.name}`,
                [
                  {
                    text: 'Отмена', 
                    onPress: ()=> console.log( `${item.name} Not Deleted!` ),
                    style: 'cancel'
                  },
                  {
                    text: "ok",
                    onPress: ()=> this.props.deleteFavorite(item.id)
                  }
                ],
                {cancelable: false}
              )
            }
             
        }
    ];
      return(
       <Swipeout right ={rightButton} autoClose={true}>
          <Animatable.View animation='fadeInRightBig' duration ={ 2000 } >
          <ListItem
            key ={ index }
            title = {item.name}
            subtitle = {item.description}
            hideChevron={true}
            onPress={()=> navigate('Dishdetail', {dishId: item.id})}
            leftAvatar ={{source:{ uri: './images/vadonut.png'} }}
            />
          </Animatable.View>
       </Swipeout>
       
      )
    }
    if(this.props.dishes.isLoading){
      return(
        <Loading />
      )
    }
    else if(this.props.dishes.errMess){
      return(
      <View>
        <Text>{this.props.dishes.errMess}</Text>
      </View>
      )
    }
    else {
      return(
        <FlatList
        data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
          renderItem={renderMenuItem}
          keyExtractor = {item => item.id.toString()}
        />
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    favorites: state.favorites
  }
}
const mapDispatchToProps = dispatch => ({
  deleteFavorite: (dishId) =>dispatch(deleteFavorite(dishId))
})

export default connect(mapStateToProps,mapDispatchToProps)(Favorites)