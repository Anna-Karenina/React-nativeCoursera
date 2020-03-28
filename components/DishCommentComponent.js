import React from 'react'
import { ScrollView, Modal, View, Text, StyleSheet } from 'react-native'
import { Icon, Input, Rating, Button } from 'react-native-elements'

class DishComment extends React.Component{
  constructor(props){
    super(props)
    this.state ={
      rating: 0,
      author: '',
      comment: '',
      showModal: false
    }
  }
  handleComment =()=>{
    const newDataComment = {
      ...this.state, 
      dishId: this.props.dishId, 
      date:new Date().toISOString(),
      id: this.props.commetsLength + 1
    }
    this.props.postComment(newDataComment)
    this.toggleModal()
  }

  toggleModal(){
    this.setState({showModal: !this.state.showModal })
  }
  resetForm(){
    this.setState({
      rating: 0,
      author: '',
      comment: '',
      showModal: false
    })
  }
  render(){
    return(
      <ScrollView >
        <Icon 
          raised
          reverse 
          name='pencil'
          type='font-awesome'
          color = '#512DA8'
          onPress = {() => this.handleComment()} 
        />
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {this.toggleModal(); this.resetForm()}}
          onRequestClose = {() => {this.toggleModal(); this.resetForm()}}
        >
          <View style = {styled.modal}>
          <Rating
            type='star'
            ratingCount={5}
            imageSize={50}
            showRating
            onFinishRating={count => this.setState({rating: count})}
          />
          <View style = {styled.modal}>
            <Input
              placeholder='Author'
              onChangeText ={text => this.setState({author: text})}

              leftIcon={
                <Icon
                  type='font-awesome'
                  name='user'
                  size={24}
                  color='black'
                  containerStyle={styled.icon}
                />
              }
              
            />
          </View>
          <View style = {styled.modal}>
            <Input
              placeholder='Comment'
              onChangeText ={text => this.setState({comment: text})}
              leftIcon={
                <Icon
                  type='font-awesome'
                  name='comment'
                  size={24}
                  color='black'
                  containerStyle={styled.icon}
                />
              }
            />
          </View>
          <Button
            onPress = {() => {this.toggleModal(); this.handleComment()}} 
            color = '#512DA8'
            title='Send'
            buttonStyle = {styled.Btn} 
          />
          <Button
            onPress = {() => {this.toggleModal(); this.resetForm()}} 
            color = '#512DA8'
            title='Cancel'
            buttonStyle = {styled.Btn_cancel} 
          />
        </View>
      </Modal> 
      </ScrollView>
    )
  }
}
const styled = StyleSheet.create({
  modal:{
    justifyContent:"center",
    margin:20,
  },
  modal_input:{
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
  Btn:{
    backgroundColor: '#512DA8',
    marginBottom:20,
  },
  Btn_cancel:{
    backgroundColor: '#4F6571'
  },
  icon:{
    marginRight: 10
  }
})
export default DishComment