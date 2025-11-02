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
        console.log(name)
        if(name === "Finn") {
            return "./img/finn.jpg"
        } else if (name === "Pernille") {
            return "./img/pernille.jpg"
        } else if (name === "Line") {
            return "./img/line.jpg"
        } 
        return ""
    }

    return (
        <div className="circle">
            <img src={avatarImg} alt="Avatar" className="avatar-img" />
        </div>
    )
}

export default HomeAvatar;