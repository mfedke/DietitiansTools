import React, { Component } from 'react'
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Button } from 'react-native'
import { connect } from 'react-redux'
import RoundedButton from '../Components/RoundedButton'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SummaryScreenStyle'

const buttons = ['Kcal', 'Protein', 'Fluid', 'Ibw', 'Bmi']

const noop = () => {}

class SummaryScreen extends Component {
  constructor (props) {
    super(props)

    const onGetKcalState = () => {
      return this.KcalState
    }

    const onGetProteinState = () => {
      return this.ProteinState
    }

    const onGetFluidState = () => {
      return this.FluidState
    }

    const onGetIbwState = () => {
      return this.IbwState
    }

    const onGetBmiState = () => {
      return this.BmiState
    }

    const onUpdateKcalState = (state) => {
      this.KcalState = state
      this.runAllCalcs()
      this.setState({kcal_min: this.KcalState.kcal_min, kcal_max: this.KcalState.kcal_max})
    }

    const onUpdateProteinState = (state) => {
      this.ProteinState = state
      this.runAllCalcs()
      this.setState({protein_min: this.ProteinState.protein_min, protein_max: this.ProteinState.protein_max})
    }

    const onUpdateFluidState = (state) => {
      this.FluidState = state
      this.runAllCalcs()
      this.setState({fluid_min: this.FluidState.fluid_min, fluid_max: this.FluidState.fluid_max})
    }

    const onUpdateIbwState = (state) => {
      this.IbwState = state
      this.runAllCalcs()
      this.setState({ibw_min: this.IbwState.ibw_min, ibw_max: this.IbwState.ibw_max})
    }

    const onUpdateBmiState = (state) => {
      this.BmiState = state
      this.runAllCalcs()
      this.setState({bmi: this.BmiState.bmi})
    }

    this.state = {
      gender: 'female',
      age: 0,
      weight_lbs: 0,
      height_ft: 0,
      height_in: 0,
      kcal_min: 0.0,
      kcal_max: 0.0,
      protein_min: 0.0,
      protein_max: 0.0,
      fluid_min: 0.0,
      fluid_max: 0.0,
      ibw_min: 0.0,
      ibw_max: 0.0,
      bmi: 0.0,
      getKcalState: onGetKcalState,
      updateKcalState: onUpdateKcalState,
      getProteinState: onGetProteinState,
      updateProteinState: onUpdateProteinState,
      getFluidState: onGetFluidState,
      updateFluidState: onUpdateFluidState,
      getIbwState: onGetIbwState,
      updateIbwState: onUpdateIbwState,
      getBmiState: onGetBmiState,
      updateBmiState: onUpdateBmiState
    }

    /* Store sub page state here in Summary Page so it can be maintained while navigating around */
    this.KcalState = {
      formula: 'mifflin',
      factors: {'mifflin': {'activity': 1.2}, 'hb': {'activity': 1.0, 'stress': 'No stress - LL: 1.0, UL: 1.0'}},
      KcalKg: 'LL: 18.0, UL: 22.0',
      kcal_min: 0.0,
      kcal_max: 0.0
    }

    this.ProteinState = {
      data: [
        {
          label: 'Pre-Dialysis: 0.6 - 0.8 gm/kg',
          value: 'LL: 0.6, UL: 0.8'
        },
        {
          label: 'Normal: 0.8 - 1.0 gm/kg',
          value: 'LL: 0.8, UL: 1.0',
          selected: true
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
      selectedVal: 'LL: 0.8, UL: 1.0',
      protein_min: 0.0,
      protein_max: 0.0
    }

    this.FluidState = {
      formula: 'mlkg',
      mlkgFactors: 'LL: 25.0, UL: 30.0',
      fluid_min: 0.0,
      fluid_max: 0.0
    }

    this.IbwState = {
      plegiaVal: 0,
      ampVal: 1.0,
      ibw_min: 0.0,
      ibw_max: 0.0
    }

    this.BmiState = {
      ampVal: 1.0,
      bmi: 0.0
    }
  }

  runAllCalcs () {
    if (this.state.height_ft !== 0) {
      this.calcKcal()
      // set kcal immediately since Fluid calc may need to reference it
      this.state.kcal_min = this.KcalState.kcal_min
      this.state.kcal_max = this.KcalState.kcal_max
      this.calcIbw()
      this.setState(
        {
          ibw_min: this.IbwState.ibw_min,
          ibw_max: this.IbwState.ibw_max,
          kcal_min: this.KcalState.kcal_min,
          kcal_max: this.KcalState.kcal_max
        })
    }
    if (this.state.weight !== 0) {
      this.calcFluid()
      this.calcProtein()
      this.setState(
        {
          fluid_min: this.FluidState.fluid_min,
          fluid_max: this.FluidState.fluid_max,
          protein_min: this.ProteinState.protein_min,
          protein_max: this.ProteinState.protein_max
        })
    }
    if ((this.state.height_ft !== 0) && (this.state.weight_lbs !== 0)) {
      this.calcBmi()
      this.setState({bmi: this.BmiState.bmi})
    }
  }

  convertLbsToKg = (lbs) => {
    return lbs * 0.453592
  }

  convertInToCm = (inches) => {
    return inches * 2.54
  }

  calcKcal () {
    var bmrBase = 0
    var bmr = 0
    var heightIn = this.state.height_ft * 12.0 + this.state.height_in
    var LLULRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/

    if (this.KcalState.formula === 'mifflin') {
      if (this.state.gender === 'male') {
        // Male: BMR = 10 * weight + 6.25 * height - 5 * age + 5
        bmrBase = 10.0 * this.convertLbsToKg(this.state.weight_lbs) +
                  6.25 * this.convertInToCm(heightIn) -
                  5.0 * parseFloat(this.state.age) +
                  5
      } else if (this.state.gender === 'female') {
        // Female: BMR = 10 * weight + 6.25 * height - 5 * age - 161
        bmrBase = 10.0 * this.convertLbsToKg(this.state.weight_lbs) +
                  6.25 * this.convertInToCm(heightIn) -
                  5.0 * parseFloat(this.state.age) -
                  161
      }
      var bmrBoth = bmrBase * this.KcalState.factors['mifflin']['activity']
      bmr = {'LL': bmrBoth, 'UL': bmrBoth}
    } else if (this.KcalState.formula === 'hb') {
      if (this.state.gender === 'male') {
        // Male: RMR = 13.75 * weight + 5 * height - 6.75 * age + 66.47
        bmrBase = 13.75 * this.convertLbsToKg(this.state.weight_lbs) +
                  5 * this.convertInToCm(heightIn) -
                  6.75 * parseFloat(this.state.age) +
                  66.47
      } else if (this.state.gender === 'female') {
        // Female: RMR = 9.56 * weight + 1.84 * height - 4.67 * age + 655.09
        bmrBase = 9.56 * this.convertLbsToKg(this.state.weight_lbs) +
                  1.84 * this.convertInToCm(heightIn) -
                  4.67 * parseFloat(this.state.age) +
                  655.09
      }
      let stressMatch = LLULRegex.exec(this.KcalState.factors['hb']['stress'])
      let stressLL = parseFloat(stressMatch[1])
      let stressUL = parseFloat(stressMatch[2])
      bmr = {'LL': bmrBase * this.KcalState.factors['hb']['activity'] * stressLL, 'UL': bmrBase * this.KcalState.factors['hb']['activity'] * stressUL}
    } else if (this.KcalState.formula === 'kcalkg') {
      let kcalkgMatch = LLULRegex.exec(this.KcalState.KcalKg)
      let kcalkgLL = parseFloat(kcalkgMatch[1])
      let kcalkgUL = parseFloat(kcalkgMatch[2])
      let weightKg = this.convertLbsToKg(this.state.weight_lbs)
      bmr = {'LL': kcalkgLL * weightKg, 'UL': kcalkgUL * weightKg}
    }
    this.KcalState.kcal_min = bmr['LL']
    this.KcalState.kcal_max = bmr['UL']
  }

  calcProtein () {
    let weightKg = this.convertLbsToKg(this.state.weight_lbs)
    let proteinRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/
    let proteinMatch = proteinRegex.exec(this.ProteinState.selectedVal)
    this.ProteinState.protein_min = parseFloat(proteinMatch[1]) * weightKg
    this.ProteinState.protein_max = parseFloat(proteinMatch[2]) * weightKg
  }

  calcFluid () {
    var fluid = 0
    var LLULRegex = /LL: ([0-9\.]+), UL: ([0-9\.]+)/

    if (this.FluidState.formula === 'mlkg') {
      let mlkgMatch = LLULRegex.exec(this.FluidState.mlkgFactors)
      let mlkgLL = parseFloat(mlkgMatch[1])
      let mlkgUL = parseFloat(mlkgMatch[2])
      let weightKg = this.convertLbsToKg(this.state.weight_lbs)
      fluid = {'LL': mlkgLL * weightKg, 'UL': mlkgUL * weightKg}
    } else if (this.FluidState.formula === 'mlkcal') {
      fluid = {'LL': this.state.kcal_min, 'UL': this.state.kcal_max}
    } else if (this.FluidState.formula === 'hs') {
      let weightKg = this.convertLbsToKg(this.state.weight_lbs)
      let fluidBase = 0.0
      if (weightKg <= 10) {
        fluidBase = 100.0 * weightKg
      } else if (weightKg <= 20.0) {
        fluidBase = 1000.0 + (weightKg - 10.0) * 50.0
      } else {
        if (parseFloat(this.state.age) <= 50) {
          fluidBase = 1500.0 + (weightKg - 20.0) * 20.0
        } else {
          fluidBase = 1500.0 + (weightKg - 20.0) * 15.0
        }
      }
      fluid = {'LL': fluidBase, 'UL': fluidBase}
    }

    this.FluidState.fluid_min = fluid['LL']
    this.FluidState.fluid_max = fluid['UL']
  }

  calcIbw () {
    var ibwBase = 0.0
    var heightIn = this.state.height_ft * 12.0 + this.state.height_in

    console.log('in calcIbw, gender: ' + this.state.gender)

    if (this.state.gender === 'male') {
      if (heightIn <= 60) {
        ibwBase = 106 - (60 - heightIn) * 2.5
      } else {
        ibwBase = 106 + (heightIn - 60) * 6.0
      }
    } else {
      if (heightIn <= 60) {
        ibwBase = 100 - (60 - heightIn) * 2.5
      } else {
        ibwBase = 100 + (heightIn - 60) * 5.0
      }
    }

    this.IbwState.ibw_min = (ibwBase * 0.9 - this.IbwState.plegiaVal) * this.IbwState.ampVal
    this.IbwState.ibw_max = (ibwBase * 1.1 - this.IbwState.plegiaVal) * this.IbwState.ampVal
  }

  calcBmi () {
    var heightIn = this.state.height_ft * 12.0 + this.state.height_in
    this.BmiState.bmi = 703.0 * (this.state.weight_lbs / (heightIn * heightIn)) * this.BmiState.ampVal
  }

  onPressFemale = () => {
    this.state.gender = 'female'
    this.runAllCalcs()
    this.setState({gender: 'female'})
  }

  onPressMale = () => {
    this.state.gender = 'male'
    this.runAllCalcs()
    this.setState({gender: 'male'})
  }

  render () {
    var calculatedValStrings = {
      'Kcal': this.state.kcal_min.toFixed(1) + ' - ' + this.state.kcal_max.toFixed(1),
      'Protein': this.state.protein_min.toFixed(1) + ' - ' + this.state.protein_max.toFixed(1),
      'Fluid': this.state.fluid_min.toFixed(1) + ' - ' + this.state.fluid_max.toFixed(1),
      'Ibw': this.state.ibw_min.toFixed(1) + ' - ' + this.state.ibw_max.toFixed(1),
      'Bmi': this.state.bmi.toFixed(1)
    }

    return (
      <ScrollView>
        { /* this is an inline JSX comment */ }
        <View>
          <View style={styles.TopMessage}>
            <Text style={styles.BareTextBold}>Enter the following data:</Text>
          </View>
          <Text style={styles.LabelBar}>                   Age                                                     Weight</Text>
          <View style={styles.container}>
            <TextInput
              placeholder='years'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => {
                this.state.age = parseFloat(text)
                this.runAllCalcs()
              }}
              value={this.state.text} />
            <TextInput
              placeholder='lbs'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => {
                this.state.weight_lbs = parseFloat(text)
                this.runAllCalcs()
              }}
              value={this.state.text} />
          </View>
          <Text style={styles.LabelBar}>                   Height</Text>
          <View style={styles.container}>
            <TextInput
              placeholder='ft'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => {
                this.state.height_ft = parseFloat(text)
                this.runAllCalcs()
              }}
              value={this.state.text} />
            <TextInput
              placeholder='in'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => {
                this.state.height_in = parseFloat(text)
                this.runAllCalcs()
              }}
              value={this.state.text} />
          </View>
          <Text style={styles.LabelBar}>                   Gender</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center', alignItems: 'center', height: 114, width: undefined}}>
            <TouchableOpacity onPress={this.onPressFemale}>
              <View style={{borderBottomWidth: 4, borderColor: this.state.gender === 'female' ? 'gray' : 'rgba(0, 0, 0, 0)'}}>
                <View style={{padding: 5}}>
                  <Image
                    source={require('../../App/Images/female45x100.png')}
                    style={{width: 40, height: 100}}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onPressMale}>
              <View style={{borderBottomWidth: 4, borderColor: this.state.gender === 'male' ? 'gray' : 'rgba(0, 0, 0, 0)'}}>
                <View style={{padding: 5}}>
                  <Image
                    source={require('../../App/Images/male45x100.png')}
                    style={{width: 40, height: 100}}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>
          {buttons.map((name, i) => [
            <View key={i} style={{flex: 1, flexDirection: 'row'}}>
              <View key={i + 10} style={{flexBasis: '60%'}}>
                <RoundedButton
                  key={i + 20}
                  onPress={() => this.props.navigation.navigate(name.concat('Screen'), this.state)}>
                  {name}
                </RoundedButton>
              </View>
              <View key={i + 30} style={{flexBasis: '40%'}}>
                <View key={i + 40} style={{padding: '10%'}}>
                  <Button title={calculatedValStrings[name]} disabled onPress={noop} />
                </View>
              </View>
            </View>
          ])}
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

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen)
