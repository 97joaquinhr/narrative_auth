import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SurveyCompletedScreen from './src/screens/SurveyCompletedScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import FinishedScreen from './src/screens/FinishedScreen';

const stackNav = createStackNavigator({
  Survey: {
      screen: SurveyScreen
  },
  SurveyCompleted: {
      screen: SurveyCompletedScreen
  },
  Finished:{
      screen: FinishedScreen
  }
});

const AppContainer = createAppContainer(stackNav);

export default AppContainer;
