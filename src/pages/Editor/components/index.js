import AuthorBlurb from "../../Article/components/AuthorBlurb";
import "../assets/Editor.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleList from "../../Home/components/ArticleList";
import StaffService from "../../../services/StaffService";

export default function Editor() {
  const params = useParams();
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    const getEditor = async () => {
      const staff = await StaffService.getStaffBySlug(params.editorSlug);
      setEditor(staff);
    };

    getEditor();
  }, [params.editorSlug]);

  if (editor === null) {
    return null;
  }

  return (
    <div className="page-wrapper" id="editor-page-wrapper">
      <div id="editor-header" className="page-wrapper">
        <AuthorBlurb author={editor} />
      </div>
      <hr />
      <p id="editor-all-content">All content by {editor.name}</p>
      <hr />
      <ArticleList author={editor.id} />
    </div>
  );
}
