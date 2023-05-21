
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountry } from "../../redux/actions";
import { Link } from 'react-router-dom'
import style from "./Detail.module.css"

const Detail = () =>{
    const { id } = useParams();
    const { detail } = useSelector((state) => state)
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getCountry(id))
     }, [dispatch, id]);

     console.log(detail);

    return (
      <div className={style.container}>
         {detail && (
            <>
              <div className={style.boxes}>
                <h2 className={style.name}>{detail.name}</h2> 
                <div className={style.div}>
              <img src={detail.flags} alt={detail.name} className={style.image} />
                <section className={style.detail}>
                      {detail.id && <p>ID: {detail.id}</p>}
                      {detail.continent && <p>Continent: {detail.continent}</p>}
                      {detail.capital && <p>Capital: {detail.capital}</p>}
                      {detail.subregion && <p>Subregion: {detail.subregion}</p>}
                      {detail.area && <p>Área: {detail.area}</p>}
                      {detail.population && <p>Población: {detail.population}</p>}
                </section>

                <section className={style.activity}>
                  {detail.activities?.map((actividad) => {
                    return (
                      <article key={Math.random().toString(36).substr(2, 9)}>
                        <div className={style.boxActivity}>
                          <h3>{actividad.name}</h3>
                          <p>Difficulty: {actividad.difficulty}</p>
                          <p>Season: {actividad.season}</p>
                          <p>Duration: {actividad.duration}</p>
                        </div>
                      </article>
                    );
                  })}
                </section>
                <div className={style.returnBox}>
                  <Link to='/home' className={style.linkReturn}>
                  <button className={style.return} >RETURN</button>
                  </Link>
                </div>
                </div>
              </div>
            </>
            )}
      </div>
    
    )
    
};

export default Detail;

