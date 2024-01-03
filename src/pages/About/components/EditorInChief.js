import "../assets/EditorInChief.css";

export default function EditorInChief({ position, member }) {
  return (
    <div className="chief-wrapper">
      <div
        className="chief-img-wrapper"
        style={{ order: position === "right" ? 1 : 0 }}
      >
        <img src={member.profile_img} alt={member.name} />
      </div>
      <div className="chief-card-details">
        <h3 className="chief-name">{member.name}</h3>
        <h4 className="chief-position">{member.position}</h4>
        <p className="chief-blurb">{member.blurb}</p>
      </div>
    </div>
  );
}
