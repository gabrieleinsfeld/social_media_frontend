import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, toggleLike } from "./actions/postsActions";
import { Avatar } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/posts.css";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartOutline } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { URL } from "../url";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const { loading, error, posts } = useSelector((state) => state.posts);

  const handleToggleLike = (id) => {
    dispatch(toggleLike(id));
  };

  const handleLike = async (postId, liked) => {
    if (liked) {
      try {
        const response = await fetch(`${URL}/like/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
      } catch (error) {
        console.log("Error liking", error);
      }
    } else {
      try {
        const response = await fetch(`${URL}/like`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ postId }),
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
      } catch (error) {
        console.log("Error liking", error);
      }
    }
  };

  useEffect(() => {
    dispatch(fetchPosts(token));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <ChakraProvider>
        {console.log(posts.posts)}
        {posts.posts &&
          posts.posts.map((post, index) => {
            return (
              <div id="post-container" key={index}>
                <div id="avatar-container">
                  <Avatar></Avatar>
                  {post.user.username}
                </div>
                <img src={post.image} alt="image" />
                <div id="likes-container">
                  {post.liked ? (
                    <i
                      onClick={() => {
                        handleToggleLike(post.id);
                        handleLike(post.id, post.liked);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <FontAwesomeIcon
                        size="xl"
                        icon={faHeartSolid}
                        color="red"
                      />
                    </i>
                  ) : (
                    <i
                      onClick={() => {
                        handleToggleLike(post.id);
                        handleLike(post.id, post.liked);
                      }}
                      style={{ marginRight: 10 }}
                    >
                      <FontAwesomeIcon size="xl" icon={faHeartOutline} />
                    </i>
                  )}
                </div>
                <div>{post.content}</div>
                <div id="comments-container"></div>
              </div>
            );
          })}
      </ChakraProvider>
    </div>
  );
};

export default Home;
