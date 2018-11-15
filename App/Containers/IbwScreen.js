import React, { Component } from 'react'
import { ScrollView, View, Picker } from 'react-native'
import RadioGroup from 'react-native-radio-buttons-group'
import RoundedButton from '../Components/RoundedButton'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/IbwScreenStyle'

class IbwScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      plegiaVal: 0,
      ampVal: 1.0
    }
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.ampVal}
            onValueChange={(itemValue, itemIndex) => {
              console.log('setting ampVal to: ' + itemValue)
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
          <CheckBox
            title='Paraplegia'
            checked={this.state.plegiaVal === 10}
            onPress={() => {
              if (this.state.plegiaVal === 10) {
                this.setState({plegiaVal: 0})
              } else {
                this.setState({plegiaVal: 10})
              }
            }}
          />
          <CheckBox
            title='Quadraplegia'
            checked={this.state.plegiaVal === 15}
            onPress={() => {
              if (this.state.plegiaVal === 15) {
                this.setState({plegiaVal: 0})
              } else {
                this.setState({plegiaVal: 15})
              }
            }}
          />
          <RoundedButton
            onPress={() => {
              var ibw = {'LL': 0.0, 'UL': 0.0}
              var ibwBase = 0.0
              var heightIn = parseFloat(this.props.navigation.state.params.height_ft) * 12.0 + parseFloat(this.props.navigation.state.params.height_in)
              console.log('heightIn: ' + heightIn)

              if (this.props.navigation.state.params.gender === 'male') {
                if (heightIn <= 60) {
                  ibwBase = 106 - (60 - heightIn) * 2.5
                  console.log('ibwBase male <=5ft: ' + ibwBase)
                } else {
                  ibwBase = 106 + (heightIn - 60) * 6.0
                  console.log('ibwBase male >5ft: ' + ibwBase)
                }
              } else {
                if (heightIn <= 60) {
                  ibwBase = 100 - (60 - heightIn) * 2.5
                  console.log('ibwBase female <=5ft: ' + ibwBase)
                } else {
                  ibwBase = 100 + (heightIn - 60) * 5.0
                  console.log('ibwBase female >5ft: ' + ibwBase)
                }
              }
              ibw = {'LL': (ibwBase * 0.9 - this.state.plegiaVal) * this.state.ampVal, 'UL': (ibwBase * 1.1 - this.state.plegiaVal) * this.state.ampVal}
              console.log('returning IBW: ' + ibw['LL'] + ' - ' + ibw['UL'])
              this.props.navigation.state.params.ibw_min = ibw['LL']
              this.props.navigation.state.params.ibw_max = ibw['UL']
              // call refreshState to ensure that the main screen redraws with all these updated state params
              this.props.navigation.state.params.refreshState(this.props.navigation.state.params)
            }}>
            Calculate
          </RoundedButton>
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
