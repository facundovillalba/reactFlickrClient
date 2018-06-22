import React from 'react';
import UserSetsView from './src/components/UserSetsView';
import PhotosListView from './src/components/PhotosListView';
import { createStackNavigator } from 'react-navigation';

const RootStack = createStackNavigator(
    {
        UserSetsView: UserSetsView,
        PhotosListView: PhotosListView,
    },
    {
        initialRouteName: 'UserSetsView',
        navigationOptions: {
            headerStyle: {
              backgroundColor: '#000',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerMode: 'screen',
          },        
    });
  
export default class App extends React.Component {
    render() {
      return <RootStack />;
    }
}