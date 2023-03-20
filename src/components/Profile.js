import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const { posts, setPosts, fetchPosts } = props;
    const [ createStat, setCreateStat ] = useState(false);
    const [ createTitle, setCreateTitle ] = useState("");
    const [ createDesc, setCreateDesc ] = useState("");
    const [ createPrice, setCreatePrice] = useState("");

    function toggleCreate() {
        setCreateStat(!createStat)
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchPosts();
        } else {
            props.setIsLoggedIn(false);
            console.log("No token exist");
        };
    }, []);

    const creatRequest = async (event) => {
        event.preventDefault();

        const tokenKey = localStorage.getItem("token");

        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    post: {
                        title: createTitle,
                        description: createDesc,
                        price: createPrice,
                        willDeliver: true
                    }
                })
            });
            const translatedData = await response.json();
            if (!translatedData.success) {
                alert ("Post was not created. Try again");
            } else {
                props.setPosts([...props.posts, translatedData.data]);
                alert ("Post was successfully created");

                setCreateStat(false)
                setCreateTitle("")
                setCreateDesc("")
                setCreatePrice("")
                navigate("/")
            }
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div className="profile">
            <div>Profile</div>
            <div>
                <button onClick={toggleCreate}>Create New post</button>
                {
                    createStat ? (
                        <form onSubmit={creatRequest} className="newForm">
                            <input
                                type="text"
                                value={createTitle}
                                onChange={(event) => {
                                    setCreateTitle(event.target.value);
                                }}
                                placeholder="Post Name"
                            />
                            <textarea
                                type="text"
                                value={createDesc}
                                rows="4"
                                cols="75"
                                placeholder="Post Description"
                                onChange={(event) => {
                                    setCreateDesc(event.target.value);
                                }}
                            />
                            <input  
                                type="text"
                                value={createPrice}
                                onChange={(event) => {
                                    setCreatePrice(event.target.value);
                                }}
                                placeholder="Price"
                            />
                            <button type="submit">Submit</button>
                        </form>
                    ) : ""
                }
            </div>
        </div>
    );
}

export default Profile;