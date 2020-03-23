import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator,createDrawerNavigator } from 'react-navigation'
import Contact from './ContactComponent';
import AboutUs from './AboutUsConponent';

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu },
  Dishdetail: { screen: Dishdetail }
}, 
{
  initialRouteName: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);


const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
}, 
{
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);
const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact },
}, 
{
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);
const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs },
}, 
{
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      }
  }
}
);
const MainNavigator = createDrawerNavigator({
  Home:{
    screen:HomeNavigator,
    navigationOptions:{
      title: 'Home',
      drawlerLable: 'Home'
    }
  },
  AboutUs: {
    screen:AboutUsNavigator,
    navigationOptions:{
      title: 'About Us',
      drawlerLable: 'About Us'
    }
  },
  Menu:{
    screen:MenuNavigator,
    navigationOptions:{
      title: 'Menu',
      drawlerLable: 'Menu'
    }
  },
  Contact:{
   screen:ContactNavigator,
   navigationOptions:{
     title: 'Contact',
     drawlerLable: 'Contact'
    }
  },
},{
  drawlerBackgroundCOlor: '#d1c4e9'
})

class Main extends Component {
  onDishSelect(dishId){
    this.setState({selectedDish: dishId})
  }
  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
        </View>
    )
  }
}
  
export default Main;