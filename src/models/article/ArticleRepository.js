import { db } from "../../config/firebase";
import { Article } from "./ArticleModel";
import { collection, where, getDocs, query } from "firebase/firestore";

export default class ArticleRepository {
  static async getArticleBySlug(slug) {
    const q = query(
      collection(db, "articles"),
      where("slug", "==", slug),
    ).withConverter(articleConverter);
    const ref = await getDocs(q);

    if (ref.empty) {
      console.log("No matching documents.");
      return null;
    }

    return ref.docs[0].data();
  }

  /**
   * Get all articles by genre
   * @param {string} genre The genre of the articles
   * @returns {Promise<Article[]>} An array of Article objects
   * @throws {FirebaseError} If the query fails
   */
  static async getArticlesByGenre(genre) {
    const q = query(
      collection(db, "articles"),
      where("genre", "==", genre),
    ).withConverter(articleConverter);
    const articleDocs = await getDocs(q);
    if (articleDocs.empty) {
      console.log("No matching documents.");
      return null;
    }
    return articleDocs.docs.map((snap) => snap.data());
  }

  static async getArticlesByAuthor(authorId) {
    const q = query(
      collection(db, "articles"),
      where("author", "==", authorId),
    ).withConverter(articleConverter);
    const articleDocs = await getDocs(q);
    if (articleDocs.empty) {
      console.log("No matching documents.");
      return [];
    }
    return articleDocs.docs.map((snap) => snap.data());
  }

  static async getAllArticles() {
    const q = query(collection(db, "articles")).withConverter(articleConverter);
    const articleDocs = await getDocs(q);
    if (articleDocs.empty) {
      console.log("No matching documents.");
      return null;
    }
    return articleDocs.docs.map((snap) => snap.data());
  }
}

const articleConverter = {
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Article(
      snapshot.id,
      data.author,
      data.title,
      data.subtitle,
      data.type,
      data.genre,
      data.slug,
      data.thumbnail,
      data.title_image,
      data.upload_date,
    );
  },
};
