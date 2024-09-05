import { URL } from "../url";
import { useState, useEffect } from "react";
import { Avatar } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/profile.css";
function Profile() {
  const [user, setUser] = useState({});
  const token = localStorage.getItem("authToken");
  async function fetchUser() {
    try {
      const response = await fetch(`${URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [token]);
  return (
    <>
      <ChakraProvider>
        <div id="profile-container">
          {user.user && (
            <div id="profile-header">
              <Avatar size={"2xl"}></Avatar>
              <div id="profile-info">
                {user.user.username}
                <div id="numbers">
                  <span className="number">{user.user.posts.length} </span>{" "}
                  Posts
                  <span style={{ marginLeft: "15px" }} className="number">
                    {user.user.followers.length}{" "}
                  </span>
                  Followers
                  <span style={{ marginLeft: "15px" }} className="number">
                    {user.user.following.length}{" "}
                  </span>
                  Following
                </div>
                <span style={{ fontWeight: "bolder", fontSize: "18px" }}>
                  {user.user.completeName}
                </span>
              </div>
            </div>
          )}
          {console.log(user.user)}
          <div id="posts-container">
            {user.user &&
              user.user.posts.map((post, index) => {
                return (
                  <div key={index}>
                    <img src={post.image} alt="img" />
                  </div>
                );
              })}
          </div>
        </div>
      </ChakraProvider>
    </>
  );
}

export default Profile;
