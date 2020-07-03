import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../NavigationService';

class FormConversas extends Component {
    render(){
        return (
            <View style ={styles.principal}>
                <FlatList
                    data={this.props.conversas}
                    renderItem={({item}) => this.renderFlatList(item.nome, item.email, item.ultimaMensagem)}
                    keyExtractor={(item,index) => item.email}
                />
            </View>
        );
    }

    renderFlatList(contatoNome, contatoEmail, ultimaMensagem){
        return (
            <TouchableOpacity onPress={() => NavigationService.navigate('EnviarMsg',{ usuarioNome: this.props.usuarioNome , usuarioEmail: this.props.usuarioEmail , contatoNome, contatoEmail })}>
                <View style={{justifyContent: 'space-around', height: 100, backgroundColor: '#fff', borderBottomWidth: 2, borderBottomColor: 'gray'}}>
                    <Text style={{marginLeft: 15, fontSize: 20, fontWeight: 'bold'}}>{contatoNome}</Text>
                    <Text style={{marginLeft: 15, fontSize: 15}}>{ultimaMensagem}</Text>
                    <Text style={{marginLeft: 15, fontSize: 12}}>{contatoEmail}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

mapStateToProps = state => ({
    conversas: state.AppReducer.conversas,
    usuarioNome: state.AppReducer.usuarioNome,
    usuarioEmail: state.AppReducer.usuarioEmail
});

export default connect(mapStateToProps,{})(FormConversas);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        backgroundColor: '#D3F1B6'
    }
});