import React, { useState, useEffect } from "react";
import finnImage from './img/finn.jpg';
import pernilleImage from './img/pernille.jpg';
import lineImage from './img/line.jpg';
import "./home-avatar.css"

function HomeAvatar({name}) {
    const [avatarImg, setAvatarImg] = useState(null)
    
    useEffect(() => {
        setAvatarImg(findImg(name)) 
    })

    function findImg(name) {
        console.log(name)
        if(name === "Finn") {
            return finnImage
        } else if (name === "Pernille") {
            return pernilleImage
        } else if (name === "Line") {
            return lineImage
        } 
    }


    return (
        <div className="circle">
            <img src={avatarImg} alt="Avatar" className="avatar-img" />
        </div>
    )
}

export default HomeAvatar;