import React, { Component } from 'react'
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity } from 'react-native'
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
    this.state = { gender: 'female',
      age: '0',
      weight: '0',
      height_ft: '0',
      height_in: '0' }
  }

//        <View style={styles.MainContainer}>
//        <View style={{flex: 1, flexDirection: 'row'}}>

  onPressFemale = () => {
    this.setState({
      gender: 'female'
    }, function () {
      window.alert('Gender: ' + this.state.gender + '\nAge: ' + this.state.age + '\nWeight: ' + this.state.weight + '\nHeight Ft: ' + this.state.height_ft + '\nHeight In: ' + this.state.height_in)
    })
//    alert('Gender: ' + this.state.gender)
  }

  onPressMale = () => {
    this.setState({
      gender: 'male'
    }, function () {
      window.alert('Gender: ' + this.state.gender + '\nAge: ' + this.state.age + '\nWeight: ' + this.state.weight + '\nHeight Ft: ' + this.state.height_ft + '\nHeight In: ' + this.state.height_in)
    })
//    alert('Gender: ' + this.state.gender)
  }

  render () {
    return (
      <ScrollView>
        <View>
          <View style={styles.TopMessage}>
            <Text style={styles.BareTextBold}>Enter the following data:</Text>
          </View>
          <Text style={styles.LabelBar}>                   Age                                                     Weight</Text>
          <View style={styles.container}>
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder='years'
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // Calling the custom TextInput.
              style={styles.TextInput}
              onChangeText={(text) => this.setState({age: text})}
              value={this.state.text} />
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder='lbs'
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // Calling the custom TextInput.
              style={styles.TextInput}
              onChangeText={(text) => this.setState({weight: text})}
              value={this.state.text} />
          </View>
          <Text style={styles.LabelBar}>                   Height</Text>
          <View style={styles.container}>
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder='ft'
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // Calling the custom TextInput.
              style={styles.TextInput}
              onChangeText={(text) => this.setState({height_ft: text})}
              value={this.state.text} />
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder='in'
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // Calling the custom TextInput.
              style={styles.TextInput}
              onChangeText={(text) => this.setState({height_in: text})}
              value={this.state.text} />
          </View>
          <Text style={styles.LabelBar}>                   Gender</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, height: 100, width: undefined}}>
            <TouchableOpacity onPress={this.onPressFemale}>
              <View style={{width: 40, height: 100}}>
                <Image
                  source={require('../../App/Images/female.png')}
                  style={{width: 40, height: 100}}
                  resizeMode='contain'
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressMale}>
              <View style={{width: 40, height: 100}}>
                <Image
                  source={require('../../App/Images/male.png')}
                  style={{width: 40, height: 100}}
                  resizeMode='contain'
                />
              </View>
            </TouchableOpacity>
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
      </ScrollView>
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
