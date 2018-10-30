import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import RadioGroup from 'react-native-radio-buttons-group'

// Styles
import styles from './Styles/ProteinScreenStyle'

class ProteinScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [
        {
          label: 'Pre-Dialysis: 0.6 - 0.8 gm/kg',
          value: 'LL: 0.6, UL: 0.8'
        },
        {
          label: 'Normal: 0.8 - 1.0 gm/kg',
          value: 'LL: 0.8, UL: 1.0'
        },
        {
          label: 'Older Adult > 65 yrs: 1.0 gm/kg',
          value: 'LL: 1.0, UL: 1.0'
        },
        {
          label: 'CKD w/ Dialysis 1.2 - 1.5 gm/kg',
          value: 'LL: 1.2, UL: 1.5'
        },
        {
          label: 'Pressure Sore: 1.25 - 1.5 gm/kg',
          value: 'LL: 1.25, UL: 1.5'
        },
        {
          label: 'Critical Illness: 1.2 - 2.0 gm/kg',
          value: 'LL: 1.2, UL: 2.0'
        }
      ],
      selectedVal: 'LL: 0.6, UL: 0.8'
    }

    // this.state.data.map(e => { console.log('Constructor: label: ' + e.label + ' value: ' + e.value + ' selected: ' + e.selected) })
    // console.log('incoming protein value: ' + this.props.navigation.state.params.protein)
    let found = false
    var searchSelectedVal = 'LL: ' + this.props.navigation.state.params.protein_min + ', UL: ' + this.props.navigation.state.params.protein_max
    this.state.data.map(e => { if (e.value === searchSelectedVal) { e.selected = true; found = true; this.state.selectedVal = searchSelectedVal; console.log('found matching protein for incoming: ' + e.value) } })
    if (!found) {
      // console.log('no match for incoming protein value ' + this.props.navigation.state.params.protein + ' found, setting ' + this.state.data[0].value + ' to selected')
      this.state.data[0].selected = true
      this.props.navigation.state.params.protein = this.state.data[0].value
    }
  }

  render () {
    console.log('selectedVal: ' + this.state.selectedVal)
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <RadioGroup radioButtons={this.state.data} onPress={(data) => {
            let selectedButton = data.find(e => e.selected === true)
            let newSelectedVal = selectedButton ? selectedButton.value : data[0].value
            this.setState({ selectedVal: newSelectedVal })
          }} />
          <RoundedButton
            onPress={() => {
              let proteinRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/
              let proteinMatch = proteinRegex.exec(this.state.selectedVal)
              let proteinLL = parseFloat(proteinMatch[1])
              let proteinUL = parseFloat(proteinMatch[2])
              this.props.navigation.state.params.protein_min = proteinLL
              this.props.navigation.state.params.protein_max = proteinUL
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

export default connect(mapStateToProps, mapDispatchToProps)(ProteinScreen)
