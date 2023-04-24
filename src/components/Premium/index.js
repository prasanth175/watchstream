import {Component} from 'react'
import './index.css'

import {MdCancel} from 'react-icons/md'

class Premium extends Component {
  onClose = () => {
    const {closeBanner} = this.props
    closeBanner()
  }

  render() {
    return (
      <div className="banner" data-testid="banner">
        <div className="banner-content">
          <img
            className="banner-logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
          />
          <p className="banner-txt">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button className="banner-btn" type="button">
            GET IT NOW
          </button>
        </div>
        <button className="cancel-btn" type="button" data-testid="close">
          <MdCancel onClick={this.onClose} />
        </button>
      </div>
    )
  }
}

export default Premium
