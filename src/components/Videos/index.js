import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import ThemeContext from '../../context/ThemeContext'

class Videos extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const {item} = this.props
          const {
            title,
            thumbnailUrl,
            name,
            profileImageUrl,
            viewCount,
            publishedAt,
            id,
          } = item

          return (
            <Link className="video-link" to={`/Videos/${id}`}>
              <li className="video-item">
                <img
                  className="thumbnail-img"
                  src={thumbnailUrl}
                  alt="thumbnail url"
                />
                <div className="video-content">
                  <img
                    className="profile-img"
                    src={profileImageUrl}
                    alt="channel logo"
                  />
                  <div className="video-txt">
                    <p className={isDark ? 'title txt-white' : 'title'}>
                      {title}
                    </p>
                    <p className={isDark ? 'name txt-grey' : 'name'}>{name}</p>
                    <div
                      className={
                        isDark
                          ? 'video-bottom-txt txt-grey'
                          : 'video-bottom-txt'
                      }
                    >
                      <p className="small">{viewCount} views</p>
                      <p className="dot small">·</p>
                      <p className="small">{publishedAt} years ago</p>
                    </div>
                  </div>
                </div>
              </li>
            </Link>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Videos
