import styles from "./Register.module.css";
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAutenthication";

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmaPassword] = useState("");
    const [error , setError] = useState("");

    const {createUser, error: authError, loading} = useAuthentication();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log(typeof createUser);

        setError("");

        const user = {
            displayName,
            email,
            password
        }

        if(password !== confirmPassword){
            setError("As senhas precisam ser iguais!");
            return 
        };

        const res = await createUser(user);

        console.log(res);
    };

    useEffect(()=>{
        if(authError){
            setError(authError);
        }
    },[authError])



  return (
    <div className={styles.register}>
        <h1>Cadatre-se para postar</h1>
        <p>Crie seu usuário e compartilhe suas histórias</p>
        <form onSubmit={handleSubmit}>
            <label>
                <span>Nome:</span>
                <input type="text" name="displayName" required placeholder="Nome do usúario" onChange={(e)=>setDisplayName(e.target.value)} value={displayName} />
            </label>
            <label>
                <span>E-mail:</span>
                <input type="email" name="email" required placeholder="E-mail do usúario" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            </label>
            <label>
                <span>Senha:</span>
                <input type="password" name="password" required placeholder="Insira sua senha" onChange={(e)=>setPassword(e.target.value)} value={password} />
            </label>
            <label>
                <span>Confirmação de senha:</span>
                <input type="password" name="confirmPassword" required placeholder="Confirme sua senha" onChange={(e)=>setConfirmaPassword(e.target.value)} value={confirmPassword} />
            </label>
            {!loading && <button className="btn">Cadastrar</button>}
            {loading && <button className="btn" disabled>Aguarde...</button>}
            {error && <p className="error">{error}</p>}
        </form>
    </div>
  )
}

export default Register