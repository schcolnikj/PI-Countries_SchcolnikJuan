import { Link } from "react-router-dom"
import style from "./NavBar.module.css"
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getCountries } from "../../redux/actions";

const NavBar = () => {

    const dispatch = useDispatch();

    const handleClick = (event) => {
        dispatch(getCountries())
    }

    return (
        <div className={style.mainContainer} >
            <Link to='/home' className={style.link} onClick={handleClick} >HOME</Link>
            <SearchBar />
            <Link to='/create' className={style.link} >CREATE</Link>
        </div>
    )
}

export default NavBar;