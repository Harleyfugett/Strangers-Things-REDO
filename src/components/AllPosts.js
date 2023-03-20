import { useState, useEffect } from "react";
import { Link } from "react-router-dom"

const AllPosts = (props) => {
    const { posts, setPosts, fetchPosts } = props;
    return (
        <div className="postsPage">
            {
                posts.length ? posts.map((onePost) => {
                    return (
                        <div key={onePost._id} className="postsList">
                            <Link to={`/${onePost._id}`}> {onePost.title} ({onePost.price})</Link>
                        </div>
                    )
                }) : "No data available"
            }
        </div>
    )
}

export default AllPosts;