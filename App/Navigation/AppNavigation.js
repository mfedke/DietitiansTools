import { StackNavigator } from 'react-navigation'
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
      headerTitle: 'Dietitian\'s Tools - LaunchScreen',
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
      headerTitle: 'Dietitian\'s Tools - KCALScreen',
    },
  },
  ProteinScreen: {
    screen: ProteinScreen,
    navigationOptions: {
      headerTitle: 'Dietitian\'s Tools - PROTEINScreen',
    },
  },
  FluidScreen: {
    screen: FluidScreen,
    navigationOptions: {
      headerTitle: 'Dietitian\'s Tools - FLUIDScreen',
    },
  },
  IbwScreen: {
    screen: IbwScreen,
    navigationOptions: {
      headerTitle: 'Dietitian\'s Tools - IBWScreen',
    },
  },
  BmiScreen: {
    screen: BmiScreen,
    navigationOptions: {
      headerTitle: 'Dietitian\'s Tools - BMIScreen',
    },
  },
}, {
  // Default config for all screens
  headerMode: 'float',
  initialRouteName: 'SummaryScreen',
  navigationOptions: {
    headerStyle: styles.header,
    title: 'Dietitian\'s Tools'
  }
})

export default PrimaryNav
