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
    this.state = props.navigation.state.params.getProteinState()
  }

  convertLbsToKg = (lbs) => {
    return lbs * 0.453592
  }

  componentDidUpdate (prevProps) {
    this.props.navigation.state.params.updateProteinState(this.state)
  }

  render () {
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
              let weightKg = this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs))
              let proteinRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/
              let proteinMatch = proteinRegex.exec(this.state.selectedVal)
              let proteinLL = parseFloat(proteinMatch[1])
              let proteinUL = parseFloat(proteinMatch[2])
              this.props.navigation.state.params.protein_min = proteinLL * weightKg
              this.props.navigation.state.params.protein_max = proteinUL * weightKg
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
