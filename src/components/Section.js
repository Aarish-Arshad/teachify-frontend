import '../styles/Section.css';

function Section({ id, title, children }) {
  return (
    <section id={id} className="section" name={id}>
      <h2 className="section-title">{title}</h2>
      {children}
    </section>
  );
}

export default Section;