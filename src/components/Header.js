import {useState} from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo.svg'

function Header({ logout, userEmail, isLoggedIn }) {
  const [isBurgerMenuOn, setIsBurgerMenuOn] = useState(false)
  const location = useLocation();
  const isLoginPage = location?.pathname === "/sign-in";

  return (
    <header className={`${isBurgerMenuOn ? "header header_mobile" : "header"}`}>
      <img src={logo} alt="лого" className="header__logo" />
      {isLoginPage ? (
      <Link to="/sign-up" className="header__button header__button_log">
        Регистрация
      </Link>
      ) : isLoggedIn ? undefined : (
      <Link to="/sign-in" className="header__button header__button_log">
        Войти
      </Link>
      )}
      {isLoggedIn && (
        <>
        <div className={`${isBurgerMenuOn ? 'header__user-info header__user-info_active' : 'header__user-info'}`}>
          <p className="header__email">{userEmail}</p>
          <Link to="/sign-in" className="header__button" onClick={logout}>
            Выйти
          </Link>
        </div>
        <button className="burger" onClick={()=>{
          setIsBurgerMenuOn(!isBurgerMenuOn)
      }}>
        <span className={`${isBurgerMenuOn ? 'burger__line burger__line_active' : 'burger__line'}`}></span>
        <span className={`${isBurgerMenuOn ? 'burger__line burger__line_active' : 'burger__line'}`}></span>
        <span className={`${isBurgerMenuOn ? 'burger__line burger__line_active' : 'burger__line'}`}></span> 
      </button>
      </>
      )}
    </header>
  )
    
}
export default Header