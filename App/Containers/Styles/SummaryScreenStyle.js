import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
//  MainContainer :{
//    // Setting up View inside content in Vertically center.
//    //justifyContent: 'center',
//    flex:1,
//    marginTop: Metrics.navBarHeight,
//    margin: 10
//  },
  TextInputStyleClass:{
    // Setting up Hint Align center.
    textAlign: 'left',
    // Setting up TextInput height as 50 pixel.
    height: 40,
    width: 100,
    // Set border width.
     borderWidth: 0,
    // Set border Hex Color Code Here.
     //borderColor: '#FF5722',
    // Set border Radius.
     borderRadius: 5,
    //Set background color of Text Input.
     backgroundColor : 'white',
     marginTop: Metrics.navBarHeight,
     marginLeft: Metrics.navBarHeight,
  },
})
