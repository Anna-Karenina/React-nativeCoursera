import React from 'react';
import {  Text,FlatList, View, ScrollView} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { OURHISTORY } from './../shared/ourhistory'
import { LEADERS } from '../shared/leaders';


const  History = ({ourHistory}) =>{
  return(
    <Card 
      containerStyle ={{marginTop : 10}}
      title={ourHistory[0].title} >
        {
          ourHistory.map((u, i) => {
            return (
              <View key={i}>
                <Text>{u.description}</Text>
              </View>
            );
          })
        }
    </Card>
  )
}

class AboutUs extends React.Component{
  constructor(props){
    super(props)
    this.state={
      OurHistory: OURHISTORY,
      leaders: LEADERS
    }
  }
  static navigationOptions = {
    title: 'About Us'
}
  render(){
    const renderMenuItem = ({item, index}) => {
      return (
       <ListItem
         key={index}
         title={item.name}
         subtitle={item.description}
         hideChevron={true}
         leftAvatar={{ source: require('./images/alberto.png')}}
       />
      );
    };
     return (
      <ScrollView>
       <History ourHistory={this.state.OurHistory} />
       <Card 
        containerStyle ={{marginTop : 10}}
        title={this.state.OurHistory[1].title}
       >
        <FlatList 
          data={this.state.leaders}
          renderItem={renderMenuItem}
          />
       </Card>
      </ScrollView>
    )
  }
}

export default AboutUs;