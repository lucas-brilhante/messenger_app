import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import FormWelcome from './components/FormWelcome';
import FormPrincipal from './components/FormPrincipal';
import FormAddContato from './components/FormAddContato';
import FormEnviarMsg from './components/FormEnviarMsg';

const messeger = createStackNavigator({
    Login: {
        screen: FormLogin,
        navigationOptions: {
            header: null,
        }
    },
    Cadastro: {
        screen: FormCadastro,
        navigationOptions: {
            title: 'Cadastro',
            headerStyle: {
                backgroundColor: '#888888',
            },
            headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: 30,
                textAlign: 'center',
                flex: 1,
            },
            headerRight: <View />,
        }
    },
    Welcome: {
        screen: FormWelcome,
        navigationOptions: {
            header: null,
        }
    },
    Principal: {
        screen: FormPrincipal,
        navigationOptions: {
            header: null
        }
    },
    AddContato: {
        screen: FormAddContato,
        navigationOptions: {
            title: 'Adicionar Contato',
            headerStyle: {
                backgroundColor: '#888888',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 30,
                textAlign: 'center',
                flex: 1,           
            },
            headerRight: <View />
        }
    },
    EnviarMsg: {
        screen: FormEnviarMsg,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#888888',
            },
            headerTitleStyle: { 
                fontWeight: 'bold',
                fontSize: 30,
                textAlign: 'center',
                flex: 1,
            },
            headerRight: <View />
        }
    },
});

export default messeger;