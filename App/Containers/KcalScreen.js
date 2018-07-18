import React, { Component } from 'react'
import { View, Text, Picker } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KcalScreenStyle'

class KcalScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formula: 'mifflin'
    }
  }

// Example of passing state back and forth through react navigation (not sure if it's ok to set this state directly or not, but couldn't get getParam/setParam to work - undefined)
//          onPress={() => { window.alert('Gender: ' + this.props.navigation.state.params.gender + '\nAge: ' + this.props.navigation.state.params.age + '\nWeight: ' + this.props.navigation.state.params.weight + '\nHeight Ft: ' + this.props.navigation.state.params.height_ft + '\nHeight In: ' + this.props.navigation.state.params.height_in); this.props.navigation.state.params.age = 100 }}>

  render () {
    return (
      <View>
        <Picker
          selectedValue={this.state.formula}
          onValueChange={(itemValue, itemIndex) => this.setState({formula: itemValue})}>
          <Picker.Item label='Mifflin St. Jeor' value='mifflin' />
          <Picker.Item label='Harris-Benedict' value='hb' />
          <Picker.Item label='Kcal/Kg' value='kcalkg' />
        </Picker>
        <RoundedButton
          onPress={() => { var bmr = 10.0 * this.props.navigation.state.params.weight + 6.25 * this.props.navigation.state.params.height_ft - 5.0 * this.props.navigation.state.params.age + 5; window.alert('BMR: ' + bmr); this.props.navigation.state.params.bmr = bmr }}>
          Calculate
        </RoundedButton>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KcalScreen)
