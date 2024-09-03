import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "./actions/postsActions";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const { loading, error, posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Data</h1>
      {console.log(posts.posts)}
      {posts.posts &&
        posts.posts.map((post, index) => {
          return (
            <div key={index}>
              <ul>
                <li>{post.content}</li>
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default Home;
