import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import ThemeContext from '../../context/ThemeContext'
import {
  FormContainer,
  LoginContainer,
  MainContainer,
  Logo,
  Input,
  Label,
  CheckBox,
  LoginButton,
} from '../../styledComponents'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    type: false,
    errTxt: '',
    errStatus: false,
  }

  onUsername = event => this.setState({username: event.target.value})

  onPassword = event => this.setState({password: event.target.value})

  onCheckBox = () => {
    this.setState(prev => ({
      type: !prev.type,
    }))
  }

  successView = token => {
    Cookies.set('jwt_token', token, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const loginDetails = {username, password}
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(loginDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.setState({errStatus: false}, this.successView(data.jwt_token))
    } else {
      this.setState({errTxt: data.error_msg, errStatus: true})
    }
  }

  render() {
    const {username, password, type, errStatus, errTxt} = this.state
    const getToken = Cookies.get('jwt_token')
    console.log('hello')
    if (getToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <MainContainer className={isDark && 'bg-grey'}>
              <LoginContainer className={isDark && 'bg-black'}>
                <Logo
                  className="web-logo"
                  src={
                    isDark
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <FormContainer
                  onSubmit={this.submitForm}
                  className="login-form"
                >
                  <Label className="login-label" htmlFor="userInput">
                    USERNAME
                  </Label>
                  <Input
                    className={isDark && 'login-input'}
                    type="text"
                    placeholder="username"
                    id="userInput"
                    onChange={this.onUsername}
                    value={username}
                  />
                  <Label className="login-label" htmlFor="passwordInput">
                    PASSWORD
                  </Label>
                  <Input
                    className={isDark && 'login-input'}
                    type={type ? 'text' : 'password'}
                    placeholder="password"
                    id="passwordInput"
                    onChange={this.onPassword}
                    value={password}
                  />
                  <button
                    className="checkbox-btn"
                    type="button"
                    onClick={this.onCheckBox}
                  >
                    <Label className="login-checkbox" htmlFor="checkInput">
                      <CheckBox type="checkbox" id="checkInput" />
                      Show Password
                    </Label>
                  </button>

                  <LoginButton className="login-btn" type="submit">
                    Login
                  </LoginButton>
                  {errStatus && <p className="error-msg">*{errTxt}</p>}
                </FormContainer>
              </LoginContainer>
            </MainContainer>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default LoginForm
