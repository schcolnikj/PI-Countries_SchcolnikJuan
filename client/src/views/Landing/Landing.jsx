import { Link } from "react-router-dom";
import style from './Landing.module.css'

const Landing = () => {
    return (
        <>
        <div className={style.image}>
        <Link to={`/home`} className={style.link} >
            <h1 className={style.ingresar} >Ingresar</h1>
        </Link>
        </div>
        </>
    )
}

export default Landing;