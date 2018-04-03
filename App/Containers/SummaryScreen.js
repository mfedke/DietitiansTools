import React, { Component } from 'react'
import { View, Text, TextInput } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SummaryScreenStyle'

const buttons = ['Kcal', 'Protein', 'Fluid', 'Ibw', 'Bmi']

class SummaryScreen extends Component {
   constructor (props) {
     super(props)
     this.state = {}
   }

//        <View style={styles.MainContainer}>
//        <View style={{flex: 1, flexDirection: 'row'}}>

  render () {
    return (
      <View>
        <View>
          <TextInput
            // Adding hint in Text Input using Place holder.
            placeholder="0"
            // Making the Under line Transparent.
            underlineColorAndroid='transparent'
            // Calling the custom TextInputStyleClass.
            style={styles.TextInputStyleClass}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}>
            </TextInput>
            <Text style={{height: 40, width: 40}}>ft</Text>
        </View>
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
