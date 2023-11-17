import Gallery from './Gallery.js'
import ArticleList from './ArticleList.js';
import '../../../assets/Home.css'

function Home() {
    return (
        <>
            <Gallery />
            <div id="sub-gallery-banner">
                <h2 id="sub-gallery-title">A Publication About Black Experiences</h2>
            </div>
            <div id="page-wrapper">
                <ArticleList />
            </div>
        </>
    )
}

export default Home;