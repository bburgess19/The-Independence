import * as React from "react";
import {useState} from "react";
import '../../../assets/ArticleCard.css'
import {Link} from "react-router-dom";

export default function ArticleCard(props) {
    const [isHovering, setIsHovering] = useState(false);
    const articleGenres = {
        "Art": "art",
        "Black Body & Diaspora": "diaspora",
        "Politics & Economics": "politics",
        "Science & Technology": "science",
        "Sports": "sports"
    }

    return (
        <>
            <div
                className="article-card-wrapper"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                <Link className="article-card-link" to={`/articles/${props.article.slug}`} article={props.article}>
                    <div className={`${isHovering ? `hover-highlight ${articleGenres[props.article.genre]}` : ''} article-card-image`}>
                        <img src={props.article.thumbnail} alt="Dummy" className={isHovering ? 'hover-highlight' : ''} />
                    </div>
                    <p className={`${isHovering ? articleGenres[props.article.genre] : ''} article-banner`}> {props.article.type} / {props.article.genre}</p>
                    <h3 className={"article-title"}>{props.article.title}</h3>
                    <p>{props.article.subtitle}</p>
                    <p className={`${isHovering ? articleGenres[props.article.genre] : ''} author`}>{props.article.author}</p>
                </Link>
            </div >
        </>
    )
}  