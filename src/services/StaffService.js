import StaffRepository from "../models/staff/StaffRepository";

export default class StaffService {
  /**
   * Get a staff member by their slug
   * @param {string} slug The slug of the staff member
   * @returns {Promise<Staff>} The staff member
   * @throws {FirebaseError} If the query fails
   */
  static async getStaffBySlug(slug) {
    return StaffRepository.getStaffBySlug(slug);
  }

  /**
   * Get the author of an article
   * @param {string} articleId The ID of the article
   * @returns {Promise<Staff>} The author of the article
   * @throws {FirebaseError} If the query fails
   */
  static async getAuthorByArticleId(articleId) {
    return StaffRepository.getAuthorByArticleId(articleId);
  }

  /**
   * Gets all staff members.
   * @returns {Promise<Staff[]>} - All staff members.
   */
  static async getAllStaff() {
    return StaffRepository.getAllStaff();
  }
}
