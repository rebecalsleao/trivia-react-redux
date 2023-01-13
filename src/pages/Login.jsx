import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveUser } from '../Redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisable: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, this.validateAll);
  };

  validateAll = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  };

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  playGetToken = async () => {
    const requestAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const jsonAPI = await requestAPI.json();
    const { token } = jsonAPI;
    const { history, dispatch } = this.props;
    const { name, email } = this.state;

    localStorage.token = token;
    dispatch(saveUser({ name, email }));
    history.push('/game');
  };

  render() {
    const { name, email, isDisable } = this.state;
    return (
      <div>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            value={ name }
            data-testid="input-player-name"
            placeholder="Insira o nome"
            onChange={ this.handleChange }
          />
          <input
            type="email"
            id="email"
            name="email"
            value={ email }
            data-testid="input-gravatar-email"
            placeholder="Insira o email"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ isDisable }
            data-testid="btn-play"
            onClick={ this.playGetToken }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.handleSettings }
          >
            Configuração
          </button>
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
