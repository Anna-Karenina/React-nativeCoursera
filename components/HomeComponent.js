import React, { Component } from 'react';
import { View, Platform, Text } from 'react-native';


class Home extends Component {

  static navigationOptions ={
    title: 'Home'
}
  render() {
    return (
      <View>
        <Text>
          Jome
        </Text>
      </View>
    )
  }
}
  
export default Home;