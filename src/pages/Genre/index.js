import data from "./data.json"
import "./assets/Articles.css"
import ArticleList from "../Home/components/ArticleList"


export default function Articles(props) {
    const articleGenres = {
        "Art": "art",
        "Black Body & Diaspora": "diaspora",
        "Politics & Economics": "politics",
        "Science & Technology": "science",
        "Sports": "sports"
    }

    return (
        <>
            <h2 id='article-header' className={articleGenres[props.genre]}>{props.genre}</h2>
            <p id='genre-description'>{data[props.genre]}</p>
            <ArticleList genre={props.genre} />
        </>
    )
}