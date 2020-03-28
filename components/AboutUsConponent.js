import React from 'react';
import {  Text,FlatList, View, ScrollView} from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { OURHISTORY } from './../shared/ourhistory'
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseurl';
import { Loading } from './LoadingComponent';


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
      OurHistory: OURHISTORY
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
         leftAvatar={{source: {uri: baseUrl + item.image}}}
       />
      );
    };
    if(this.props.leaders.isLoading ){
      return (
        <ScrollView>
          <History ourHistory={this.state.OurHistory} />
          <Card 
          containerStyle ={{marginTop : 10}}
          title={this.state.OurHistory[1].title}
          >
            <Loading />
          </Card>
      </ScrollView>
      )
    } else if (this.props.leaders.errMess){
      return (
        <ScrollView>
          <History ourHistory={this.state.OurHistory} />
          <Card 
          containerStyle ={{marginTop : 10}}
          title={this.state.OurHistory[1].title}
          >
            <Text>{this.props.leaders.errMess}</Text>
          </Card>
      </ScrollView>
      )
    } else {
      return (
        <ScrollView>
         <History ourHistory={this.state.OurHistory} />
         <Card 
          containerStyle ={{marginTop : 10}}
          title={this.state.OurHistory[1].title}
         >
          <FlatList 
            data={this.props.leaders.leaders}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
            />
         </Card>
        </ScrollView>
      )
    }
  }
}
const mapstate2props = state =>{
  return { 
    leaders : state.leaders
  }
}
export default connect(mapstate2props)(AboutUs);