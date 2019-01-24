import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { StackNavigator, Header } from 'react-navigation'
import DisclaimerScreen from '../Containers/DisclaimerScreen'
import BmiScreen from '../Containers/BmiScreen'
import IbwScreen from '../Containers/IbwScreen'
import FluidScreen from '../Containers/FluidScreen'
import ProteinScreen from '../Containers/ProteinScreen'
import KcalScreen from '../Containers/KcalScreen'
import SummaryScreen from '../Containers/SummaryScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import DrawerButton from '../Components/DrawerButton'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LaunchScreen: {
    screen: LaunchScreen,
    navigationOptions: {
      headerTitle: 'LaunchScreen',
    },
  },
  SummaryScreen: {
    screen: SummaryScreen,
    navigationOptions: {
      headerTitle: 'Dietitian\'s Tools',
    },
  },
  KcalScreen: {
    screen: KcalScreen,
    navigationOptions: {
      headerTitle: 'KCAL',
    },
  },
  ProteinScreen: {
    screen: ProteinScreen,
    navigationOptions: {
      headerTitle: 'PROTEIN',
    },
  },
  FluidScreen: {
    screen: FluidScreen,
    navigationOptions: {
      headerTitle: 'FLUID',
    },
  },
  IbwScreen: {
    screen: IbwScreen,
    navigationOptions: {
      headerTitle: 'IBW',
    },
  },
  BmiScreen: {
    screen: BmiScreen,
    navigationOptions: {
      headerTitle: 'BMI',
    },
  },
  DisclaimerScreen: {
    screen: DisclaimerScreen,
    navigationOptions: {
      headerTitle: 'Disclaimer',
    }
  }
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'SummaryScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: {color: 'black'},
    title: 'Dietitian\'s Tools',
    headerRight: (
      <View
        style={{
          height: 45,
          width: 200,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          margin: 0
        }}
        >
        <Image
          style={{height: 45, width: 200}}
          source={require('../../App/Images/header-image.png')}
          resizeMode='contain'
        />
      </View>)
  }
})

export default PrimaryNav
