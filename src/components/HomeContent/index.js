import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Loader from 'react-loader-spinner'
import {AiOutlineSearch} from 'react-icons/ai'
import ThemeContext from '../../context/ThemeContext'
import Videos from '../Videos'

const checkState = {
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
  not_found: 'NOT_FOUND',
}

class HomeContent extends Component {
  state = {searchInput: '', videosList: [], state: checkState.in_progress}

  componentDidMount = () => {
    this.getVideos()
  }

  OnFailRetry = () => {
    this.getVideos()
  }

  getVideos = async () => {
    const getToken = Cookies.get('jwt_token')
    const {searchInput} = this.state
    const videoUrl = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const options = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
    }
    const response = await fetch(videoUrl, options)
    const data = await response.json()
    if (response.ok === false) {
      this.setState({state: checkState.fail})
    } else {
      const updatedList = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
      }))
      if (updatedList.length > 0) {
        this.setState({videosList: updatedList, state: checkState.success})
      } else {
        this.setState({videosList: updatedList, state: checkState.not_found})
      }
    }
  }

  onSearch = event => this.setState({searchInput: event.target.value})

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
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <div className="fail-container">
            <img
              className="fail-img"
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
              }
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
              onClick={this.OnFailRetry}
            >
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
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
      <button type="button" className="retry-btn" onClick={this.OnFailRetry}>
        Retry
      </button>
    </div>
  )

  renderSearch = () => {
    const {searchInput} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <>
              <input
                className={isDark ? 'input-dark search-input' : 'search-input'}
                type="search"
                value={searchInput}
                placeholder="Search"
                onChange={this.onSearch}
              />
              <button
                type="button"
                onClick={this.getVideos}
                data-testid="searchButton"
                className={
                  isDark
                    ? 'search-icon-container icon-dark'
                    : 'search-icon-container'
                }
              >
                <AiOutlineSearch className="search-icon" />
              </button>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderVideos = () => {
    const {videosList} = this.state

    return (
      <ul className="videos-list">
        {videosList.map(each => (
          <Videos item={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderStatus = () => {
    const {state} = this.state
    switch (state) {
      case checkState.success:
        return this.renderVideos()
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
            <div className={isDark === false ? null : 'dark-theme'}>
              <div className="search">{this.renderSearch()}</div>
              <div className="videos">{this.renderStatus()}</div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default HomeContent
