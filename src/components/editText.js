import React, {Component} from 'react';
import {
    TextInput
} from 'react-native';

export default EditText = (props) =>  {
    return(
        <TextInput 
            style={styles.wordTextInput}
            placeholder='Enter a word to translate'
            onChangeText={props.onWordChange}
            />
    );
}

const styles = {
    wordTextInput: {
        padding: 10,
        fontSize: 18,
    }
}