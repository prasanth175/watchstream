import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'
import {AiFillHome, AiTwotoneFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'

import ThemeContext from '../../context/ThemeContext'
import {NavBar} from '../../styledComponents'

const navList = [
  {
    pageName: 'Home',
    pageIcon: AiFillHome,
    link: '/',
  },
  {
    pageName: 'Trending',
    pageIcon: AiTwotoneFire,
    link: '/trending',
  },
  {
    pageName: 'Gaming',
    pageIcon: SiYoutubegaming,
    link: '/gaming',
  },
  {
    pageName: 'Saved Videos',
    pageIcon: RiMenuAddLine,
    link: '/saved-videos',
  },
]

class SideBar extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value

          return (
            <NavBar bgColor={isDark} className="side-bar">
              <ul className="nav-list">
                {navList.map(each => (
                  <Link className="nav-link" to={each.link} key={each.pageName}>
                    <li className="nav-list-item">
                      <each.pageIcon />
                      <p
                        className={
                          isDark ? 'nav-item-name txt-white' : 'nav-item-name'
                        }
                      >
                        {each.pageName}
                      </p>
                    </li>
                  </Link>
                ))}
              </ul>

              <div
                className={
                  isDark ? 'contact-container txt-white' : 'contact-container'
                }
              >
                <h5
                  className={
                    isDark ? 'contact-heading txt-white' : 'contact-heading'
                  }
                >
                  CONTACT US
                </h5>
                <div className="logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="contact-logo facebook"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="contact-logo twitter"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="contact-logo linkedin"
                  />
                </div>
                <p className="greet-txt">
                  Enjoy! Now to see your channels and recommendations!
                </p>
              </div>
            </NavBar>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SideBar
