import React, { Component } from 'react';
import { View, Text, TextInput, ImageBackground, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { alterarNome, alterarEmail, alterarSenha, cadastrarUsuario, limparDados } from '../actions/AutenticacaoActions.js';

const bg = require('../imgs/bg.png');

class FormCadastro extends Component {

    _renderBtn(){
        if(this.props.loading === false)
            return(
                <View style={{ margin: 10 }}>
                    <TouchableOpacity onPress={() => this._cadastrarUsuario()}>
                        <View style={styles.btn}>
                            <Text style={styles.btnTxt}>Cadastrar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        
        if(this.props.loading === true)
            return(
                <View style={{ margin: 10 }}>
                    <ActivityIndicator size="large" color="#ffff00" />
                </View>
            );
    }

    _cadastrarUsuario(){
        const { nome, email, senha } = this.props;
        this.props.cadastrarUsuario(nome, email, senha);
    }

    componentWillMount() {
        this.props.limparDados();
    }

    render(){
        return (
            <ImageBackground source={bg} style={{width: '100%', height: '100%'}} resizeMode='stretch'>
                <View style={{flex: 1}}>
                    <View style={{ margin: 10 }}>
                        <TextInput style={styles.inputTxt} value={this.props.nome} onChangeText={texto => this.props.alterarNome(texto)} placeholder='Nome' underlineColorAndroid='#000'/>
                        <TextInput style={styles.inputTxt} value={this.props.email} onChangeText={texto => this.props.alterarEmail(texto)} placeholder='Email' underlineColorAndroid='#000'/>
                        <TextInput style={styles.inputTxt} value={this.props.senha} onChangeText={texto => this.props.alterarSenha(texto)} placeholder='Senha' underlineColorAndroid='#000'/>
                    </View>
                    <View style={{height: 45}}>
                        <Text style={styles.msgErro}>{this.props.msgError}</Text>
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

export default connect(mapStateToProps,{ alterarNome, alterarEmail, alterarSenha, cadastrarUsuario, limparDados })(FormCadastro);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
    },
    titulo: {
        fontSize: 25,
        textAlign: 'center'
    },
    inputTxt: {
        fontSize: 20
    },
    cadastrarTxt: {
        fontSize: 15
    },
    btn: {
        padding: 10,
        backgroundColor: 'blue',
        borderWidth: 2,
        borderColor: '#000'
    },
    btnTxt: {
        fontSize: 25,
        textAlign: 'center'
    },
    msgErro: {
        fontSize: 20,
        color: 'red',
        textAlign: 'center'
    }

});