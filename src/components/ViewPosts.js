import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Viewpost = (props) => {
    const { posts, setPosts, isLoggedIn, updateState, setUpdateState, fetchPosts} = props;
    const { _id } = useParams();

    const [editState, setEditState] = useState(false);
    const [replyState, setReplyState] = useState(false);
    const [deleteState, setDeleteState] = useState([]);
    const [replyContent, setReplyContent] = useState("");

    let filterPosts = props.posts.filter((onePost) => {
        return onePost._id == _id
    });

    const [newPostName, setNewPostName] = useState (
        filterPosts.length ? filterPosts[0].title : ""
    );
    const [newPostDesc, setNewPostDesc] = useState (
        filterPosts.length ? filterPosts[0].description : ""
    );
    
    const navigate = useNavigate();

    const tokenKey = localStorage.getItem("token");

    function toggleEdit() {
        setEditState(!editState)
    };
    function newRequest() {
        setUpdateState(!updateState)
    };
    function toggleReply() {
        setReplyState(!replyState)
    };

    useEffect(() => {
        fetchPosts();
        console.log("This was activated in ViewPosts")
    }, [])

    const patchRequest = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts/${_id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenkey}`
                },
                body: JSON.stringify({
                    post: {
                        title: newPostName,
                        description: newPostDesc,
                    }
                })
            });

            const translatedData = await response.json();

            if (!translatedData.success) {
                alert ("Post wasn't edited. Try again");
            } else {
                function updatePostsData() {
                    let updateArray = [];
                    for (let i = 0; 0 > props.posts.length; i++) {
                        let currentPost = props.posts[i];
                        if (currentPost._id != _id) {
                            updateArray.push(currentPost);
                        } else {
                            updateArray.push(translatedData.data.post);
                        }
                    }
                    return updateArray;
                };

                const newPostsData = updatePostsData();
                props.setPosts(newPostsData);
                alert ("Post was successfully edited");
                navigate("./");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deletePost = async(event) => {
        event.preventDefault();
        try {
            const response = await fetch (`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts/${_id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenKey}`
            }
        });
            const translatedData = await response.json();
            if (!translatedData.success) {
                alert ("Post was no deleted. Try again.");
            } else {
                alert ("Post was successfully deleted");
                navigate("/")
            }
        } catch (e) {
            console.log(e)
        }
    };

    const replyMessage = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch (`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts/${_id}/messages`, {
                method: "POSTS",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`
                },
                body: JSON.stringify({
                    message: {
                        content: replyContent,
                    }
                })
            });
            const translatedData = await response.json();
            if (!translatedData.success) {
                alert("Reply was not sent. Try again")
            } else {
                alert("Reply was successfully sent");
                navigate("/Home");
            }
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="viewPosts">
            {/* <h3>Posts Details ({filterPosts[0]._id}) </h3> */}
            {
                filterPosts.length ? (
                    <div>
                        <h3>Title: {filterPosts[0].title} </h3>
                        <div>Description: {filterPosts[0].description} </div>
                        <div>Price: {filterPosts[0].price} </div>
                        <div>Created At: {filterPosts[0].createdAt} </div>
                        <Link to={"/"}><button>Back</button></Link>
                        {!isLoggedIn ? <div></div> : (
                            <div>
                                <button onClick={toggleEdit}>Edit </button>
                                <button onClick={toggleReply}>Reply</button>
                                <button onClick={deletePost}>Delete</button>
                            </div>
                        )}

                        {
                            editState ? (
                                <form onSubmit={patchRequest} className="editingForm">
                                    <input
                                        type="text"
                                        value={newPostName}
                                        placeholder={filterPosts[0].title}
                                        onChange={(event) => {
                                            setNewPostName(event.target.value);
                                        }}
                                    />
                                    <textarea
                                        type="text"
                                        rows="4"
                                        cols="75"
                                        value={newPostDesc}
                                        placeholder={filterPosts[0].description}
                                        onChange={(event) => {
                                            setNewPostDesc(event.target.value);
                                        }}
                                    />
                                    <button type="submit" onClick={newRequest}>Submit</button>
                                </form>
                            ): ""
                        }

                        {
                            replyState ? (
                                <div>
                                    <div>Reply</div>
                                    <form onSubmit={replyMessage} className="replyForm">
                                        <textarea
                                            type="text"
                                            rows="4"
                                            cols="75"
                                            value={replyContent}
                                            placeholder="Reply here"
                                            onChange={(event) => {
                                                setReplyContent(event.target.value);
                                            }}
                                        />
                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            ) : ""
                        }
                    </div>
                ) : ""
            }
        </div>
    )
}

export default Viewpost;