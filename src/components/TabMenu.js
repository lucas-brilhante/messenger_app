import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { TabBar } from 'react-native-tab-view';
import NavigationService from '../NavigationService';
import { connect } from 'react-redux';
import { deslogar } from '../actions/AutenticacaoActions';
import firebase from 'react-native-firebase';

const addImg = require('../imgs/add.png');
const logoutImg = require('../imgs/logout.png');

class TabMenu extends Component {

    deslogar(){
        firebase.auth().signOut().then( () => {
            this.props.deslogar();
        })
        .then( () => {
            NavigationService.navigate('Login',{}); 
        })
    }

    render(){
        return (
            <View style={styles.principal}>
                <StatusBar backgroundColor="#888888" />
                <View style={{flexDirection:'row'}}>
                    <View style={{flex:200, justifyContent:'flex-end'}}>
                        <Text style={styles.fontPrincipal}>Messeger</Text>
                    </View>
                    <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableOpacity onPress={() => NavigationService.navigate('AddContato')}>
                            <Image source={addImg} style={{width: 30, height: 30, marginHorizontal: 10}} /> 
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.deslogar()}>
                            <Image source={logoutImg} style={{width: 30, height: 30, marginHorizontal: 10}} /> 
                        </TouchableOpacity>
                    </View>
                </View>
                <TabBar {...this.props } 
                    style={{ backgroundColor: "#AAAAAA", elevation: 6 }}
                />
            </View>
        );
    }
}

mapStateToProps = state => ({

});

export default connect(mapStateToProps, { deslogar })(TabMenu);

const styles = StyleSheet.create({
    principal: {
        backgroundColor: "#888888",
    },
    fontPrincipal: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Tahoma',
        paddingBottom: 10
    },
});