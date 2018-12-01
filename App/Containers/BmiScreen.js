import React, { Component } from 'react'
import { ScrollView, View, Picker, Text } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BmiScreenStyle'

class BmiScreen extends Component {
  constructor (props) {
    super(props)
    this.state = props.navigation.state.params.getBmiState()
  }

  componentDidUpdate (prevProps) {
    this.props.navigation.state.params.updateBmiState(this.state)
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.ampVal}
            onValueChange={(itemValue, itemIndex) => {
              this.setState({ampVal: itemValue})
            }}
          >
            <Picker.Item label='No Amputation' value={1.0} />
            <Picker.Item label='Below Knee - 5.9%' value={1.0 - 0.059} />
            <Picker.Item label='Above Knee - 10.0%' value={1.0 - 0.1} />
            <Picker.Item label='Bilateral BKA - 11.8%' value={1.0 - 0.118} />
            <Picker.Item label='Bilateral AKA - 20%' value={1.0 - 0.2} />
            <Picker.Item label='BKA + AKA - 16%' value={1.0 - 0.16} />
            <Picker.Item label='Foot - 1.5%' value={1.0 - 0.015} />
            <Picker.Item label='Both Feet - 3%' value={1.0 - 0.03} />
            <Picker.Item label='Forearm and Hand - 2.3%' value={1.0 - 0.023} />
            <Picker.Item label='Both Forearms and Hands - 4.6%' value={1.0 - 0.046} />
            <Picker.Item label='Entire Arm - 5%' value={1.0 - 0.05} />
            <Picker.Item label='Both Entire Arms - 10%' value={1.0 - 0.1} />
            <Picker.Item label='Entire Leg - 16%' value={1.0 - 0.16} />
            <Picker.Item label='Both Entire Legs - 32%' value={1.0 - 0.32} />
          </Picker>
          <RoundedButton
            onPress={() => {
              var heightIn = parseFloat(this.props.navigation.state.params.height_ft) * 12.0 + parseFloat(this.props.navigation.state.params.height_in)
              var bmi = 0.0

              bmi = 703.0 * (parseFloat(this.props.navigation.state.params.weight_lbs) / (heightIn * heightIn)) * this.state.ampVal
              this.setState({bmi: bmi})
              this.props.navigation.state.params.bmi = bmi
              // call refreshState to ensure that the main screen redraws with all these updated state params
              this.props.navigation.state.params.refreshState(this.props.navigation.state.params)
            }}>
            Calculate
          </RoundedButton>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <Text>BMI: {this.state.bmi.toFixed(1)}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', height: 30, width: '80%'}}/>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
              <Text>Classification</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>BMI</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
              <Text>Overweight</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>25.0 - 29.9</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
              <Text>Obesity I</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>30.0 - 34.9</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
              <Text>Obesity II</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>35.0 - 39.9</Text>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderRightWidth: 1}}>
              <Text>Extreme Obesity III</Text>
            </View>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>>40.0</Text>
            </View>
          </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(BmiScreen)
