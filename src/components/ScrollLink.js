import { Link } from 'react-scroll';

function ScrollLink({ to, children }) {
  return (
    <Link
      to={to}
      smooth={true}
      duration={500}
      offset={-80} // Adjust according to your navbar height
      className="scroll-link"
    >
      {children}
    </Link>
  );
}

export default ScrollLink;
