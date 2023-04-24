import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import './App.css'
import LoginForm from './components/LoginForm'
import Home from './components/Home'

import ThemeContext from './context/ThemeContext'
import VideoContent from './components/VideoContent'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

// Replace your code here
class App extends Component {
  state = {isDark: false, savedVideos: []}

  changeTheme = () =>
    this.setState(prev => ({
      isDark: !prev.isDark,
    }))

  onAddVideo = video => {
    const {savedVideos} = this.state
    const check = savedVideos.filter(each => each.id === video.id)
    if (check.length > 0) {
      this.setState(prev => ({savedVideos: [...prev.savedVideos]}))
    } else {
      this.setState(prev => ({savedVideos: [...prev.savedVideos, video]}))
    }
  }

  render() {
    const {isDark, savedVideos} = this.state
    return (
      <ThemeContext.Provider
        value={{
          isDark,
          changeTheme: this.changeTheme,
          savedVideos,
          onAddVideo: this.onAddVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/videos/:id" component={VideoContent} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route component={NotFound} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
