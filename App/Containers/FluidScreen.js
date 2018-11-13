import React, { Component } from 'react'
import { ScrollView, View, Picker, Text } from 'react-native'
import RoundedButton from '../Components/RoundedButton'
import { connect } from 'react-redux'
import update from 'immutability-helper'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/FluidScreenStyle'

class FluidFactors extends React.Component {
  render () {
    const {formula, mlkgFactors, updateMlkgFactors} = this.props
    var factors = null
    var selectedMlkg = mlkgFactors

    if (formula === 'mlkg') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
          <Picker
            selectedValue={selectedMlkg}
            onValueChange={(itemValue, itemIndex) => { selectedMlkg = itemValue; updateMlkgFactors(selectedMlkg) }}>
            <Picker.Item label='25 - 30ml/kg' value='LL: 25.0, UL: 30.0' />
            <Picker.Item label='30 - 35ml/kg' value='LL: 30.0, UL: 35.0' />
          </Picker>
        </View>
    }

    return (<View>{factors}</View>)
  }
}

class FluidScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formula: 'mlkg',
      mlkgFactors: 'LL: 25.0, UL: 30.0'
    }
  }

  updateMlkgFactors = (mlkgFactors) => {
    console.log('updateMlkgFactors, setting mlkgFactors to: ' + mlkgFactors)
    this.setState({mlkgFactors: mlkgFactors})
  }

  convertInToCm = (inches) => {
    return inches * 2.54
  }

  convertLbsToKg = (lbs) => {
    return lbs * 0.453592
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.formula}
            onValueChange={(itemValue, itemIndex) => this.setState({formula: itemValue})}
          >
            <Picker.Item label='ml/kg' value='mlkg' />
            <Picker.Item label='1 ml/kcal' value='mlkcal' />
            <Picker.Item label='Holliday-Seger Method' value='hs' />
          </Picker>
          <FluidFactors
            formula={this.state.formula}
            mlkgFactors={this.state.mlkgFactors}
            updateMlkgFactors={this.updateMlkgFactors}
          />
          <RoundedButton
            onPress={() => {
              var fluid = 0
              var LLULRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/

              if (this.state.formula === 'mlkg') {
                let mlkgMatch = LLULRegex.exec(this.state.mlkgFactors)
                let mlkgLL = parseFloat(mlkgMatch[1])
                let mlkgUL = parseFloat(mlkgMatch[2])
                let weightKg = this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs))
                console.log('calculating mlkg with LL: ' + mlkgLL + ' UL: ' + mlkgUL + ' weightKg: ' + weightKg)
                fluid = {'LL': mlkgLL * weightKg, 'UL': mlkgUL * weightKg}
              } else if (this.state.formula === 'mlkcal') {
                fluid = {'LL': this.props.navigation.state.params.kcal_min, 'UL': this.props.navigation.state.params.kcal_max}
              } else if (this.state.formula === 'hs') {
                let weightKg = this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs))
                let fluidBase = 0.0
                if (weightKg <= 10) {
                  fluidBase = 100.0 * weightKg
                } else if (weightKg <= 20.0) {
                  fluidBase = 1000.0 + (weightKg - 10.0) * 50.0
                } else {
                  if (parseFloat(this.props.navigation.state.params.age) <= 50) {
                    fluidBase = 1500.0 + (weightKg - 20.0) * 20.0
                  } else {
                    fluidBase = 1500.0 + (weightKg - 20.0) * 15.0
                  }
                }
                fluid = {'LL': fluidBase, 'UL': fluidBase}
              }
              console.log('returning fluid: ' + fluid['LL'] + ' - ' + fluid['UL'])
              this.props.navigation.state.params.fluid_min = fluid['LL']
              this.props.navigation.state.params.fluid_max = fluid['UL']
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

export default connect(mapStateToProps, mapDispatchToProps)(FluidScreen)
