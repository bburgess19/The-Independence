import * as React from "react";
import {useState} from "react";
import '../../../assets/ArticleCard.css'

export default function ArticleCard(props) {
    const [isHovering, setIsHovering] = useState(false);
    const articleGenres = {
        "Art": ".art",
        "Black Body & Diaspora": ".diaspora",
        "Politics & Economics": ".politics",
        "Science & Technology": ".science",
        "Sports": ".sports"
    }

    return (
        <>
            <div
                href="#"
                className="article-card-wrapper"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <div className={`${isHovering ? `hover-highlight ${articleGenres[props.genre]}` : ''} article-card-image`}>
                    <img src={props.article.thumbnail} alt="Dummy" className={isHovering ? 'hover-highlight' : ''} />
                </div>
                <p className={`${isHovering ? 'hover-highlight' : ''} article-banner`}> {props.article.type} / {props.article.genre}</p>
                <h3>{props.article.title}</h3>
                <p>{props.article.subtitle}</p>
                <p className={`${isHovering ? 'hover-highlight' : ''} author`}>{props.article.author}</p>
            </div >
        </>
    )
}  