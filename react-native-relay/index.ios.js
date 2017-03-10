// @flow
import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text
} from 'react-native';
import TodoList from './src/app';
import Relay from 'react-relay';
import config from './config';


Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(config.graphqlurl)
);

class HomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query MainQuery {
        store {
          ${Component.getFragment('store')}
        }
      }
    `,
  }
}

class App extends Component {
  render() {
    return (
      <Relay.RootContainer
        Component={TodoList}
        route={new HomeRoute()}
      />
    );
  }
}

class Sample extends Component {
  render() {
    return (<View>
      <Text>Hola mundo</Text>
    </View>);
  }
}

AppRegistry.registerComponent('todolist', () => Sample);
