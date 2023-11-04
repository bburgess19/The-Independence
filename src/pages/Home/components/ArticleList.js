import '../../../assets/ArticleList.css'
import articleData from '../../../data/articles-data.json'
import ArticleCard from './ArticleCard';
import {loremIpsum} from 'react-lorem-ipsum'

function ArticleList() {
    return (
        <>
            <div id="articles-wrapper">
                {articleData.map((article, _) => (
                    <ArticleCard article={article} />
                ))}
            </div>
        </>
    )
}

export default ArticleList;