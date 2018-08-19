import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { View, Picker, Text, Slider } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import update from 'immutability-helper'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KcalScreenStyle'

class KcalFactors extends React.Component {
  static propTypes = {
    formula: PropTypes.string.isRequired,
    updateActivity: PropTypes.func.isRequired,
    updateStress: PropTypes.func.isRequired
  }

  render () {
    const {formula, hbFactors, updateHBFactors, mifflinFactors, updateMifflinFactors, KcalKg, updateKcalKg} = this.props
    var factors = null
    var selectedHB = hbFactors
    var selectedMifflin = mifflinFactors
    var selectedKcalKg = KcalKg

    if (formula === 'mifflin') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
          <Text style={styles.LabelBar}>Activity Factor</Text>
          <Picker
            selectedValue={selectedMifflin.activity}
            onValueChange={(itemValue, itemIndex) => { selectedMifflin.activity = itemValue; updateMifflinFactors(selectedMifflin) }}>
            <Picker.Item label='1.200 - sedentary' value={1.2} />
            <Picker.Item label='1.375 - lightly active' value={1.375} />
            <Picker.Item label='1.550 - moderately active' value={1.55} />
            <Picker.Item label='1.725 - very active' value={1.725} />
            <Picker.Item label='1.900 - extra active' value={1.9} />
          </Picker>
        </View>
    } else if (formula === 'hb') {
      factors =
        <View>
          <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
            <Text style={styles.LabelBar}>Activity Factor: {selectedHB.activity.toFixed(1)}</Text>
            <Slider
              minimumValue={1.0}
              maximumValue={1.8}
              step={0.1}
              value={selectedHB.activity}
              onValueChange={(itemValue, itemIndex) => { selectedHB.activity = itemValue; updateHBFactors(selectedHB) }}
            />
          </View>
          <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
            <Text style={styles.LabelBar}>Stress Factor: {selectedHB.stress.toFixed(1)}</Text>
            <Slider
              minimumValue={1.0}
              maximumValue={2.0}
              step={0.1}
              value={selectedHB.stress}
              onValueChange={(itemValue, itemIndex) => { selectedHB.stress = itemValue; updateHBFactors(selectedHB) }}
            />
          </View>
        </View>
    } else if (formula === 'kcalkg') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
          <Picker
            selectedValue={selectedKcalKg}
            onValueChange={(itemValue, itemIndex) => { selectedKcalKg = itemValue; updateKcalKg(selectedKcalKg) }}>
            <Picker.Item label='18 - 22 Kcal/Kg' value={18} />
            <Picker.Item label='20 - 25 Kcal/Kg' value={20} />
            <Picker.Item label='25 - 30 Kcal/Kg' value={25} />
            <Picker.Item label='30 - 35 Kcal/Kg' value={30} />
            <Picker.Item label='35 - 40 Kcal/Kg' value={35} />
          </Picker>
        </View>
    }

    return (<View>{factors}</View>)
  }
}

class KcalScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formula: 'mifflin',
      factors: {'mifflin': {'activity': 1.2}, 'hb': {'activity': 1.0, 'stress': 1.0}},
      KcalKg: 18
    }
  }

// Example of passing state back and forth through react navigation (not sure if it's ok to set this state directly or not, but couldn't get getParam/setParam to work - undefined)
//          onPress={() => { window.alert('Gender: ' + this.props.navigation.state.params.gender + '\nAge: ' + this.props.navigation.state.params.age + '\nWeight: ' + this.props.navigation.state.params.weight + '\nHeight Ft: ' + this.props.navigation.state.params.height_ft + '\nHeight In: ' + this.props.navigation.state.params.height_in); this.props.navigation.state.params.age = 100 }}>

  updateHBFactors = (hbFactors) => {
    console.log('updateHBFactors, setting hb to: ', hbFactors)
    const factorsCopy = update(this.state.factors, {'hb': {$set: hbFactors}})
    this.setState({factors: factorsCopy})
  }

  updateMifflinFactors = (mifflinFactors) => {
    console.log('updateMifflinFactors, setting mifflin to: ', mifflinFactors)
    const factorsCopy = update(this.state.factors, {'mifflin': {$set: mifflinFactors}})
    this.setState({factors: factorsCopy})
  }

  updateKcalKg = (KcalKg) => {
    console.log('updateKcalKg, setting KcalKg to: ', KcalKg)
    this.setState({KcalKg: KcalKg})
  }

  convertInToCm = (inches) => {
    return inches * 2.54
  }

  convertLbsToKg = (lbs) => {
    return lbs * 0.453592
  }

  render () {
    return (
      <View>
        <Picker
          selectedValue={this.state.formula}
          onValueChange={(itemValue, itemIndex) => this.setState({formula: itemValue})}
        >
          <Picker.Item label='Mifflin St. Jeor' value='mifflin' />
          <Picker.Item label='Harris-Benedict' value='hb' />
          <Picker.Item label='Kcal/Kg' value='kcalkg' />
        </Picker>
        <KcalFactors
          formula={this.state.formula}
          hbFactors={this.state.factors.hb}
          updateHBFactors={this.updateHBFactors}
          mifflinFactors={this.state.factors.mifflin}
          updateMifflinFactors={this.updateMifflinFactors}
          KcalKg={this.state.KcalKg}
          updateKcalKg={this.updateKcalKg}
        />
        <RoundedButton
          onPress={() => {
            var bmr

            if (this.state.formula === 'mifflin') {
              var heightIn = this.props.navigation.state.params.height_ft * 12 + this.props.navigation.state.params.height_in
              if (this.props.navigation.state.gender === 'male') {
                // Male: BMR = 10 * weight + 6.25 * height - 5 * age + 5
                bmr = 10.0 * this.convertLbsToKg(this.props.navigation.state.params.weight) +
                      6.25 * this.convertInToCm(heightIn) -
                      5.0 * this.props.navigation.state.params.age +
                      5
              } else if (this.props.navigation.state.gender === 'female') {
                // Female: BMR = 10 * weight + 6.25 * height - 5 * age - 161
                bmr = 10.0 * this.convertLbsToKg(this.props.navigation.state.params.weight) +
                      6.25 * this.convertInToCm(heightIn) -
                      5.0 * this.props.navigation.state.params.age +
                      5
              }
            } else if (this.state.formula === 'hb') {
              if (this.props.navigation.state.gender === 'male') {
                // Male: RMR = 13.75 * weight + 5 * height - 6.75 * age + 66.47
                bmr = 13.75 * this.convertLbsToKg(this.props.navigation.state.params.weight) +
                      5 * this.convertInToCm(heightIn) -
                      6.75 * this.props.navigation.state.params.age +
                      66.47
              } else if (this.props.navigation.state.gender === 'female') {
                // Female: RMR = 9.56 * weight + 1.84 * height - 4.67 * age + 655.09
                bmr = 9.56 * this.convertLbsToKg(this.props.navigation.state.params.weight) +
                      1.84 * this.convertInToCm(heightIn) -
                      4.67 * this.props.navigation.state.params.age +
                      655.09
              }
            } else if (this.state.formula === 'kcalkg') {
            // return directly
              bmr = this.state.KcalKg
            }
            console.log('Button pressed, this.state: ', this.state, 'returning BMR: ', bmr)
// TODO BMR result is undefined for mifflin and hb cases
            this.props.navigation.state.params.bmr = bmr
          }
                  }>
          Calculate
        </RoundedButton>
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(KcalScreen)
