import { NavLink } from "react-router-dom"
import Styles from "./Navbar.module.css"

import { useAuthValue } from "../context/AuthContext"
import { useAuthentication } from "../hooks/useAutenthication"

const Navbar = () => {
    const {user} = useAuthValue();
    const {logout} = useAuthentication();

  return (
    <nav className={Styles.navbar}>
        <NavLink to="/" className={Styles.brand} >
            Mini <span>Blog</span>
        </NavLink>
        <ul className={Styles.links_list}>
            <li>
                <NavLink to="/" className={({isActive})=>(isActive ? Styles.active : "")}>Home</NavLink>
            </li>
            {!user && 
            <>
                <li>
                    <NavLink to="/login" className={({isActive})=>(isActive ? Styles.active : "")}>Entrar</NavLink>
                </li>
                <li>
                    <NavLink to="/register" className={({isActive})=>(isActive ? Styles.active : "")}>Cadastar</NavLink>
                </li>
            </>
            }
            {user && 
            <>
                <li>
                    <NavLink to="/posts/create" className={({isActive})=>(isActive ? Styles.active : "")}>Novo post</NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" className={({isActive})=>(isActive ? Styles.active : "")}>Dashboard</NavLink>
                </li>
            </>
            }
            <li>
                <NavLink to="/about" className={({isActive})=>(isActive ? Styles.active : "")}>Sobre</NavLink>
            </li>
            {user && (
                <li>
                    <button onClick={logout}>Sair</button>
                </li>
            )}
        </ul>
    </nav>
  )
}

export default Navbar