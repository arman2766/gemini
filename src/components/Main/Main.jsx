import React from 'react'
import './Main.scss'
import Topbar from '../Topbar/Topbar'
import { SendHorizontal, Image } from 'lucide-react'

const Main = () => {
    return (
        <div className='main-conatiner'>
            <Topbar />
            <h1>Hello Arman</h1>
            <span className='ask-container'>
                <input type="text" placeholder='Ask Gemini Alpha...' />
                <Image color='#8f93c0' />
                <SendHorizontal color='#8f93c0' />
            </span>

        </div>
    )
}

export default Main