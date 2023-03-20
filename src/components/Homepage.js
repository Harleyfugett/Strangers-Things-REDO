import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = (props) => {

    const [data, setData] = useState([]);
    const [myPosts, setMyPosts] = useState([]);
    const [myMessages, setMyMessages] = useState([]);

    const tokenKey = localStorage.getItem("token");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true);
            fetchData();
        } else {
            props.setIsLoggedIn(false);
            console.log("No ticket exist");
        };
    }, [])

    async function fetchData() {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${tokenKey}`,
                }
            });
            const translatedData = await response.json();
            setData(translatedData.data);
            setMyPosts(translatedData.data.posts);
            setMyMessages(translatedData.data.messages);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="homepage">
            <div>
                {
                    props.IsloggedIn ? (
                        <div className="mainHome">
                            <div className="homeHeader">
                                <h3>Welcome to Strangers Things, {data.username}</h3>
                            </div>
                            <div className="homeDisplay">
                                <h3 id="myPostsTitle">My Posts:</h3>
                                <div className="myPostSection">
                                    {
                                        myPosts.length ? myPosts.map((onePost) => {
                                            return (
                                                <div key={onePosts._id} className="myPosts">
                                                    <div>
                                                        Name: <Link to={`/${onePost._id}`}> {onePost.title}</Link>
                                                    </div>
                                                    <div>
                                                        Created: {onePost.createdAt}
                                                    </div>
                                                </div>
                                            )
                                        }) : <div>No data available</div>
                                    }
                                </div>
                                <h3 id="myMessagesTitle">My messages:</h3>
                                <div className="myMessageSection">
                                    {
                                        myMessages.length ? myMessages.map((singleMessage) => {
                                            return (
                                                <section key={singleMessage._id} className="myMessages">
                                                    <div>From: {singleMessage.fromUser.username}</div>
                                                    <div>Message: {singleMessage.content}</div>
                                                    <div>
                                                        Regarding:
                                                        <Link to={`/${singleMessage.post._id}`}>{ singleMessage.post.title}</Link>
                                                    </div>
                                                </section>
                                            )
                                        }) : <div>No data available</div>
                                    }
                            </div>
                        </div>
                    </div>
                    ) : <h2>Posting requries an account</h2>
                }
            </div>
        </div>
    )
}

export default Homepage;