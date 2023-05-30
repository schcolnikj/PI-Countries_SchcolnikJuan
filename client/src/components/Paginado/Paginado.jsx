import style from './Paginado.module.css'

export const Paginado = ({totalCountries, countriesPerPage, setCurrentPage, currentPage, max}) => {
    let pages = [];

    for(let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pages.push(i)
    }


    return(
        <div>
            {currentPage > 1 ?
            <button 
                className={style.pageButton}
                onClick={() => setCurrentPage((page) => page -1)}
            >
                {"<"}
            </button>
            :
            <></>
            }
            {
              <input 
              className={style.pageButton} 
              value={currentPage}
              max={max} ></input>  
            }
            {currentPage < max ?
            <button 
                className={style.pageButton}
                onClick= {() => setCurrentPage((page) => page +1)}
            >
            {">"}
            </button>
            :
            <></>
            }
        </div>
    )
}

// pages.map((page, index) => {
//     return (
//         <button
//         key = {index} 
//         onClick = {() => setCurrentPage(page)}
//         className={page == currentPage ? style.pageButtonActive : style.pageButton}
//         >   
//                 <p  className = {style.number}>
//                 {page}
//                 </p>
//         </button>
//     )
// })