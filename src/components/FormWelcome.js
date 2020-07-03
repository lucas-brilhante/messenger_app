import React from 'react';
import { Text, Button, View, Image, StyleSheet } from 'react-native';

const welcome = require('../imgs/welcome.png');

const FormWelcome = props => {
    return (
        <View style={styles.principal}>
            <Image source={welcome} style={styles.welcomeImg} resizeMode='contain' />
            <View style={{width: 300, justifyContent: 'space-around'}}>
                <Text style={styles.welcomeTxt}>Bem-Vindo</Text>
                <Button
                    title="Logar"
                    onPress={()=>props.navigation.navigate('Login',{})}
                />
            </View>
        </View>
    );
}

export default FormWelcome;

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-around'
    },
    welcomeTxt: {
        textAlign: 'center',
        fontSize: 22,
        color: '#000',
        padding: 20
    },
    welcomeImg: {
        height: 300,
        width: 300
    }
});