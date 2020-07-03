import firebase from 'react-native-firebase';
//import firebase from '@firebase/app';
//import '@firebase/auth';
//import '@firebase/database';
import b64 from 'base-64';
import _ from 'lodash';
//import NavigationService from '../NavigationService';


export const carregarDadosUsuario = () => {
    const emailUsuario = firebase.auth().currentUser.email;
    const emailUsuarioB64 = b64.encode(emailUsuario);
    return dispatch =>{
        firebase.database().ref('/contatos/'+emailUsuarioB64)
        .once('value')
        .then(snapshot => {
            const dadosUsuario = _.first(_.values(snapshot.val()));
            dispatch ({ type: 'modificarEmailUsuario', payload: emailUsuario });
            dispatch ({ type: 'modificarNomeUsuario', payload: dadosUsuario.nome });

            carregarConversas(emailUsuario, dispatch);
            carregarContatos(emailUsuario, dispatch);

        });
    }
}

export const modificarEmailContato = (texto) =>{
    return {
        type: 'modificarEmailContato',
        payload: texto
    }
}

export const limparTela = () =>{
    return {
        type: 'limparTela'
    }
}

export const adicionarContato = (emailUsuario, emailContato) => {
    const emailUsuarioB64 = b64.encode(emailUsuario);
    const emailContatoB64 = b64.encode(emailContato);
    return dispatch => {
        firebase.database().ref('/contatos/'+emailContatoB64)
        .once('value')
        .then( snapshot => {
            if(snapshot.val()){
                const dadosContato = _.first(_.values(snapshot.val()));
                firebase.database().ref('/usuario_contatos/'+emailUsuarioB64)
                .push({ email: emailContato, nome: dadosContato.nome })
                .then( sucess => adicionarContatoSucesso(dispatch))
                .catch( error => adicionarContatoErro(error,dispatch))
            }else{
                dispatch({ type: 'adicionarContatoErro', payload: 'O usuário não existe.'});
            }
        })
        .catch(error => adicionarContatoErro(error,dispatch));
    }
}

const adicionarContatoSucesso = (dispatch) => {
    dispatch({
        type: 'adicionarContatoSucesso',
        payload: true
    });
}

const adicionarContatoErro = (error, dispatch) => {
    dispatch({
        type: 'adicionarContatoSucesso',
        payload: error
    });
}

const carregarContatos = (emailUsuario, dispatch) => {
        const emailUsuarioB64 = b64.encode(emailUsuario);
        firebase.database().ref('/usuario_contatos/'+emailUsuarioB64)
        .on('value', snapshot => {
            dispatch({type: 'carregarContatos', payload: _.values(snapshot.val())});
        })
}

const carregarConversas = (emailUsuario, dispatch) => {
    const emailUsuarioB64 = b64.encode(emailUsuario);
    firebase.database().ref('/usuario_conversas/'+emailUsuarioB64)
    .on('value' , snapshot =>{
        dispatch({ type: 'carregarConversas', payload: _.values(snapshot.val()) })
    }) 
}


