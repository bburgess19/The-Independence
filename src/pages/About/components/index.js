import { useState, useEffect } from "react";
import { db } from "../../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import "../assets/About.css";
import EditorInChief from "./EditorInChief.js";
import SectionEditorGrid from "./SectionEditorGrid.js";
import StaffService from "../../../services/StaffService.js";
import OperationsTeam from "./OperationsTeam.js";

export default function About() {
  const [chief, setChief] = useState([]);
  const [editors, setEditors] = useState([]);
  const [operationsTeam, setOperationsTeam] = useState([]);

  // Filter for editors
  const filterMembers = (staffData) => {
    const chief = [];
    const editors = [];
    const operations = [];

    // Opting for a loop because multiple filters is wasteful
    staffData.forEach((member) => {
      if (member.position === "editor") {
        editors.push(member);
      } else if (member.position === "Editor in Chief") {
        chief.push(member);
      } else if (
        member.position !== "professor" &&
        member.position !== "writer"
      ) {
        operations.push(member);
      }
    });

    setChief(chief);
    setEditors(editors);
    setOperationsTeam(operations);
  };

  useEffect(() => {
    const getStaff = async () => {
      try {
        const staffData = await StaffService.getAllStaff();

        filterMembers(staffData);
      } catch (err) {
        console.error(err);
      }
    };

    getStaff();
  }, []);

  return (
    <div id="about-page-wrapper">
      <div id="about-header-wrapper">
        <div id="about-header" className="page-wrapper">
          <h2>A Publication Addressing the World with Our Own Voices</h2>
          <p id="about-independence">
            The Independence at UChicago is a student-led publication about
            matters relating to Africa. This publication provides a platform for
            honest perspectives and expression regarding politics, economics,
            sociology, literature, visual arts, music, and fashion.
          </p>
        </div>
      </div>
      <div id="editors-in-chief" className="page-wrapper">
        {chief.map((member, i) => {
          return (
            <EditorInChief
              position={i % 2 === 0 ? "right" : "left"}
              member={member}
              key={member.name}
            />
          );
        })}
      </div>
      <SectionEditorGrid editors={editors} />
      <OperationsTeam operationsTeam={operationsTeam} />
    </div>
  );
}
