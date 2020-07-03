import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { modificarMensagem, enviarMensagem, carregarMensagens } from '../actions/ConversaAction';

class FormEnviarMsg extends Component {
    static navigationOptions = ({ navigation }) => ({ 
        title: navigation.state.params.contatoNome
    });

    componentWillMount() {
        const usuarioEmail = this.props.navigation.state.params.usuarioEmail;
        const usuarioNome = this.props.navigation.state.params.usuarioNome;
        const contatoEmail = this.props.navigation.state.params.contatoEmail;
        const contatoNome = this.props.navigation.state.params.contatoNome;

        this.props.carregarMensagens(usuarioEmail, usuarioNome, contatoEmail, contatoNome);
    }

    renderFlatList(mensagem, tipo){
        if( tipo === 'E')
            return (
                <View style={{ flexDirection:'row' }}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, alignItems:'flex-end'}}>
                        <Text style={styles.msgEnviada}>{mensagem}</Text>
                    </View>
                </View>
            );
        if( tipo === 'R')    
            return (
                <View style={{ flexDirection:'row'}}>
                    <View style={{flex: 1, alignItems:'flex-start'}}>
                        <Text style={styles.msgRecebida}>{mensagem}</Text>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
            );
    }

    render(){
        const { mensagens, mensagem, contatoNome, contatoEmail, usuarioNome, usuarioEmail } = this.props; 
        return (
            <View style={styles.principal}>
                <View style={{flex: 6}}>
                    <FlatList
                        data={mensagens}
                        renderItem={({item}) => this.renderFlatList(item.mensagem, item.tipo)}
                        keyExtractor={(item,index) => index+item.mensagem  }
                    />
                </View>
                <View style={{flex: 1, justifyContent: 'center', flexDirection: 'row', backgroundColor: '#CCCCCC'}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <TextInput
                            value={this.props.mensagem}
                            onChangeText={mensagem => this.props.modificarMensagem(mensagem)}
                            placeholder= "Digite uma mensagem2.."
                            style={{height: 40, backgroundColor: '#FFF', borderWidth:1, borderColor:'#000', justifyContent:'center'}}
                        />
                    </View>
                    <View style={{alignItems: 'flex-end', justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>this.props.enviarMensagem(mensagem, contatoEmail, contatoNome, usuarioEmail, usuarioNome)}>
                            <View style={styles.btnEnviar}>
                                <Text style={styles.btnTxt}>Enviar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    mensagem: state.ConversaReducer.mensagem,
    contatoNome: state.ConversaReducer.contatoNome,
    contatoEmail: state.ConversaReducer.contatoEmail,
    usuarioNome: state.ConversaReducer.usuarioNome,
    usuarioEmail: state.ConversaReducer.usuarioEmail,
    mensagens: state.ConversaReducer.mensagens
});

export default connect(mapStateToProps, { modificarMensagem, enviarMensagem, carregarMensagens })(FormEnviarMsg);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        backgroundColor: '#D3F1B6',
    },
    btnEnviar: {
        height: 41,
        width: 120,
        backgroundColor: '#00DD00',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000'
    },
    btnTxt: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    msgEnviada: {
        backgroundColor:'#00FF00', 
        margin: 3,
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 20,
        marginRight: 20,
        elevation: 1
    },
    msgRecebida: {
        backgroundColor:'#fff', 
        margin: 3,
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 10,
        paddingVertical: 2,
        fontSize: 20,
        marginLeft: 20,
        elevation: 1
    }
});

