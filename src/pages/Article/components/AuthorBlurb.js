import {useEffect, useState} from "react"
import {db} from '../../../config/firebase.js'
import {doc, getDoc} from "firebase/firestore";

export default function AuthorBlurb({authorName}) {
    const [author, setAuthor] = useState(null);
    useEffect(() => {
        const getAuthorDetails = async () => {
            const docRef = doc(db, "users", authorName);
            setAuthor((await getDoc(docRef)).data());
        }

        getAuthorDetails();
    }, [authorName])

    if (author === null) return;

    console.log(author);
    return (
        <>
            <div id="profile-wrapper">
                <img src={author.profile_img} alt={authorName} />
                <p>{authorName}</p>
            </div>
        </>
    )
}