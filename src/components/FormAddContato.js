import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native';
import { connect } from 'react-redux';
import { modificarEmailContato, adicionarContato, limparTela } from '../actions/AppActions';

class FormAddContato extends Component {
    _renderMsgResposta(){
        return(
            <Text style={styles.msgErro}>{this.props.msgAdicionarContato}</Text>
        );
    }
    _render(){
        if( this.props.contatoCadastrado === true ) {
            return (
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={styles.msgSucesso}>Contato Cadastrado!</Text>
                </View>
            );
        }

        return (
            <View style={styles.principal}>
                <View style={{flex:1, justifyContent:'flex-end'}}>
                    {this._renderMsgResposta()}
                    <TextInput
                        value={this.props.emailContato}
                        onChangeText={(text) => this.props.modificarEmailContato(text)}
                        placeholder="Digite o email do contado."
                        style={{backgroundColor: '#DDDDDD', width: 300, height: 50, borderWidth: 2, borderBottomColor: '#000'}}
                    />
                </View>
                <View style={{flex:1, justifyContent:'flex-start', marginTop: 30}}>
                    <TouchableOpacity onPress={() => this._adicionarContato()}>
                        <View style={styles.btnCadastroLayout}>
                            <Text style={styles.btnCadastroTxt}>Adicionar</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    
    _adicionarContato() {
        const { usuarioEmail, contatoEmail } = this.props;
        this.props.adicionarContato(usuarioEmail, contatoEmail);
    }

    componentWillMount(){
        this.props.limparTela();
    }

    render() {
        return (
            this._render()
        );
    }
}

const mapStateToProps = state => ({
    contatoEmail: state.AppReducer.contatoEmail,
    msgAdicionarContato: state.AppReducer.msgAdicionarContato,
    contatoCadastrado: state.AppReducer.contatoCadastrado,
    usuarioEmail: state.AppReducer.usuarioEmail
})

export default connect(mapStateToProps,{ modificarEmailContato, adicionarContato, limparTela })(FormAddContato);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        backgroundColor: '#D3F1B6',
        alignItems: 'center'
    },
    btnCadastroLayout: {
        backgroundColor: '#00AA00',
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000',
    },
    btnCadastroTxt: {
        fontSize: 15,
        textAlign: 'center'
    },
    msgErro: {
        fontSize: 15,
        textAlign: 'center',
        color: '#ff0000'
    },
    msgSucesso: {
        fontSize: 15,
        textAlign: 'center',
    }
});