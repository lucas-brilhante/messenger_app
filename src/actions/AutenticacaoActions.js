import firebase from 'react-native-firebase';
import b64 from 'base-64';
import NavigationService from '../NavigationService';

export const alterarNome = (texto) => {
    return {
        type: 'alterarNome',
        payload: texto
    }
}

export const alterarEmail = (texto) => {
    return {
        type: 'alterarEmail',
        payload: texto
    }
}

export const alterarSenha = (texto) => {
    return {
        type: 'alterarSenha',
        payload: texto
    }
}

const cadastroError = (error, dispatch) => {
    dispatch({
        type: 'cadastroError' ,
        payload: error.message
    });
}

const cadastroSucesso = (dispatch) => {
    dispatch({
        type: 'cadastroSucesso'
    });
    NavigationService.navigate('Welcome',{})

}

const loginSucesso = (dispatch) => {
    dispatch({ type: 'loginSucesso', payload: 'Sucesso' })
    NavigationService.navigate('Principal',{});
}

const loginError = (error, dispatch) => {
    dispatch({ type: 'loginError', payload: error });
}

export const logarUsuario = (email, senha) => {
    return dispatch => {
        dispatch({ type: 'alterarLoadingEsperando'});
        firebase.auth().signInWithEmailAndPassword(email, senha).
        then(
            user => loginSucesso(dispatch)
        ).
        catch(error => loginError(error.message, dispatch));
    }
}

export const cadastrarUsuario = (nome, email, senha) =>{
    return dispatch => {
        dispatch({ type: 'alterarLoadingEsperando'});
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(sucess => {
            let emailB64 = b64.encode(email);
            firebase.database().ref('/contatos/'+emailB64).push({ nome })
            .then(user => cadastroSucesso( dispatch));
        })
        .catch(error => cadastroError(error,dispatch));
    }
}

export const limparDados = () => {
    return {
        type: 'limparDados'
    }
}

export const deslogar = () => {
    return {
        type: 'deslogar'
    }
}