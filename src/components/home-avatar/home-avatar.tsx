import React, { useState, useEffect } from 'react';
import "./home-avatar.css"

interface HomeAvatarProps  {
    name : string
} 

const HomeAvatar: React.FC<HomeAvatarProps> = ({name}) =>  {
    const [avatarImg, setAvatarImg] = useState("")
    
    useEffect(() => {
        setAvatarImg(findImg(name)) 
    }, [name])

    function findImg(name : string) : string {
        return `./img/${name.toLowerCase()}.jpg` 
    }

    return (
        <div className="circle">
            <img src={avatarImg} alt="Avatar" className="avatar-img" />
        </div>
    )
}

export default HomeAvatar;