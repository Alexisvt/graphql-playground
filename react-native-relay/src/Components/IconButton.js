import React, { PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';


export const IconButton = ({ onPress, iconName, iconColor, iconStyle }) => (
  <TouchableOpacity onPress={onPress} style={{ alignItems: 'center', alignSelf: 'center' }}>
    <Icon name={iconName} color={iconColor} style={iconStyle} />
  </TouchableOpacity>
);