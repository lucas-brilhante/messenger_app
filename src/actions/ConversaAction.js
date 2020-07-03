import firebase from 'react-native-firebase';
import b64 from 'base-64';
import _ from 'lodash';

export const modificarMensagem = mensagem => {
    return {
        type: 'modificarMensagem',
        payload: mensagem
    }
}

export const enviarMensagem = (mensagem, emailContato, nomeContato, emailUsuario, nomeUsuario) => {
    const emailContatoB64 = b64.encode(emailContato);
    const emailUsuarioB64 = b64.encode(emailUsuario);

    if(mensagem === '')
        return {
            type: ''
        }

    firebase.database().ref('/usuario_conversas/'+emailUsuarioB64+'/'+emailContatoB64)
    .set({email: emailContato, nome: nomeContato, ultimaMensagem: mensagem})
    .then(sucess => {
        firebase.database().ref('/usuario_conversas/'+emailContatoB64+'/'+emailUsuarioB64)
        .set({email: emailUsuario, nome: nomeUsuario, ultimaMensagem: mensagem });
        firebase.database().ref('/usuario_conversas/'+emailUsuarioB64+'/'+emailContatoB64)
        .set({email: emailContato, nome: nomeContato, ultimaMensagem: mensagem })
    });

    firebase.database().ref('/usuario_mensagens/'+emailUsuarioB64+'/'+emailContatoB64)
    .push({ mensagem , tipo: 'E'})
    .then(sucess =>{
        firebase.database().ref('/usuario_mensagens/'+emailContatoB64+'/'+emailUsuarioB64)
        .push({ mensagem , tipo: 'R'})
    });
    return {
        type: 'enviarMensagem'
    }
}

export const carregarMensagens = (emailUsuario, nomeUsuario, emailContato, nomeContato) => {
    const emailUsuarioB64 = b64.encode(emailUsuario);
    const emailContatoB64 = b64.encode(emailContato);    
    return dispatch => {
        dispatch({ type: 'modificarEmailUsuario', payload: emailUsuario });
        dispatch({ type: 'modificarNomeUsuario', payload: nomeUsuario });
        dispatch({ type: 'modificarEmailContato', payload: emailContato });
        dispatch({ type: 'modificarNomeContato', payload: nomeContato });
        firebase.database().ref('/usuario_mensagens/'+emailUsuarioB64+'/'+emailContatoB64)
        .on('value', snapshot =>{
            let i=0;
            let dadosMensagens = {};
            snapshot.forEach(childSnapshop => {
                dadosMensagens[i] = childSnapshop.val();
                i = i+1;
            })
            dispatch({ type: 'carregarMensagens', payload: _.values(dadosMensagens) })
        })
    }
}