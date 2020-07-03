import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import '@firebase/app';

import { alterarNome, alterarEmail, alterarSenha, logarUsuario, limparDados } from '../actions/AutenticacaoActions.js';

const bg = require('../imgs/bg.png');

class FormLogin extends Component{
    _renderBtn() {
        if( this.props.loading === false ) {
            return (
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <TouchableOpacity onPress={()=>this._logarUsuario()}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTxt}>Logar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        } 
        
        if( this.props.loading === true ) {
            return(
                <View style={{ flex: 2, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#ffff00" />
                </View>
            );
        }
    }

    _logarUsuario() {
        const { email, senha } = this.props;
        this.props.logarUsuario(email, senha);
    }

    componentWillMount() {
        this.props.limparDados();
    }

    render(){
        return (
            <ImageBackground source={bg} style={{width: '100%', height: '100%'}} resizeMode='stretch'>
                <View style={{flex: 1}}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.titulo}>Messeger</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <View style={{backgroundColor: '#transparent', margin: 5}}>
                            <TextInput style={styles.inputTxt} value={this.props.email} onChangeText={texto => this.props.alterarEmail(texto)} placeholder='Email' placeholderTextColor="#777" underlineColorAndroid='#000'/>
                        </View>
                        <View style={{backgroundColor: 'transparent' , margin: 5}}>
                            <TextInput style={styles.inputTxt} value={this.props.senha} onChangeText={texto => this.props.alterarSenha(texto)} placeholder='Senha' placeholderTextColor="#777" underlineColorAndroid='#000'/>
                        </View>
                        <Text style={styles.msgError}>{this.props.msgError}</Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Cadastro',{}) }}>
                            <Text style={styles.cadastrarTxt}>Não tem cadastro? Clique Aqui!</Text>
                        </TouchableOpacity>
                    </View>
                    {this._renderBtn()}
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    msgError: state.AutenticacaoReducer.msgError,
    loading: state.AutenticacaoReducer.loading
})

export default connect(mapStateToProps,{ alterarNome, alterarEmail, alterarSenha, logarUsuario, limparDados })(FormLogin);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center',
        color: '#000'
    },
    inputTxt: {
        fontSize: 20,
        color: '#000'
    },
    cadastrarTxt: {
        fontSize: 17,
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 20
    },
    btn: {
        paddingVertical: 10,
        width: 200,
        backgroundColor: '#43AF65',
        borderWidth: 2,
        borderColor: '#000'
    },
    btnTxt: {
        fontSize: 25,
        textAlign: 'center',
    },
    msgError: {
        fontSize: 18,
        margin: 20,
        color: '#ff0000',
        textAlign:'center'
    }

});
