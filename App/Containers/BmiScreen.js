import React, { Component } from 'react'
import { ScrollView, View, Picker, Text } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/BmiScreenStyle'

class BmiScreen extends Component {
  constructor (props) {
    super(props)
    // call updateBmiState first to get an updated calculation
    this.props.navigation.state.params.updateBmiState(props.navigation.state.params.getBmiState())
    this.state = props.navigation.state.params.getBmiState()
  }

  notifySummaryPage (selectedAmpIndex) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedAmpIndex = selectedAmpIndex
    this.props.navigation.state.params.updateBmiState(this.state)
    // then, pull the calc results back here to update this page with the most current result
    let tmp = this.props.navigation.state.params.getBmiState()
    this.setState({selectedAmpIndex: selectedAmpIndex, bmi: tmp.bmi})
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.selectedAmpIndex}
            onValueChange={(itemValue, itemIndex) => {
              this.notifySummaryPage(itemValue)
            }}
          >
            {this.state.ampData.map((member, i) => [
              <Picker.Item label={member.label} value={member.index} key={i} />
            ])}
          </Picker>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <Text>BMI: {this.state.bmi.toFixed(1) + ' - ' + this.state.classification}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', height: 30, width: '80%'}} />
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
