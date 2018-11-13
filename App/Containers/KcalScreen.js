import React, { Component } from 'react'
import { View, Picker, Text } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
import update from 'immutability-helper'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/KcalScreenStyle'

class KcalFactors extends React.Component {
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
            <Picker
              selectedValue={selectedHB.activity}
              onValueChange={(itemValue, itemIndex) => { selectedHB.activity = itemValue; updateHBFactors(selectedHB) }}>
              <Picker.Item label='1.0 - comatose, motionless' value={1.0} />
              <Picker.Item label='1.2 - in bed, bed to chair' value={1.2} />
              <Picker.Item label='1.3 - hospitalized ambulatory' value={1.3} />
              <Picker.Item label='1.5 - regular exercise' value={1.5} />
              <Picker.Item label='1.8 - strenuous activity' value={1.8} />
            </Picker>
          </View>
          <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
            <Text style={styles.LabelBar}>Stress Factor: {selectedHB.stress}</Text>
            <Picker
              selectedValue={selectedHB.stress}
              onValueChange={(itemValue, itemIndex) => { selectedHB.stress = itemValue; updateHBFactors(selectedHB) }}>
              <Picker.Item label='1.0 - No stress' value='No stress - LL: 1.0, UL: 1.0' />
              <Picker.Item label='1.0 - 1.2: Minor Surgery' value='Minor Surgery - LL: 1.0, UL: 1.2' />
              <Picker.Item label='1.1 - 1.3: Major Surgery' value='Major Surgery - LL: 1.1, UL: 1.3' />
              <Picker.Item label='1.1 - 1.6: Skeletal Trauma' value='Skeletal Trauma - LL: 1.1, UL: 1.6' />
              <Picker.Item label='1.6 - 1.8: Head Trauma' value='Head Trauma - LL: 1.6, UL: 1.8' />
              <Picker.Item label='1.0 - 1.2: Mild Infection' value='Mild Infection - LL: 1.0, UL: 1.2' />
              <Picker.Item label='1.2 - 1.4: Moderate Infection' value='Moderate Infection - LL: 1.2, UL: 1.4' />
              <Picker.Item label='1.4 - 1.8: Severe Infection' value='Severe Infection - LL: 1.4, UL: 1.8' />
              <Picker.Item label='1.2 - 1.5: <20% BSA Burn' value='<20% BSA Burn - LL: 1.2, UL: 1.5' />
              <Picker.Item label='1.5 - 1.8: 20% - 40% BSA Burn' value='20% - 40% BSA Burn - LL: 1.5, UL: 1.8' />
              <Picker.Item label='1.8 - 2.0: >40% BSA Burn' value='>40% BSA Burn - LL: 1.8, UL: 2.0' />
            </Picker>
          </View>
        </View>
    } else if (formula === 'kcalkg') {
      factors =
        <View paddingLeft='5%' paddingRight='5%' paddingTop='5%' paddingBottom='10%'>
          <Picker
            selectedValue={selectedKcalKg}
            onValueChange={(itemValue, itemIndex) => { selectedKcalKg = itemValue; updateKcalKg(selectedKcalKg) }}>
            <Picker.Item label='18 - 22 Kcal/Kg' value='LL: 18, UL: 22' />
            <Picker.Item label='20 - 25 Kcal/Kg' value='LL: 20, UL: 25' />
            <Picker.Item label='25 - 30 Kcal/Kg' value='LL: 25, UL: 30' />
            <Picker.Item label='30 - 35 Kcal/Kg' value='LL: 30, UL: 35' />
            <Picker.Item label='35 - 40 Kcal/Kg' value='LL: 35, UL: 40' />
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
      factors: {'mifflin': {'activity': 1.2}, 'hb': {'activity': 1.0, 'stress': 'No stress - LL: 1.0, UL: 1.0'}},
      KcalKg: 'LL: 18.0, UL: 22.0'
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
            var bmrBase = 0
            var bmr = 0
            var heightIn = parseFloat(this.props.navigation.state.params.height_ft) * 12.0 + parseFloat(this.props.navigation.state.params.height_in)
            var LLULRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/

            if (this.state.formula === 'mifflin') {
              if (this.props.navigation.state.params.gender === 'male') {
                // Male: BMR = 10 * weight + 6.25 * height - 5 * age + 5
                bmrBase = 10.0 * this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs)) +
                          6.25 * this.convertInToCm(heightIn) -
                          5.0 * parseFloat(this.props.navigation.state.params.age) +
                          5
              } else if (this.props.navigation.state.params.gender === 'female') {
                // Female: BMR = 10 * weight + 6.25 * height - 5 * age - 161
                bmrBase = 10.0 * this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs)) +
                          6.25 * this.convertInToCm(heightIn) -
                          5.0 * parseFloat(this.props.navigation.state.params.age) -
                          161
              }
              var bmrBoth = bmrBase * this.state.factors['mifflin']['activity']
              bmr = {'LL': bmrBoth, 'UL': bmrBoth}
            } else if (this.state.formula === 'hb') {
              if (this.props.navigation.state.params.gender === 'male') {
                // Male: RMR = 13.75 * weight + 5 * height - 6.75 * age + 66.47
                bmrBase = 13.75 * this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs)) +
                          5 * this.convertInToCm(heightIn) -
                          6.75 * parseFloat(this.props.navigation.state.params.age) +
                          66.47
              } else if (this.props.navigation.state.params.gender === 'female') {
                // Female: RMR = 9.56 * weight + 1.84 * height - 4.67 * age + 655.09
                bmrBase = 9.56 * this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs)) +
                          1.84 * this.convertInToCm(heightIn) -
                          4.67 * parseFloat(this.props.navigation.state.params.age) +
                          655.09
              }
              let stressMatch = LLULRegex.exec(this.state.factors['hb']['stress'])
              let stressLL = parseFloat(stressMatch[1])
              let stressUL = parseFloat(stressMatch[2])
              bmr = {'LL': bmrBase * this.state.factors['hb']['activity'] * stressLL, 'UL': bmrBase * this.state.factors['hb']['activity'] * stressUL}
            } else if (this.state.formula === 'kcalkg') {
              let kcalkgMatch = LLULRegex.exec(this.state.KcalKg)
              let kcalkgLL = parseFloat(kcalkgMatch[1])
              let kcalkgUL = parseFloat(kcalkgMatch[2])
              let weightKg = this.convertLbsToKg(parseFloat(this.props.navigation.state.params.weight_lbs))
              bmr = {'LL': kcalkgLL * weightKg, 'UL': kcalkgUL * weightKg}
              this.props.navigation.state.params.kcal_min = bmr['LL']
              this.props.navigation.state.params.kcal_max = bmr['UL']
            }
            console.log('returning BMR: ' + bmr['LL'] + ' - ' + bmr['UL'])
            this.props.navigation.state.params.bmr_min = bmr['LL']
            this.props.navigation.state.params.bmr_max = bmr['UL']
            // call refreshState to ensure that the main screen redraws with all these updated state params
            this.props.navigation.state.params.refreshState(this.props.navigation.state.params)
          }}>
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
