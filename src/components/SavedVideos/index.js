import {Component} from 'react'
import {Link} from 'react-router-dom'
// import Cookies from 'js-cookie'
import {AiTwotoneFire} from 'react-icons/ai'

import SideBar from '../SideBar'
import Header from '../Header'
import ThemeContext from '../../context/ThemeContext'

class SavedVideos extends Component {
  renderNotFoundStatus = () => (
    <div className="fail-container">
      <img
        className="fail-img"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "
        alt="no saved videos"
      />
      <h1 className="fail-heading">No saved videos found</h1>
      <p className="fail-txt">You can save your videos while watching them</p>
    </div>
  )

  renderTrendingVideos = videos => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <ul>
            {videos.map(each => (
              <li key={each.id}>
                <Link to={`/videos/${each.id}`} className="video-link">
                  <div className="trending-list-item">
                    <img
                      className="trending-img"
                      src={each.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <div className="trending-content">
                      <p
                        className={
                          isDark ? 'trending-title txt-white' : 'trending-title'
                        }
                      >
                        {each.title}
                      </p>
                      <p
                        className={
                          isDark ? 'trending-txt txt-grey' : 'trending-txt'
                        }
                      >
                        {each.name}
                      </p>
                      <div
                        className={
                          isDark ? 'views-years txt-grey' : 'views-years'
                        }
                      >
                        <p
                          className={
                            isDark ? 'trending-txt txt-grey' : 'trending-txt'
                          }
                        >
                          {each.viewCount}
                        </p>
                        <p className="dot">•</p>
                        <p
                          className={
                            isDark ? 'trending-txt txt-grey' : 'trending-txt'
                          }
                        >
                          {each.publishedAt}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, savedVideos} = value
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
                    <AiTwotoneFire
                      className={
                        isDark ? 'trending-icon icon-red' : 'trending-icon'
                      }
                    />
                    <h1 className="trending-heading">Saved Videos</h1>
                  </div>
                  {savedVideos.length > 0
                    ? this.renderTrendingVideos(savedVideos)
                    : this.renderNotFoundStatus()}
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default SavedVideos
