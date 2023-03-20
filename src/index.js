import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { AllPosts, Header, Login, Logout, ViewPosts, Homepage, Profile, RegisterUser } from "./components";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn ] = useState(false);
    const [updateState, setUpdateState] = useState(false);

    async function fetchPosts() {
        try {
            console.log("my async function is running");

            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts');
            console.log(response);
            const translatedData = await response.json();
            console.log(translatedData);

            setPosts(translatedData.data.posts);

            // const actualPostsData = translatedData.data.posts;
            // console.log(actualPostsData);

            // setPosts(actualPostsData);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])


    return (
        <BrowserRouter>
        <Header isLoggedIn={ isLoggedIn }/>
        <Routes>
            <Route path="/Login" element={ <Login/> }/>
            <Route path="/Homepage" element={ <Homepage posts={posts} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}/>
            <Route path="/Profile" element={ <Profile posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} fetchPosts={fetchPosts}/>}/>
            <Route path="/" element={ <AllPosts posts={posts} setPosts={setPosts} updateState={updateState} setUpdateState={setUpdateState} fetchPosts={fetchPosts}/>}/>
            <Route path="/Logout" element={ <Logout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} posts={posts}/>}/>
            <Route path="/:_id" element={ <ViewPosts posts={posts} setPosts={setPosts} isLoggedIn={isLoggedIn} updateState={updateState} setUpdateState={setUpdateState} fetchPosts={fetchPosts}/>}/>
            <Route path="/RegisterUser" element={ <RegisterUser isLoggedIn={isLoggedIn}/>}/>
        </Routes>
        </BrowserRouter>
    )
}

const appElement = document.getElementById("app")
const root = createRoot(appElement)
root.render(<App />)