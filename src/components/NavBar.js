import { Link } from "react-router-dom";

const NavBar = (props) => {
    const { isLoggedIn } = props;

    return (
        <div className="navLinks">
            <Link to="/Homepage"> Homepage </Link>
            { isLoggedIn ? <div></div> : <Link to="/RegisterUser"> Sign Up </Link> }
            { isLoggedIn ? <div></div> : <Link to="/Login"> Sign In </Link> }
            { !isLoggedIn ? <div></div> : <Link to="/Profile"> Profile </Link> }
            <Link to="/"> Posts </Link>
            { !isLoggedIn ? <div></div> : <Link to="/Logout"> Logout </Link> }
        </div>
    )
}

export default NavBar;