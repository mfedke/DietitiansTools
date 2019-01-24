import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/'

export default StyleSheet.create({
  container: {
    // flex: 0,
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'space-around',
    // marginTop: Metrics.navBarHeight,
    alignItems: 'center',
    backgroundColor: 'white'
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
    fontWeight: 'bold'
  },
  TextInput: {
    // Setting up Hint Align center.
    textAlign: 'left',
    // Setting up TextInput height as 50 pixel.
    height: 40,
    width: 75,
    // Set border width.
    borderWidth: 0,
    // Set border Hex Color Code Here.
    borderColor: 'gray',
    // Set border Radius.
    borderRadius: 5,
    // Set background color of Text Input.
    backgroundColor: '#e8e8e8',
    //marginTop: 5,
    //marginBottom: 5,
    //marginLeft: 10
    margin: '2%'
  },
  LabelBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.labelbar,
    height: 30,
    paddingTop: 5
  },
  LabelBarText: {
    color: 'white',
    alignItems: 'center'
  },
  ScrollContent: {
    backgroundColor: '#F6F3E7'
  }
})
