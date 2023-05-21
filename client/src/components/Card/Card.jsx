import style from './Card.module.css'
import { Link } from "react-router-dom";

const Card = (props) => {
    return (
        <div className={style.borde}>
            <div className={style.contenido}>
                <img src={props.flag} alt='' className={style.flag} />
                <div className={style.info}>
                    <h4 className={style.name} >{props.name}</h4>
                    <p className={style.continent} >{props.continent}</p>
                </div>


                <div className={style.detailDiv}>
                    <Link to={`/detail/${props.id}`} >
                        <button className={style.detailButton}>Detail</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Card;