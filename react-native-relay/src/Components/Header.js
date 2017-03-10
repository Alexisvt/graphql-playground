// @flow
import React, { PropTypes } from 'react';
import {
  Text, View, StyleSheet
} from 'react-native';

export const Header = ({ headerText }) => {
  return (
    <View style={[styles.container]} >
      <Text style={[styles.header]}> {headerText} </Text>
    </View>
  );
};

Header.propTypes = {
  headerText: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
  },
  container: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 3, //shadow or material z-index on android
    position: 'relative'
  },
});