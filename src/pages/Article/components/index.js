import Body from "./Body";
import TitleImage from "./TitleImage";
import AuthorBlurb from "./AuthorBlurb";
import {useEffect, useState} from "react";
import {db} from '../../../config/firebase.js';
import {collection, where, query, getDocs} from 'firebase/firestore';
import {useParams} from "react-router-dom";

export default function Article(props) {
    const [article, setArticle] = useState(null);
    const params = useParams();

    useEffect(() => {
        const getArticle = async () => {
            try {
                const queryConstraints = [];
                queryConstraints.push(where('slug', '==', params.slug));
                const q = query(collection(db, 'articles'), ...queryConstraints);
                const snapshot = await getDocs(q);
                setArticle(snapshot.docs[0].data());
            } catch (e) {
                console.log(e);
                return (<h1>Page failed to load</h1>);
            }
        }

        getArticle();
    }, [params]);

    if (article === null) return (<h1>Loading...</h1>);
    return (
        <>
            <TitleImage article={article} />
            <h2 id="subtitle">Here is a subtitle that's decently long</h2>
            <Body />
            <AuthorBlurb authorName={article.author} />
        </>
    )
}