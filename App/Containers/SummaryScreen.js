import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SummaryScreenStyle'

const buttons = [ 'Kcal', 'Protein', 'Fluid', 'Ibw', 'Bmi']

class SummaryScreen extends Component {
   constructor (props) {
     super(props)
     this.state = {}
   }

  render () {
    return (
      <View>
        {buttons.map((name, i) => [
          <View key={i}>
          <RoundedButton
            key={i}
            onPress={() => this.props.navigation.navigate(name.concat('Screen'))}>
            {name}
          </RoundedButton>
          </View>
        ])}
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen)
