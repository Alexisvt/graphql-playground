import * as React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';


interface IInput {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    onSubmitEditing?: (event: { nativeEvent:{ text: string; } }) => void;
    placeholder?: string;
    secureTextEntry?: boolean;

}

export const Input: React.StatelessComponent<IInput> = (props) => {
    return (
        <View style={[styles.containerStyle]}>
            <Text style={[styles.labelStyle]} > {props.label}</Text>
            <TextInput
                placeholder={props.placeholder}
                autoCorrect={false}
                style={[styles.inputStyle]}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                onSubmitEditing={props.onSubmitEditing}/>
        </View>
    );
}

const styles = StyleSheet.create({
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: "center"
    }
});