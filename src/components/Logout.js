import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (props.setIsLoggedIn(true)) {
            localStorage.removeItem("token");
            navigate("/");
        } else {
            props.setIsLoggedIn(false);
        };
    }, [])

    return (
        <div></div>
    )
}

export default Logout;