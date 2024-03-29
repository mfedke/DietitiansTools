import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import SplashScreen from '../Containers/SplashScreen'
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
const PrimaryNav = createStackNavigator({
  SplashScreen: {
    screen: SplashScreen,
    navigationOptions: {
      headerStyle: { display: 'none' }
    }
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
  initialRouteName: 'SplashScreen',
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: {color: 'black'},
    title: 'Dietitian\'s Tools',
    headerRight: (
      <View
        style={{
          height: 45,
          width: 200,
          alignItems: 'flex-end',
          justifyContent: 'center',
          borderRadius: 10,
          margin: 0
        }}
        >
        <Image
          style={{height: 50, width: 50, marginRight: 10}}
          source={require('../../App/Images/corner_icon.png')}
          resizeMode='contain'
        />
      </View>)
  }
})

export default createAppContainer(PrimaryNav)
