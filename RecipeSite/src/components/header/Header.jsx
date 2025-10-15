import React from 'react'

function Header() {
return (
    <header className="carousel w-full h-150">
    <div id="slide1" className="carousel-item relative w-full">
        <video 
        autoPlay 
        muted 
        playsInline
        className="w-full h-full object-cover"
        >
        <source src="/thumbnail/Video.mp4" type="video/mp4" />
        </video>
    </div>
</header>

)
}

export default Header
