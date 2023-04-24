import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'
import ThemeContext from '../../context/ThemeContext'

class NotFound extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <Header />
              <div
                className={
                  isDark ? 'main-container txt-black' : 'main-container'
                }
              >
                <SideBar />
                <div className="right-container">
                  <div className="fail-container">
                    <img
                      className="fail-img"
                      src={
                        isDark
                          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
                          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
                      }
                      alt="page not found"
                    />
                    <h1 className="not-found-heading">Page Not Found</h1>
                    <p className="fail-txt not-found-txt">
                      We are sorry, the page you requested could not be found.
                    </p>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default NotFound
