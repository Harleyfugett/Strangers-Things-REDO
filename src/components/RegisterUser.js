import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
    const [newUser, setNewUser] = useState([]);
    const [newPassword, setNewPassword] = useState([]);

    const navigate = useNavigate();

    async function newCustomer(event) {
        event.preventDefault();

        try {
            if (newUser.length < 2) {
                alert ("Username is too short. 2 characters minimum")
                return;
            } else if (newPassword.length < 5) {
                alert ("Password is too short. 5 characters minimum")
                return;
            }

            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: newUser,
                        password: newPassword
                    }
                })
            });

            const translatedData = await response.json();
            
            if (!translatedData.success) {
                alert ("New account was not registered")
            } else {
                const tokenKey = translatedData.data.token;
                localStorage.setItem("token", tokenKey);
                alert("New account was successfully created");

                setNewUser("")
                setNewPassword("")
                navigate("/Homepage")
            }
        } catch (e) {
        console.log(e)
        }
    }
    
    return (
        <div>
            <h3>Create Account</h3>
            <form onSubmit={newCustomer}>
                <input
                    type="text"
                    value={newUser}
                    placeholder="New Username"
                    onChange={(event) => setNewUser(event.target.value)}
                />
                <input
                    type="text"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={(event) => setNewPassword(event.target.value)}
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    )
}

export default RegisterUser;