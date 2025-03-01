import React from 'react'
import { LOGO } from '../utils/constants'

const Header = () => {
    return (
        <div className="absolute z-40">
            <img src={LOGO} alt="logo" className="w-44 bg-gradient-to-b from-black" />
        </div>
    )
}

export default Header
