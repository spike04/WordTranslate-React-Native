import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';

class Header extends Component {
    render() {
        return(
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        height: 60,
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10
    },
    textStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
};

export default Header;