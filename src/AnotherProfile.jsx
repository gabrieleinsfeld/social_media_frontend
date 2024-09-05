import { Avatar, Button } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { URL } from "../url";
import "./styles/profile.css";
function AnotherProfile() {
  const location = useLocation();
  const user = location.state;
  const token = localStorage.getItem("authToken");
  const [followers, setFollowers] = useState(user.followers.length);

  const [isFollowing, setIsFollowing] = useState(null);
  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await fetch(`${URL}/user/follow/status/${user.id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.message) {
          setIsFollowing(false);
        } else {
          setIsFollowing(data.isFollowing);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowing();
  }, []);

  const handleFollow = async (userId) => {
    if (isFollowing) {
      try {
        const response = await fetch(`${URL}/user/unfollow/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.message) {
          setFollowers((prevState) => prevState - 1);
          setIsFollowing(false);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`${URL}/user/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        });
        const data = await response.json();
        if (data.newFollowing) {
          setFollowers((prevState) => prevState + 1);
          setIsFollowing(true);
        } else {
          throw new Error("Error following user");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <ChakraProvider>
        <div id="profile-container">
          {user && (
            <div id="profile-header">
              <Avatar size={"2xl"}></Avatar>
              <div id="profile-info">
                {user.username}{" "}
                <Button
                  onClick={() => {
                    handleFollow(user.id);
                  }}
                  colorScheme={isFollowing ? "gray" : "blue"}
                  style={{ height: "30px" }}
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
                <div id="numbers">
                  <span className="number">{user.posts.length} </span> Posts
                  <span style={{ marginLeft: "15px" }} className="number">
                    {followers}{" "}
                  </span>
                  Followers
                  <span style={{ marginLeft: "15px" }} className="number">
                    {user.following.length}{" "}
                  </span>
                  Following
                </div>
                <span style={{ fontWeight: "bolder", fontSize: "18px" }}>
                  {user.completeName}
                </span>
              </div>
            </div>
          )}
          {console.log(user)}
          <div id="posts-container">
            {user &&
              user.posts.map((post, index) => {
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

export default AnotherProfile;
