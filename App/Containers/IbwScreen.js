import React, { Component } from 'react'
import { ScrollView, View, Picker, Text } from 'react-native'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/IbwScreenStyle'

class IbwScreen extends Component {
  constructor (props) {
    super(props)
    this.state = props.navigation.state.params.getIbwState()
  }

  notifySummaryPage (ampVal, plegiaVal) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.ampVal = ampVal
    this.state.plegiaVal = plegiaVal
    this.props.navigation.state.params.updateIbwState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    let tmp = this.props.navigation.state.params.getIbwState()
    this.setState({ampVal: ampVal, plegiaVal: plegiaVal, ibw_min: tmp.ibw_min, ibw_max: tmp.ibw_max})
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.ampVal}
            onValueChange={(itemValue, itemIndex) => {
              this.notifySummaryPage(itemValue, this.state.plegiaVal)
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
          <CheckBox
            title='Paraplegia'
            checked={this.state.plegiaVal === 10}
            onPress={() => {
              if (this.state.plegiaVal === 10) {
                this.notifySummaryPage(this.state.ampVal, 0)
              } else {
                this.notifySummaryPage(this.state.ampVal, 10)
              }
            }}
          />
          <CheckBox
            title='Quadraplegia'
            checked={this.state.plegiaVal === 15}
            onPress={() => {
              if (this.state.plegiaVal === 15) {
                this.notifySummaryPage(this.state.ampVal, 0)
              } else {
                this.notifySummaryPage(this.state.ampVal, 15)
              }
            }}
          />
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <Text>IBW: {this.state.ibw_min.toFixed(1)} - {this.state.ibw_max.toFixed(1)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(IbwScreen)
