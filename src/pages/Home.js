import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Section from "../components/Section";
import { Layout, Button } from "antd";
// import dummy from "../assets/dummy-image.jpeg";
import h1 from "../assets/h1.png";
import h2 from "../assets/h2.png";
import h3 from "../assets/h3.png";
import h4 from "../assets/h4.png";
// import h5 from "../assets/h5.png";
// import h6 from "../assets/h6.png";
import WCU from "../assets/wcu.png";
import testimonials from "../assets/testimonials.png";
import { useNavigate } from 'react-router-dom';
import Footer from "../components/footer";
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';


const features = [
  {
    title: "Automatically Create Multiple-Choice Quizzes from Your Own Content.",
    text: "Save hours of manual effort by uploading your notes or PDFs — our system analyzes the material and generates clear, well-structured multiple-choice questions tailored to your topic. You can edit, customize, and share them instantly.",
    buttonText: "Generate MCQs",
    reverse: false,
  },
  {
    title: "Need to Reinforce Key Terms? Let Us Fill in the Blanks for You.",
    text: "Make learning interactive by turning your lecture content into fill-in-the-blank questions that focus on essential terms and definitions. It’s a smart way to reinforce memory and check student understanding — no manual formatting needed.",
    buttonText: "Create Blanks",
    reverse: true,
  },
  {
    title: "Convert PDFs and Notes into Clear, Structured Lecture Material",
    text: "Just upload your resources — our platform will break them down into easy-to-follow bullet points or outlines. Whether you’re preparing slides or classroom notes, you’ll get polished, ready-to-use lecture material in minutes.",
    buttonText: "Prepare Lecture",
    reverse: false,
  },
];


function Home() {
  const navigate = useNavigate();
  
    const handleLoginClick = () => {
      navigate('/login');
    };
  return (
    <Layout>
      <Navbar />
      <Layout.Content className="home-content">
        <div className="section-wrapper">
          <Section id="home" title="Effortless Teaching Starts Here" className="section-styles">
            <p className="sub-title">Create engaging lectures and assessments in minutes — just bring your content, and we’ll handle the rest.</p>
            <button onClick={handleLoginClick} className="home-btn">Get Started</button>

            <div className="grid-container">
              <section className="grid-section">
                <img src={h1} className="section-image" alt="Dummy Image" />
              </section>

              <section className="grid-section">
                <img src={h2} className="section-image" alt="Dummy Image" />
              </section>

              <section className="grid-section">
                <img src={h3} className="section-image" alt="Dummy Image" />
              </section>
            </div>
          </Section>
        </div>

        <div className="section-wrapper">
          <Section id="features" title="Designed to Support the Way You Teach" className="section-styles">
            <p className="sub-title">From uploading PDFs to generating quizzes, we’ve built every feature with teachers in mind</p>
            <div className="features-wrapper">
              {features.map((item, index) => (
                <div
                  className={`feature-grid ${item.reverse ? "reverse" : ""}`}
                  key={index}
                >
                  <div className="feature-text">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <Button onClick={handleLoginClick} type="primary" className="home-btn">
                      {item.buttonText}
                    </Button>
                  </div>
                  <img src={h4} className="feature-image"></img>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <div className="section-wrapper">
          <Section id="whychoose" title="What Makes Teachify Different?" className="section-styles">
            <p className="sub-title">Where AI meets education to support your teaching journey.</p>
            <section className="tools-section feature-grid">
              <img src={WCU} className="section-image"/>
              <div className="text-content">
                <h2 >Built for Teachers Who Deserve Better Tools</h2>
                <p >
                  We’ve crafted every feature with teachers in mind — to save you time,
                  reduce manual work, and help you deliver better lessons. From instant quiz
                  generation to customizable lecture outlines, our platform gives you total
                  control with none of the hassle.
                </p>
              </div>
            </section>

          </Section>
        </div>

        <div className="section-wrapper">
          <Section id="testimonials" title="Why Teachers Love Teachify" className="section-styles">
            <p className="sub-title">"Teachify changed the way I teach!" – A happy teacher</p>
            <section className="tools-section feature-grid">
              <div className="text-content">
                <h2 >WHAT OUR TEACHERS SAY</h2>
                <p>
                  Real feedback from real educators — discover how our platform is transforming the way teachers create and deliver learning content. From auto-generated quizzes to effortless lecture building, hear what teachers love about using our tools every day.
                </p>
              </div>
              <img src={testimonials} className="section-image"/>
            </section>
          </Section>
        </div>

       

      </Layout.Content>
      <Footer />
    </Layout>
  );
}

export default Home;