import React, { Component } from 'react';
import Home from './HomeComponent'
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Login from './LoginComponent'
import { View, Platform, Image, StyleSheet, ScrollView,Text } from 'react-native';
import Contact from './ContactComponent';
import AboutUs from './AboutUsConponent';
import Favorite from './FavoriteComponent';
import Reserved from './ReservationComponent';
import { createStackNavigator,createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation'
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { fetchComments, fetchDishes, fetchPromotions, fetchLeaders } from '../redux/ActionsCreators';


const MenuNavigator = createStackNavigator({
  Menu: { 
    screen: Menu,
    navigationOptions:({navigation}) => ({
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
    })
  },
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
})

const HomeNavigator = createStackNavigator({
  Home: { screen: Home },
}, 
{
  navigationOptions:({navigation}) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      },
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
  })
})
const LoginNavigator = createStackNavigator({
  Login: { screen: Login },
}, 
{
  navigationOptions:({navigation}) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      },
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
  })
})

const FavoriteNavigator = createStackNavigator({
  Favorite: { screen: Favorite },
}, 
{
  navigationOptions:({navigation}) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      },
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
  })
})

const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact },
}, 
{
  navigationOptions:({navigation}) => ( {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      },
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
  })
})

const AboutUsNavigator = createStackNavigator({
  AboutUs: { screen: AboutUs },
}, 
{
  navigationOptions:({navigation}) => ( {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      },
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
  })
})
const ReservedTableNavigator = createStackNavigator({
  Reserved: { screen: Reserved },
}, 
{
  navigationOptions:({navigation}) => ( {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"            
      },
      headerLeft: <Icon containerStyle ={{marginLeft: 10}} name='menu' size={30} color='white' onPress = {()=> navigation.toggleDrawer()}/>
  })
})

const CustomDrawerContentComponent = (props) =>(
  <ScrollView>
    <SafeAreaView style ={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
      <View style={styles.drawerHeader}>
        <View style ={{flex:1}}>
          <Image source = { require('./images/logo.png')} style = {styles.drawerImage} />
        </View>
        <View style = {{ flex: 2}}>
          <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
          </Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)

const MainNavigator = createDrawerNavigator({
  Login:{
    screen:LoginNavigator,
    navigationOptions:{
      title: 'Login',
      drawlerLable: 'Login',
      drawerIcon: ({ tintColor }) => (<Icon name ='sign-in' type='font-awesome' size= {24} color={tintColor} />)
    }
  },
  Home:{
    screen:HomeNavigator,
    navigationOptions:{
      title: 'Home',
      drawlerLable: 'Home',
      drawerIcon: ({ tintColor }) => (<Icon name ='home' type='font-awesome' size= {24} color={tintColor} />)
    }
  },
  AboutUs: {
    screen:AboutUsNavigator,
    navigationOptions:{
      title: 'About Us',
      drawlerLable: 'About Us',
      drawerIcon: ({ tintColor }) => (<Icon name ='info-circle' type='font-awesome' size= {24} color={tintColor}/>)
    }
  },
  Menu:{
    screen:MenuNavigator,
    navigationOptions:{
      title: 'Menu',
      drawlerLable: 'Menu',
      drawerIcon: ({ tintColor }) => (<Icon name ='list' type='font-awesome' size= {24} color={tintColor}/>)
    }
  },
  Contact:{
   screen:ContactNavigator,
   navigationOptions:{
     title: 'Contact',
     drawlerLable: 'Contact',
     drawerIcon: ({ tintColor }) => (<Icon name ='address-card' type='font-awesome' size= {22} color={tintColor}/>)
    }
  },
  Favorite:{
   screen:FavoriteNavigator,
   navigationOptions:{
     title: 'Favorite',
     drawlerLable: 'Favorite',
     drawerIcon: ({ tintColor }) => (<Icon name ='heart' type='font-awesome' size= {22} color={tintColor}/>)
    }
  },
  Reserved:{
    screen:ReservedTableNavigator,
   navigationOptions:{
     title: 'Reserved',
     drawlerLable: 'Contact',
     drawerIcon: ({ tintColor }) => (<Icon name ='cutlery' type='font-awesome' size= {22} color={tintColor}/>)
    }
  },   
},{
  initialRouteName: 'Home',
  drawlerBackgroundCOlor: '#D1C4E9',
  contentComponent:CustomDrawerContentComponent
})

class Main extends Component {

  componentDidMount(){
    this.props.fetchDishes()
    this.props.fetchComments()
    this.props.fetchLeaders()
    this.props.fetchPromotions()
  }

  render() {
    return (
      // <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
       <View style={{flex:1, paddingTop:0}}> 
            <MainNavigator />
        </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1
  },
  drawerHeader:{
    backgroundColor: "#512DA8",
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex:1,
    flexDirection:'row',
  },
  drawerHeaderText:{
    color:'white',
    fontSize: 24,
    fontWeight:'bold',
  },
  drawerImage:{
    margin:10,
    width:80,
    height:50
  }
})

const mapStateToProps = state => {
  return {
  }
}
const mapdis2props = dispatch =>({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromotions: () => dispatch(fetchPromotions()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})
export default connect(mapStateToProps,mapdis2props)(Main);