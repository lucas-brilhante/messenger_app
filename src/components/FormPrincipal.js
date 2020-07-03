import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import TabMenu from './TabMenu';
import FormContatos from './FormContatos';
import FormConversas from './FormConversas';
import { carregarContatos, carregarDadosUsuario } from '../actions/AppActions';
import { connect } from 'react-redux';

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

class FormPrincipal extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Conversas' },
      { key: 'second', title: 'Contatos' },
    ],
  };

  constructor(props){
      super(props);
      this.navigate = this.navigate.bind(this);
  }

  navigate = (scene) => {
    this.props.navigation.navigate(scene,{});
  }

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => <TabMenu {...props}/>
  
  _renderScene = SceneMap({
    first: FormConversas,
    second: FormContatos,
  })

  componentWillMount(){
    this.props.carregarDadosUsuario();
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
        initialLayout={ initialLayout }
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => ({
  contatos: state.AppReducer.contatos,
  usuarioEmail: state.AppReducer.usuarioEmail,
  usuarioNome: state.AppReducer.usuarioNome
})

export default connect(mapStateToProps,{ carregarContatos, carregarDadosUsuario })(FormPrincipal);