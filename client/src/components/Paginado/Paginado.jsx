import style from './Paginado.module.css'

export const Paginado = ({totalCountries, countriesPerPage, setCurrentPage, currentPage}) => {
    let pages = [];

    for(let i = 1; i <= Math.ceil(totalCountries / countriesPerPage); i++){
        pages.push(i)
    }


    return(
        <div>
            {
                pages.map((page, index) => {
                        return (
                        <button
                            key = {index} 
                            onClick = {() => setCurrentPage(page)}
                            className={style.pageButton}
                            >   
                                <p  className = {style.number}>
                                {page}
                                </p>
                        </button>
                    )
                })
            }
        </div>
    )
}