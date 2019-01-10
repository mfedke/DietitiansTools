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

  notifySummaryPage (selectedAmpIndex, plegiaVal) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.selectedAmpIndex = selectedAmpIndex
    this.state.plegiaVal = plegiaVal
    this.props.navigation.state.params.updateIbwState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    let tmp = this.props.navigation.state.params.getIbwState()
    this.setState({selectedAmpIndex: selectedAmpIndex, plegiaVal: plegiaVal, ibw_min: tmp.ibw_min, ibw_max: tmp.ibw_max})
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.selectedAmpIndex}
            onValueChange={(itemValue, itemIndex) => {
              this.notifySummaryPage(itemValue, this.state.plegiaVal)
            }}
          >
            {this.state.ampData.map((member, i) => [
              <Picker.Item label={member.label} value={member.index} key={i} />
            ])}
          </Picker>
          {this.state.plegiaData.map((member, i) => [
            <CheckBox
              title={member.label}
              checked={this.state.plegiaVal === member.value}
              key={i}
              onPress={() => {
                if (this.state.plegiaVal === member.value) {
                  this.notifySummaryPage(this.state.selectedAmpIndex, 0)
                } else {
                  this.notifySummaryPage(this.state.selectedAmpIndex, member.value)
                }
              }}
            />
          ])}
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <Text>IBW: {this.state.ibw_min === this.state.ibw_max ? this.state.ibw_min.toFixed(1) : this.state.ibw_min.toFixed(1) + ' - ' + this.state.ibw_max.toFixed(1)}</Text>
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
