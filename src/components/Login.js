import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginUser, setLoginUser] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const navigate = useNavigate();

    async function logIn(e) {
        e.preventDefault();

        try {
            if (loginPassword.length < 4) {
                alert ("Password is too short. 4 characters minimum")
                return;
            } else if (loginUser.length < 2) {
                alert ("Username is too short. 2 characters minimum")
                return;
            };

            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/users/login', {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({
                    user: {
                        username: loginUser,
                        password: loginPassword
                    }
                })
            });

            console.log(response.status);

            const translatedData = await response.json();

            if (!translatedData.success) {
                alert ("login was unsuccessful. Please try again.");
            } else {
                const tokenKey = translatedData.data.token;
                console.log("Token received:", tokenKey)
                localStorage.setItem("token", tokenKey);
                console.log("Token stored in localStorage");
                alert("Login was successful");

                setLoginUser("")
                setLoginPassword("")
                navigate("/Homepage")
            }
            console.log("Control flow reached end of logIn function")
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={ logIn }>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(event) => setLoginUser(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={(event) => setLoginPassword(event.target.value)}
                />
                <button type="submit">Login</button>

            </form>
        </div>
    )
}

export default Login;