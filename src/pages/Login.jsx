import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Login extends Component {
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

  playGetToken = async () => {
    const requestAPI = await fetch('https://opentdb.com/api_token.php?command=request');
    const jsonAPI = await requestAPI.json();
    const { token } = jsonAPI;
    localStorage.token = token;
    const { history } = this.props;
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
        </label>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
