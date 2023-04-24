import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import './index.css'
import SideBar from '../SideBar'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'

const checkState = {
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
  not_found: 'NOT_FOUND',
}

class Gaming extends Component {
  state = {trendingList: [], state: checkState.in_progress}

  componentDidMount = () => {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    const getToken = Cookies.get('jwt_token')
    const gamingVideosApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(gamingVideosApiUrl, options)
    const data = await response.json()

    if (response.ok === false) {
      this.setState({state: checkState.fail})
    } else {
      const updatedList = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      if (updatedList.length > 0) {
        this.setState({trendingList: updatedList, state: checkState.success})
      } else {
        this.setState({trendingList: updatedList, state: checkState.not_found})
      }
    }
  }

  renderTrendingVideos = () => {
    const {trendingList} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <ul className="gaming-list">
              {trendingList.map(each => (
                <Link
                  to={`/videos/${each.id}`}
                  className="gaming-link"
                  key={each.id}
                >
                  <li className="gaming-list-item">
                    <img
                      className="gaming-img"
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <p
                      className={
                        isDark ? 'trending-txt txt-white' : 'trending-txt'
                      }
                    >
                      {each.title}
                    </p>
                    <p
                      className={
                        isDark ? 'trending-txt txt-grey' : 'trending-txt'
                      }
                    >
                      {each.viewCount} watching worldwide
                    </p>
                  </li>
                </Link>
              ))}
            </ul>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        type="ThreeDots"
        color="rgb(56, 154, 234)"
        height="50"
        width="50"
      />
    </div>
  )

  renderFailStatus = () => (
    <div className="fail-container">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
      />
      <h1 className="fail-heading">Oops! Something Went Wrong</h1>
      <p className="fail-txt">
        We are having some trouble to complete your request.
      </p>
      <p className="fail-txt">Please try again.</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getGamingVideos}
      >
        Retry
      </button>
    </div>
  )

  renderNotFoundStatus = () => (
    <div className="fail-container">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
      />
      <h1 className="fail-heading">No Search results found</h1>
      <p className="fail-txt">
        Try different key words or remove search filter
      </p>
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderStatus = () => {
    const {state} = this.state
    switch (state) {
      case checkState.success:
        return this.renderTrendingVideos()
      case checkState.fail:
        return this.renderFailStatus()
      case checkState.not_found:
        return this.renderNotFoundStatus()
      default:
        return this.renderLoader()
    }
  }

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
                <div
                  className={
                    isDark
                      ? 'right-container trending-container txt-black'
                      : 'right-container trending-container'
                  }
                >
                  <div className="trending-top">
                    <SiYoutubegaming
                      className={
                        isDark ? 'trending-icon icon-red' : 'trending-icon'
                      }
                    />
                    <h1 className="trending-heading">Gaming</h1>
                  </div>

                  {this.renderStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
