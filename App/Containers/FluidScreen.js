import React, { Component } from 'react'
import { ScrollView, View, Picker, Text } from 'react-native'
import { connect } from 'react-redux'
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
    this.state = props.navigation.state.params.getFluidState()
  }

  updateMlkgFactors = (mlkgFactors) => {
    this.notifySummaryPage (this.state.formula, mlkgFactors)
  }

  notifySummaryPage (formula, mlkgFactors) {
    // first, send the new state to the Summary page so it can run the calculation on this new state
    this.state.formula = formula
    this.state.mlkgFactors = mlkgFactors
    this.props.navigation.state.params.updateFluidState(this.state)
    // then, pull the calc results back here to update this page with the most current results
    let tmp = this.props.navigation.state.params.getFluidState()
    this.setState({formula: formula, mlkgFactors: mlkgFactors, fluid_min: tmp.fluid_min, fluid_max: tmp.fluid_max})
  }

  render () {
    return (
      <ScrollView>
        <View>
          <Picker
            selectedValue={this.state.formula}
            onValueChange={(itemValue, itemIndex) => this.notifySummaryPage(itemValue, this.state.mlkgFactors)}
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
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', borderWidth: 1, height: 30, width: '80%'}}>
            <Text>Fluid: {this.state.fluid_min.toFixed(1)} - {this.state.fluid_max.toFixed(1)}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(FluidScreen)
