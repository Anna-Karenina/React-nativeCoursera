import React from 'react';
import { Text, View } from 'react-native';
import { Card } from 'react-native-elements';


const data = {
  contact:
    [
      {key: '121, Clear Water Bay Road'},
      {key: 'Clear Water Bay, Kowloon'},
      {key: 'HONG KONG'},
      {key: 'Tel: +8521234 5678'},
      {key: 'Fax: +852 87654321'},
      {key: 'confusion@food.net'}
    ]
}

function Contact({navigation}) {
  const [contact,] = React.useState([...data.contact])
    return(
    <Card 
      containerStyle ={{marginTop : 50}}
      dividerStyle = {{opacity: 0}}
      title="Contact Information" >
      {
        contact.map((D, i) => {
          return (
            <View key={i} >
              <Text style = {{padding: 13}}>{D.key}</Text>
            </View>
          )
        })
      }
    </Card>
    )
}
Contact['navigationOptions'] = screenProps => ({
  title: 'Contact info'
})
// Contact.navigationOptions = () => ({
//   title
// });
export default Contact;