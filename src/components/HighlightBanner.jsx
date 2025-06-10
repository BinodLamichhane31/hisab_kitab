import React from 'react'
import Typewriter from 'typewriter-effect'

const HighlightBanner = () => {
  return (
    <div
      className="px-4 py-3 text-white shadow-md bg-gradient-to-r from-orange-600 via-orange-300 to-orange-200"
    >
        <Typewriter
          options={{
            strings: [
              'Manage smarter.',
              'Save better.',
              'Grow faster.',
              'Welcome to HisabKitab'
            ],
            autoStart: true,
            loop: true,
            delay: 50,
            deleteSpeed: 30,
            pauseFor: 2000
          }}
        />
    </div>
  )
}

export default HighlightBanner
