import { db } from "../../config/firebase";
import { Staff } from "./StaffModel";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";

export default class StaffRepository {
  /**
   * Get a staff member by their slug
   * @param {string} slug The slug of the staff member
   * @returns {Staff} The staff member
   * @throws {FirebaseError} If the query fails
   */
  static async getStaffBySlug(slug) {
    const q = query(
      collection(db, "users"),
      where("slug", "==", slug),
    ).withConverter(staffConverter);
    const staffDocs = await getDocs(q);

    if (staffDocs.empty) {
      console.error("No such document!");
      return null;
    }

    return staffDocs.docs[0].data();
  }

  static async getAuthorByArticleId(articleId) {
    const article = await getDoc(doc(db, "articles", articleId));

    if (!article.exists()) {
      console.error("No such document!");
      return null;
    }

    const articleData = article.data();
    const ref = doc(db, "users", articleData.author).withConverter(
      staffConverter,
    );
    const docSnap = await getDoc(ref);

    if (docSnap.empty) {
      console.error("No such document!");
      return null;
    }

    return docSnap.data();
  }

  /**
   * Get all staff members
   * @returns {Array<Staff>} An array of Staff objects
   * @throws {FirebaseError} If the query fails
   */
  static async getAllStaff() {
    const staffDocs = await getDocs(
      collection(db, "users").withConverter(staffConverter),
    );
    if (staffDocs.empty) {
      console.log("No matching documents.");
      return null;
    }

    return staffDocs.docs.map((snap) => snap.data());
  }
}

const staffConverter = {
  fromFirestore: (docSnap, options) => {
    const data = docSnap.data(options);
    return new Staff(
      docSnap.id,
      docSnap.id,
      data.blurb,
      data.position,
      data.profile_img,
      data.slug,
    );
  },
};
