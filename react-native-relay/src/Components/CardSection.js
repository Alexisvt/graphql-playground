// @flow
import React, { PropTypes } from 'react';
import {
  View, StyleSheet
} from 'react-native';

export const CardSection = ({ children, style }) => {
  return (
    <View style={[styles.containerStyle, style]} >
      {children}
    </View>
  );
};

CardSection.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
});