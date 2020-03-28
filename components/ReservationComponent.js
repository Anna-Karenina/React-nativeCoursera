import React from 'react'
import {Text, ScrollView, View, StyleSheet, Picker, Switch, Button, Modal} from 'react-native'
import DatePicker from 'react-native-datepicker'

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
   // console.log(JSON.stringify(this.state));
    this.toggleModal()
  }

  toggleModal(){
    this.setState({showModal: !this.state.showModal })
  }
  resetForm(){
    this.setState({
      guests:1,
      smoking:false,
      date: '' ,
      showModal: false
    })
  }

  static navigationOptions ={
    title: 'Reserve Table'
  }
  render(){
   return(
    <ScrollView>
      <View style={styled.formRow}>
        <Text style = {styled.formLabel}>
          Number of guests
        </Text>
        <Picker
         style={styled.formItem}
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
          onTintColor='#512DA8'
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
          title ='Reserve'
          color = '#512DA8'
          onPress={()=>this.handleReservation()}
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <Modal 
        animationType={'slide'}
        transparent={false}
        visible={this.state.showModal}
        onDismiss={() => {this.toggleModal(); this.resetForm()}}
        onRequestClose = {() => {this.toggleModal(); this.resetForm()}}
      >
        <View style={styled.modal}>
          <Text style={styled.modal_title}>Your Reservation</Text>
          <Text style={styled.modal_text}>Number of guests: {this.state.guests}</Text>
          <Text style={styled.modal_text}>Smoking? {this.state.smoking ? 'Yes': 'No'} </Text>
          <Text style={styled.modal_text}>Date and time: {this.state.date} </Text>
          <Button 
            onPress = {() => {this.toggleModal(); this.resetForm()}} 
            color = '#512DA8'
            title='Close' 
          />
        </View>
      </Modal>
    </ScrollView>
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
  }
})
export default Reservation