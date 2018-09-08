import React, { Component } from 'react'
import { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
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
          value: 0.6
        },
        {
          label: 'Normal: 0.8 - 1.0 gm/kg',
          value: 0.8
        },
        {
          label: 'Older Adult > 65 yrs: 1.0 gm/kg',
          value: 1.0
        },
        {
          label: 'CKD w/ Dialysis 1.2 - 1.5 gm/kg',
          value: 1.2
        },
        {
          label: 'Pressure Sore: 1.25 - 1.5 gm/kg',
          value: 1.25
        },
        {
          label: 'Critical Illness: 1.2 - 2.0 gm/kg',
          value: 1.3
        }
      ]
    }

    // this.state.data.map(e => { console.log('Constructor: label: ' + e.label + ' value: ' + e.value + ' selected: ' + e.selected) })
    // console.log('incoming protein value: ' + this.props.navigation.state.params.protein)
    let found = false
    this.state.data.map(e => { if (e.value === this.props.navigation.state.params.protein) { e.selected = true; found = true; console.log('found matching protein for incoming: ' + e.value) } })
    if (!found) {
      // console.log('no match for incoming protein value ' + this.props.navigation.state.params.protein + ' found, setting ' + this.state.data[0].value + ' to selected')
      this.state.data[0].selected = true
      this.props.navigation.state.params.protein = this.state.data[0].value
    }
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.container}>
          <RadioGroup radioButtons={this.state.data} onPress={(data) => {
            let selectedButton = data.find(e => e.selected === true)
            selectedButton = selectedButton ? selectedButton.value : data[0].value
            this.setState({ data })
            this.props.navigation.state.params.protein = selectedButton
          }} />
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
