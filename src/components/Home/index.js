import {Component} from 'react'
import Header from '../Header'
import SideBar from '../SideBar'
import Premium from '../Premium'

import './index.css'
import HomeContent from '../HomeContent'
import ThemeContext from '../../context/ThemeContext'

class Home extends Component {
  state = {isClose: true}

  closeBanner = () => this.setState({isClose: false})

  render() {
    const {isClose} = this.state
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
                <div className="right-container" data-testid="home">
                  {isClose && (
                    <Premium isClose closeBanner={this.closeBanner} />
                  )}
                  <div
                    className={
                      isDark
                        ? 'right-bottom-container txt-black new-col'
                        : 'right-bottom-container'
                    }
                  >
                    <HomeContent />
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

export default Home
