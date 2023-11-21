import "../assets/TitleImage.css"

export default function TitleImage({article}) {
    return (
        <>
            <div id="title-image-wrapper">
                <h2 id="image-title">This is a sample image title</h2>
                <img src={article.thumbnail} alt={article.alt} />
            </div>
        </>
    )
}