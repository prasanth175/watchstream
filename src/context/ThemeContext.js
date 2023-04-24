import React from 'react'

const ThemeContext = React.createContext({
  isDark: false,
  changeTheme: () => {},
  savedVideos: [],
  onAddVideo: () => {},
})

export default ThemeContext
