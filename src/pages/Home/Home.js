//Css
import Styles from "./Home.module.css";
import {useAuthValue} from "../../context/AuthContext"
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import PostDetails from "../../components/PostDetails";

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents : posts, loading} = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(query){
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={Styles.home}>
      <h1>Vejas nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={Styles.search_form}>
        <input type="text" placeholder="Ou busque por tags" onChange={(e)=> setQuery(e.target.value)}/>
        <button className="btn btn-dark">Procurar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post)=>(
          <PostDetails key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={Styles.nopost}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn">Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home