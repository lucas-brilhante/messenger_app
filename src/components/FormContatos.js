import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavigationService from '../NavigationService';

class FormContatos extends Component {
    render(){
        return(
            <View style ={styles.principal}>
                <FlatList
                    data={this.props.contatos}
                    renderItem={({item}) => this.renderFlatList(item.email,item.nome)}
                    keyExtractor={(item,index) => item.email}
                />
            </View>
        );
    }
    renderFlatList(contatoEmail,contatoNome){
        return (
            <TouchableOpacity onPress={() => NavigationService.navigate('EnviarMsg',{ usuarioNome: this.props.usuarioNome , usuarioEmail: this.props.usuarioEmail , contatoNome, contatoEmail })}>
                <View style={{justifyContent: 'space-around', height: 100, backgroundColor: '#fff', borderBottomWidth: 2, borderBottomColor: 'gray'}}>
                    <Text style={{marginLeft: 15, fontSize: 20, fontWeight: 'bold'}}>{contatoNome}</Text>
                    <Text style={{marginLeft: 15, fontSize: 15}}>{contatoEmail}</Text>
                </View>
            </TouchableOpacity>
        );
    }

}

mapStateToProps = state => ({
    contatos: state.AppReducer.contatos,
    usuarioEmail: state.AppReducer.usuarioEmail,
    usuarioNome: state.AppReducer.usuarioNome
});

export default connect(mapStateToProps,{})(FormContatos);

const styles = StyleSheet.create({
    principal: {
        flex: 1,
        backgroundColor: '#D3F1B6'
    }
});