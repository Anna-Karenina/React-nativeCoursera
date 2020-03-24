import React, { Component} from 'react';
import { FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';

class Menu extends Component {
  static navigationOptions ={
        title: 'Menu'
    }
  render(){      
    const renderMenuItem = ({item, index}) => {
      return (
       <Tile
         key={index}
         title={item.name}
         caption={item.description}
         featured
         onPress={()=>navigate("Dishdetail", {dishId: item.id}) }
         imageSrc={{ uri: baseUrl + item.image}}
       />
      );
    };
    const { navigate }= this.props.navigation
     return (
       <FlatList 
        data={this.props.dishes.dishes}
        renderItem={renderMenuItem}
        keyExtractor={item => item.id.toString()}
        />
      );
    }

}

const mapstate2props = state =>{
  return { 
    dishes : state.dishes,
  }
}
export default connect(mapstate2props)(Menu);