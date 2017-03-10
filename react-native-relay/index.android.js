// @flow
import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import TodoList from './src/app';
import Relay from 'react-relay';
import config from './config';
import ShowStoreId from './src/Components/Sample';

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
        Component={ShowStoreId}
        route={new HomeRoute()}
        renderFailure={(error) => console.error(error)}
        renderFetched={(data) => {
          // console.log(data);
          // console.log(this.props);
          return <ShowStoreId {...this.props} {...data} />;
        }}
      />
    );
  }
}

AppRegistry.registerComponent('todolist', () => App);