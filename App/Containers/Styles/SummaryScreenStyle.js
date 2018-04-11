import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    // flex: 0,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'space-around',
    // marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.transparent
  },
//  MainContainer :{
//    // Setting up View inside content in Vertically center.
//    //justifyContent: 'center',
//    flex:1,
//    marginTop: Metrics.navBarHeight,
//    margin: 10
//  },
  TopMessage: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10
  },
  BareTextBold: {
    color: 'black',
    fontWeight: 'bold',
  },
  TextInput: {
    // Setting up Hint Align center.
    textAlign: 'left',
    // Setting up TextInput height as 50 pixel.
    height: 40,
    width: 100,
    // Set border width.
    borderWidth: 0,
    // Set border Hex Color Code Here.
    // borderColor: '#FF5722',
    // Set border Radius.
    borderRadius: 5,
    // Set background color of Text Input.
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10
  },
  LabelBar: {
    color: 'white',
    backgroundColor: Colors.labelbar,
    height: 30,
    paddingTop: 5
  }
})
