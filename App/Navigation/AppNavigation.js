import { StackNavigator } from 'react-navigation'
import SummaryScreen from '../Containers/SummaryScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  SummaryScreen: { screen: SummaryScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SummaryScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
