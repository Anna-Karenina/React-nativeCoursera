import React from 'react'
import {Text,View, StyleSheet, Picker, Switch, Alert, ScrollView} from 'react-native'
import DatePicker from 'react-native-datepicker'
import { Button } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import {  Notifications } from 'expo'
import * as Permissions from 'expo-permissions';

class Reservation extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      guests:1,
      smoking:false,
      date: '',
      showModal: false
    }
  }
  handleReservation =()=>{
    this.toggleAlert()
  }

  toggleAlert = ()=> {
    Alert.alert(
      'Забронировать столик?',
      `Подтвердить бронирование: \n
      Number of guests: ${this.state.guests} \n
      Smoking? ${this.state.smoking ? 'Yes': 'No'} \n
      Date and time: ${this.state.date}
      `,
      [
        {
          text: 'Отмена', 
          onPress: ()=> console.log( `отменено!` ),
          style: 'cancel'
        },
        {
          text: "ok",
          onPress: ()=> {
            this.presentLocalNotification(this.state.date)
          }
        }
      ],
      {cancelable: false}
    )
  }
  resetForm(){
    this.setState({
      guests:1,
      smoking:false,
      date: '' ,
      showModal: false
    })
  }
  async obtainNotificationPermission(){
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
    if (permission.status !== 'granted'){
      permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if(permission.status !== "granted"){
          Alert.alert('Permission not granted to show Notififcations')
        }
    }
    return permission
  }
  async presentLocalNotification(date){
    await this.obtainNotificationPermission()
    Notifications.presentLocalNotificationAsync({
      title:'Your Reservation',
      body: 'Reservation for ' + date + 'requested',
      ios:{
        sound: true
      },
      android:{
        sound: true,
        vibrate: true,
        color: '#512DA8'
      }
    })
  }
  static navigationOptions ={
    title: 'Reserve Table'
  }
  render(){
   return(
    <Animatable.View animation="zoomInUp">
    <ScrollView>
      <View style={styled.formRow}>
        <Text style = {styled.formLabel}>
          Number of guests
        </Text>
        <Picker
         style={styled.formItem,{width:50}}
         selectedValue={this.state.guests}
         onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}
        >
          <Picker.Item label = '1' value = '1'/> 
          <Picker.Item label = '2' value = '2'/> 
          <Picker.Item label = '3' value = '3'/> 
          <Picker.Item label = '4' value = '4'/> 
          <Picker.Item label = '5' value = '5'/> 
          <Picker.Item label = '6' value = '6'/> 
        </Picker>
      </View>
      <View style={styled.formRow}>
        <Text style = {styled.formLabel}>
          Smoking/Non-Smoking? 
        </Text> 
        <Switch
          style={styled.formItem}
          value ={ this.state.smoking}
          trackColor='#512DA8'
          onValueChange = {(value)=>this.setState({smoking: true})}
        />
      </View>
      <View style={styled.formRow}>
        <Text style = {styled.formLabel}>
          Date and Time
        </Text> 
        <DatePicker
            style={{flex: 2, marginRight: 20}}
            date={this.state.date}
            format=''
            mode="datetime"
            placeholder="select date and Time"
            minDate="2017-01-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
            dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
            },
            dateInput: {
                marginLeft: 36
            }
            }}
            onDateChange={(date) => {this.setState({date: date})}}
        />
      </View>
      <View style = {styled.formRow}>
        <Button
          buttonStyle = {{backgroundColor:'#512DA8' }}
          title ='Reserve'
          color = '#512DA8'
          onPress={()=>this.handleReservation()}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      </ScrollView>
      </Animatable.View>
   ); 
  }
}
const styled = StyleSheet.create({
  formRow:{
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  formLabel:{
    fontSize: 18,
    flex: 2,
  },
  formItem:{
    flex: 1
  },
  modal:{
    justifyContent:"center",
    margin:20,
  },
  modal_title:{
    fontSize: 24,
    fontWeight:'bold',
    backgroundColor: '#512DA8',
    textAlign: "center",
    color:'white',
    marginBottom: 20,
  },
  modal_text:{
    fontSize: 18,
    margin:10,
  },
  picker:{
    width: 50
  }
})
export default Reservation