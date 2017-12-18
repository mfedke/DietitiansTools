import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton'

// Styles
import styles from './Styles/LaunchScreenStyles'

const buttons = ['KCAL', 'PROTEIN', 'FLUID', 'IBW', 'BMI']

export default class SummaryScreen extends Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.section} >
            {buttons.map(name => <RoundedButton>{name}</RoundedButton>)}
          </View>
        </ScrollView>
      </View>
    )
  }
}
