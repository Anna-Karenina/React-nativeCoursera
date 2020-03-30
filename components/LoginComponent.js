import React from 'react'
import * as SecureStore from 'expo-secure-store';
import { StyleSheet, View } from 'react-native'
import { Input, CheckBox, Button } from 'react-native-elements'
class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password: '',
      remember: false 
    }
  }
  componentDidMount(){
    SecureStore.getItemAsync('userinfo')
      .then( (userdata) =>{
         let userinfo = JSON.parse(userdata)
         if(userinfo) {
           this.setState({username: userinfo.username})
           this.setState({password: userinfo.password})
           this.setState({remember: true})
         }
      } )
  }
  handleLogin(){
    console.log(JSON.stringify(this.state))
    if (this.state.remember){
      SecureStore.setItemAsync(
        'userinfo', 
        JSON.stringify({
        username:this.state.username,
        password: this.state.password
      }))
      .catch((err)=> console.log('Could not seve user info! ', err))
    }
    else {
      SecureStore.deleteItemAsync('userinfo')
      .catch((err)=> console.log('Could not delete user info', err))
    }
  }
  static navigationOptions ={
    title: 'Login'
  }
  render(){
    return(
      <View style = {styled.container}>
        <Input 
          placeholder = 'Username'
          leftIcon = {{
            type:'font-awesome',
            name:'user-o'
          }}
          onChange={(username)=> this.setState({username})}
          value = {this.state.username}
          containerStyle={styled.formInput}
        />
        <Input 
          placeholder = 'Password'
          leftIcon = {{
            type:'font-awesome',
            name:'key'
          }}
          onChange={(password)=> this.setState({password})}
          value = {this.state.password}
          containerStyle={styled.formInput}
        />
        <CheckBox
          title = 'Remember me' 
          center
          onPress={()=> this.setState({remember: !this.state.remember})}
          style={styled.formCheckbox}
          checked= {this.state.remember}/>
      <View  style={styled.formButton}>
        <Button onPress={()=>this.handleLogin()}
          title="Login"
          buttonStyle={{backgroundColor: '#512DA8'}}
        />
      </View>
      </View>
    )
  }
}


const styled = StyleSheet.create({
  container:{
    justifyContent: "center",
    margin:20
  },
  formInput:{
    margin: 40
  },
  formCheckbox:{
    margin:40,
    backgroundColor: null,
  },
  formButton:{
    margin:60
  },

})
export default Login