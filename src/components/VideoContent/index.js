import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'

import './index.css'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiMenuAddLine} from 'react-icons/ri'
import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'

const checkState = {
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  fail: 'FAIL',
}

class VideoContent extends Component {
  state = {
    videoDetails: {},
    isLiked: false,
    isDisliked: false,
    reactionLike: 'txt-white',
    reactionDislike: 'txt-white',
    isSaved: false,
    savedTxt: 'txt-white',
    saveContent: 'Save',
    state: checkState.in_progress,
  }

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const getToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === false) {
      this.setState({state: checkState.fail})
    } else {
      const updatedObj = {
        name: data.video_details.channel.name,
        thumbnailUrl: data.video_details.thumbnail_url,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: data.video_details.published_at,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }

      this.setState({videoDetails: updatedObj, state: checkState.success})
    }
  }

  renderVideo = () => {
    const {videoDetails} = this.state
    const {videoUrl} = videoDetails
    return (
      <div className="video-container">
        <div className="responsive-container">
          <ReactPlayer
            url={videoUrl}
            className="video"
            width="100%"
            height="500px"
          />
        </div>
      </div>
    )
  }

  onLikeBtn = () => {
    const {isLiked} = this.state
    let value
    let txt
    let dislikeTxt
    if (isLiked) {
      value = false
      txt = 'txt-white'
      dislikeTxt = 'txt-blue'
    } else {
      value = true
      txt = 'txt-blue'
      dislikeTxt = 'txt-white'
    }
    this.setState({
      isLiked: value,
      isDisliked: !value,
      reactionDislike: dislikeTxt,
      reactionLike: txt,
    })
  }

  onDislikeBtn = () => {
    const {isDisliked} = this.state
    let value
    let txt
    let likeTxt
    if (isDisliked) {
      value = false
      txt = 'txt-white'
      likeTxt = 'txt-blue'
    } else {
      value = true
      txt = 'txt-blue'
      likeTxt = 'txt-white'
    }
    this.setState({
      isLiked: !value,
      isDisliked: value,
      reactionDislike: txt,
      reactionLike: likeTxt,
    })
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
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        return (
          <>
            <Header />
            <div
              className={isDark ? 'main-container txt-black' : 'main-container'}
            >
              <SideBar />
              <div
                data-testid="videoItemDetails"
                className={
                  isDark
                    ? 'right-container video-details txt-black'
                    : 'right-container video-details'
                }
              >
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
                    onClick={this.getTrendingVideos}
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      }}
    </ThemeContext.Consumer>
  )

  renderStatus = () => {
    const {state} = this.state
    switch (state) {
      case checkState.success:
        return this.renderVideoDetails()
      case checkState.fail:
        return this.renderFailStatus()
      default:
        return this.renderLoader()
    }
  }

  renderVideoDetails = () => {
    const {videoDetails} = this.state
    const {
      title,
      name,
      profileImageUrl,
      subscriberCount,
      description,
      publishedAt,
      viewCount,
    } = videoDetails
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark, onAddVideo} = value
          const {
            reactionDislike,
            reactionLike,
            isLiked,
            isDisliked,
            isSaved,
            savedTxt,
            saveContent,
          } = this.state

          const addVideo = () => {
            this.setState(
              {isSaved: true, savedTxt: 'txt-blue', saveContent: 'Saved'},
              onAddVideo(videoDetails),
            )
          }

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
                  data-testid="videoItemDetails"
                  className={
                    isDark
                      ? 'right-container video-details txt-black'
                      : 'right-container video-details'
                  }
                >
                  {this.renderVideo()}
                  <p
                    className={
                      isDark
                        ? 'title video-content-title txt-white'
                        : 'title video-content-title'
                    }
                  >
                    {title}
                  </p>
                  <div
                    className={isDark ? 'public-info txt-grey' : 'public-info'}
                  >
                    <div className="views-years">
                      <p>{viewCount} views</p>
                      <p className="dot special">•</p>
                      <p>{publishedAt} years ago</p>
                    </div>
                    <div className="reactions">
                      <button
                        className="react-btn"
                        type="button"
                        onClick={this.onLikeBtn}
                      >
                        <div
                          className={
                            isDark
                              ? `reaction ${reactionLike}`
                              : `${
                                  isLiked
                                    ? `${reactionLike} reaction`
                                    : 'reaction'
                                }`
                          }
                        >
                          <AiOutlineLike className="reaction-icon" />
                          <p className="reaction-txt">Like</p>
                        </div>
                      </button>
                      <button type="button" onClick={this.onDislikeBtn}>
                        <div
                          className={
                            isDark
                              ? `reaction ${reactionDislike}`
                              : `${
                                  isDisliked
                                    ? `${reactionDislike} reaction`
                                    : 'reaction'
                                }`
                          }
                        >
                          <AiOutlineDislike className="reaction-icon" />
                          <p className="reaction-txt">Dislike</p>
                        </div>
                      </button>
                      <button type="button" onClick={addVideo}>
                        <div
                          className={
                            isDark
                              ? ` reaction ${savedTxt}`
                              : `${
                                  isSaved ? `${savedTxt} reaction` : 'reaction'
                                }`
                          }
                        >
                          <RiMenuAddLine className="reaction-icon" />
                          <p className="reaction-txt">{saveContent}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                  <hr />
                  <div className="profile-content">
                    <img
                      className="profile"
                      src={profileImageUrl}
                      alt="channel logo"
                    />
                    <div className="profile-content-txt">
                      <p className="profile-name">{name}</p>
                      <p className="subs">{subscriberCount} subscribers</p>
                      <p className="desc">{description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  render() {
    return <>{this.renderStatus()}</>
  }
}

export default VideoContent
