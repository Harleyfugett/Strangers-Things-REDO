import { NavBar } from "../components";

const Header = (props) => {
    const { isLoggedIn } = props;

    return (
        <div className="header">
            <div>Strangers Things</div>
            <NavBar isLoggedIn={ isLoggedIn } />
        </div>
        )
}

export default Header;