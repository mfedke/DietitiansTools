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
          onPress={() => alert('Calculated')}>
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
