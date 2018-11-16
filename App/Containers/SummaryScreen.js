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

    const onRefreshState = (state) => {
      this.setState(state)
    }

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
    }

    const onUpdateProteinState = (state) => {
      this.ProteinState = state
    }

    const onUpdateFluidState = (state) => {
      this.FluidState = state
    }

    const onUpdateIbwState = (state) => {
      this.IbwState = state
    }

    const onUpdateBmiState = (state) => {
      this.BmiState = state
    }

    this.state = {
      gender: 'female',
      age: '0',
      weight_lbs: '0',
      height_ft: '0',
      height_in: '0',
      kcal_min: 0.0,
      kcal_max: 0.0,
      protein_min: 0.0,
      protein_max: 0.0,
      fluid_min: 0.0,
      fluid_max: 0.0,
      ibw_min: 0.0,
      ibw_max: 0.0,
      bmi: 0.0,
      refreshState: onRefreshState,
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
      KcalKg: 'LL: 18.0, UL: 22.0'
    }

    this.ProteinState = {
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

    this.FluidState = {
      formula: 'mlkg',
      mlkgFactors: 'LL: 25.0, UL: 30.0'
    }

    this.IbwState = {
      plegiaVal: 0,
      ampVal: 1.0
    }

    this.BmiState = {
      ampVal: 1.0,
      bmi: 0.0
    }

  }

  onPressFemale = () => {
    this.setState({gender: 'female'})
  }

  onPressMale = () => {
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
              onChangeText={(text) => this.setState({age: text})}
              value={this.state.text} />
            <TextInput
              placeholder='lbs'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => this.setState({weight_lbs: text})}
              value={this.state.text} />
          </View>
          <Text style={styles.LabelBar}>                   Height</Text>
          <View style={styles.container}>
            <TextInput
              placeholder='ft'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => this.setState({height_ft: text})}
              value={this.state.text} />
            <TextInput
              placeholder='in'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={styles.TextInput}
              onChangeText={(text) => this.setState({height_in: text})}
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
              <View key={i} style={{flexBasis: '60%'}}>
                <RoundedButton
                  key={i}
                  onPress={() => this.props.navigation.navigate(name.concat('Screen'), this.state)}>
                  {name}
                </RoundedButton>
              </View>
              <View key={i} style={{flexBasis: '40%'}}>
                <View key={i} style={{padding: '10%'}}>
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
