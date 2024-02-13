import ArticleRepository from "../models/article/ArticleRepository";

export default class ArticleService {
  static async getArticleBySlug(slug) {
    return ArticleRepository.getArticleBySlug(slug);
  }

  /**
   * Get all articles by genre
   * @param {string} genre The genre of the articles
   * @returns {Promise<Article[]>} An array of Article objects
   * @throws {FirebaseError} If the query fails
   */
  static async getArticlesByGenre(genre) {
    return ArticleRepository.getArticlesByGenre(genre);
  }

  /**
   * Get all articles by author
   * @param {string} authorId The ID of the author
   * @returns {Promise<Article[]>} An array of Article objects
   * @throws {FirebaseError} If the query fails
   */
  static async getArticlesByAuthor(authorId) {
    return ArticleRepository.getArticlesByAuthor(authorId);
  }

  /**
   * Get all articles
   * @returns {Promise<Article[]>} An array of Article objects
   * @throws {FirebaseError} If the query fails
   */
  static async getAllArticles() {
    return ArticleRepository.getAllArticles();
  }
}
