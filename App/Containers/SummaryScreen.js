import React, { Component } from 'react'
import { View, Text, TextInput, Image, ScrollView } from 'react-native'
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
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder='lbs'
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // Calling the custom TextInput.
              style={styles.TextInput}
              onChangeText={(text) => this.setState({text})}
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
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />
            <TextInput
              // Adding hint in Text Input using Place holder.
              placeholder='in'
              // Making the Under line Transparent.
              underlineColorAndroid='transparent'
              // Calling the custom TextInput.
              style={styles.TextInput}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text} />
          </View>
          <Text style={styles.LabelBar}>                   Gender</Text>
          <View style={{flexDirection: 'row', justifyContent: 'center', borderWidth: 2, height: 100, width: undefined}}>
            <Image
              source={require('../../App/Images/female.png')}
              style={{flex: 1, height: undefined, width: undefined}}
              resizeMode='contain'
            />
            <Image
              source={require('../../App/Images/male.png')}
              style={{flex: 1, height: undefined, width: undefined}}
              resizeMode='contain'
            />
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
