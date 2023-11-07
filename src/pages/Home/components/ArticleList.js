import '../../../assets/ArticleList.css'
import ArticleCard from './ArticleCard';
import {db} from '../../../config/firebase'
import {useState} from 'react';
import {useEffect} from 'react';
import {getDocs, collection} from "firebase/firestore"

function ArticleList() {
    const [articles, setArticles] = useState([]);
    const articlesCollection = collection(db, "articles");

    useEffect(() => {
        const getArticles = async () => {
            try {
                // Get the article documents
                const data = await getDocs(articlesCollection);
                let filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));

                filteredData = filteredData.sort((a, b) => new Date(a.upload_date) - new Date(b.upload_date)).slice(0, 6);
                setArticles(filteredData);
            } catch (err) {
                console.error(err);
            }
        };

        getArticles();
    }, [articlesCollection]);


    return (
        <>
            <div id="article-gallery">
                <h2>Recent Stories</h2>
                <section id="articles-wrapper">
                    {articles.map((article, _) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </section>
            </div>
        </>
    )
}

export default ArticleList;