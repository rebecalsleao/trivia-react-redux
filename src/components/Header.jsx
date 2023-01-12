import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { MD5 } from 'crypto-js';
import { connect } from 'react-redux';

class Header extends Component {
  state = {
    name: '',
    hash: '',
  };

  componentDidMount() {
    const { name, email } = this.props;
    const hash = MD5(email).toString();
    this.setState({ name, hash });
  }

  render() {
    const { name, hash } = this.state;
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="profile"
        />
        <p
          data-testid="header-player-name"
        >
          {name}
        </p>
        <p
          data-testid="header-score"
        >
          0
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.userReducer.name,
  email: state.userReducer.email,
});

export default connect(mapStateToProps)(Header);
