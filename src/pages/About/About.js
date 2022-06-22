//CSS
import Styles from "./About.module.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={Styles.about}>
        <h2>Sobre o Mini <span>Blog</span></h2>
        <p>Este projeto foi criado com React no front-end e Firebase no back-end</p>
        <Link to="/posts/create" className="btn">Criar Post</Link>
    </div>
  )
}

export default About