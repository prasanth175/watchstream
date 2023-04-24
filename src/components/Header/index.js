import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaMoon} from 'react-icons/fa'
import {BsBrightnessHigh} from 'react-icons/bs'
import {IoIosLogOut} from 'react-icons/io'
import {AiOutlineMenu} from 'react-icons/ai'

import Popup from 'reactjs-popup'

import {NavBar} from '../../styledComponents'

import './index.css'

import ThemeContext from '../../context/ThemeContext'

const navList = [
  {
    pageName: 'Home',
    link: '/',
  },
  {
    pageName: 'Trending',
    link: '/trending',
  },
  {
    pageName: 'Gaming',
    link: '/gaming',
  },
  {
    pageName: 'Saved Videos',
    link: '/saved-videos',
  },
]

class Header extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, changeTheme} = value
          const onChangeTheme = () => {
            const {history} = this.props
            history.replace('/')
            changeTheme()
          }
          return (
            <NavBar bgColor={isDark} className="navbar">
              <Link to="/">
                {isDark ? (
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
                    alt="website logo"
                  />
                ) : (
                  <img
                    className="website-logo"
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="website logo"
                  />
                )}
              </Link>
              <div className="nav-right">
                <button type="button" data-testid="theme">
                  {isDark ? (
                    <BsBrightnessHigh
                      onClick={onChangeTheme}
                      className="theme-img light-theme"
                    />
                  ) : (
                    <FaMoon onClick={onChangeTheme} className="theme-img" />
                  )}
                </button>
                <img
                  className="profile"
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                  alt="profile"
                />
                <div className="menu-container">
                  <Popup
                    trigger=<AiOutlineMenu
                      className={isDark ? 'theme-img light-theme' : 'theme-img'}
                    />
                    position="top center"
                    modal
                    closeOnDocumentClick
                    className="custom-popup"
                  >
                    {close => (
                      <div>
                        <div>
                          <ul>
                            {navList.map(each => (
                              <Link
                                className="nav-link"
                                to={each.link}
                                key={each.pageName}
                              >
                                <li className="nav-list-item pop-item">
                                  <p className="nav-item-name">
                                    {each.pageName}
                                  </p>
                                </li>
                              </Link>
                            ))}
                          </ul>
                        </div>
                        <button
                          className="close-btn"
                          type="button"
                          onClick={() => close()}
                        >
                          Close Popup
                        </button>
                      </div>
                    )}
                  </Popup>
                </div>

                <div className="logout-container">
                  <Popup
                    trigger={
                      <button
                        className={isDark ? 'dark-logout' : 'logout-btn'}
                        type="button"
                        onClick={this.onLogout}
                      >
                        Logout
                      </button>
                    }
                  >
                    {close => (
                      <div className="popup">
                        <div className="popup-container">
                          <div className="pop-box">
                            <p className="pop-txt">
                              Are you sure, you want to logout?
                            </p>
                            <div className="buttons">
                              <button
                                type="button"
                                className="close-button"
                                onClick={() => close()}
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                className="confirm-button"
                                onClick={this.onLogout}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>

                <div className="logout-icon-container">
                  <Popup
                    trigger={
                      <button
                        className={
                          isDark ? 'theme-img light-theme' : 'theme-img'
                        }
                        type="button"
                        onClick={this.onLogout}
                      >
                        <IoIosLogOut className="theme-img" />
                      </button>
                    }
                  >
                    {close => (
                      <div className="popup">
                        <div className="popup-container">
                          <div className="pop-box">
                            <p className="pop-txt">
                              Are you sure, you want to logout?
                            </p>
                            <div className="buttons">
                              <button
                                type="button"
                                className="close-button"
                                onClick={() => close()}
                              >
                                Cancel
                              </button>

                              <button
                                type="button"
                                className="confirm-button"
                                onClick={this.onLogout}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              </div>
            </NavBar>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default withRouter(Header)
