import {useState} from 'react'
import '../../../assets/Gallery.css'

function Gallery() {
    const [image, setImage] = useState(`${process.env.PUBLIC_URL}/images/articles/No Bad Sharks 1440x576.jpg`)

    return (
        <>
            <div id="gallery-wrapper">
                <div className="container">
                    <div>
                        <img id="gallery-image" src={image} alt="TODO" />
                    </div>
                    <div className="gradient-overlay"></div>
                    <div id="image-text">
                        <h2 id="image-header"><strong>“No Bad Sharks in Bim”: Kendall Roy, Offshore Capital, and Caribbean Reparations</strong></h2>
                        <h5 id="image-description"></h5>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Gallery;