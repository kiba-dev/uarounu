import React from 'react'
import AdSense from 'react-adsense'

const GoogleAd = () => {
  return (
    <AdSense.Google
      client='492-636-1374'
      slot='6259591966'
      style={{ display: 'block' }}
      format='auto'
      responsive='true'
      layoutKey='-gw-1+2a-9x+5c'
    />
  )
}

export default GoogleAd
