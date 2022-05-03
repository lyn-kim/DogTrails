import React from 'react';
import AuthFormLogin from './auth-form-login';
export default class AuthFormSignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      login: false,
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOpenLoginModal = this.handleOpenLoginModal.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-up', req)
      .then(res => {
        if (res.status === 409) {
          this.setState({ error: 'Username already taken' });
          return;
        }

        this.handleOpenLoginModal();
      });
  }

  handleOpenLoginModal() {
    this.setState({ login: true });
  }

  render() {
    if (this.state.login) {
      return <AuthFormLogin onSignIn={this.props.onSignIn} onCloseAuthModal={this.props.onCloseAuthModal} />;
    }
    return (
      <div className="position-relative">
        <div id="modal-view" className="row">
          <div className="modal-bg position-fixed">
            <form onSubmit={this.handleSubmit}>
              <div className="auth-box modal-center">
                <div className="row justify-center">
                  <a onClick={() => this.props.onCloseAuthModal()} ><i className="exit-icon fas fa-times"></i></a>
                  <p className="get-started-msg">Get Started</p>
                </div>
                {this.state.error && (
                  <div className="row error-message">{this.state.error}</div>
                )}
                <div className="row">
                  <label htmlFor="username" className="auth-input-label">Username:</label>
                  <input
                    required
                    id="username"
                    type="text"
                    name="username"
                    className="auth-input"
                    value={this.state.username}
                    onChange={this.handleChange} />
                </div>
                <div className="row">
                  <label htmlFor="password" className="auth-input-label">Password:</label>
                  <input
                    required
                    id="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    className="auth-input"
                    onChange={this.handleChange} />
                </div>
                <div className="row">
                  <button type="submit" className="auth-submit-btn">Register</button>
                </div>
                <a onClick={this.handleOpenLoginModal}><p className="auth-check-msg">Already have an account?</p></a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
