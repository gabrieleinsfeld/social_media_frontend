import { useState } from "react";
import SidebarDrawer from "./SidebarDrawer";
import "./styles/sidebar.css";
import { Button, ChakraProvider, Box } from "@chakra-ui/react";
import { faUser, faHouse, faBars } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const updateOpen = (newState) => {
    setOpen(newState);
  };
  return (
    <>
      <div style={{ width: 200 }}>
        <ChakraProvider>
          <div style={{ width: open ? "65px" : 200 }} id="sidebar-container">
            {open ? (
              <div style={{ height: 25, textAlign: "center" }}>
                <i>
                  <FontAwesomeIcon size="2x" icon={faInstagram} />
                </i>
              </div>
            ) : (
              <div style={{ height: 25 }}>
                <span className="instagram-text">Gabegram</span>
              </div>
            )}

            <Button
              style={{
                justifyContent: open ? "center" : "flex-start",
                width: open && "45px",
              }}
              id="open-drawer-btn"
            >
              <Link to={"/"}>
                {open ? (
                  <i>
                    <FontAwesomeIcon icon={faHouse} />
                  </i>
                ) : (
                  <div>
                    <i style={{ marginRight: 10 }}>
                      <FontAwesomeIcon icon={faHouse} />
                    </i>
                    Main
                  </div>
                )}
              </Link>
            </Button>

            <SidebarDrawer
              isAnyOpen={open}
              content="main"
              onUpdateState={updateOpen}
            ></SidebarDrawer>
            <SidebarDrawer
              content="create"
              isAnyOpen={open}
              onUpdateState={updateOpen}
            ></SidebarDrawer>
            <CreatePostModal isAnyOpen={open}></CreatePostModal>
            <Button
              style={{
                justifyContent: open ? "center" : "flex-start",
                width: open && "45px",
              }}
              id="open-drawer-btn"
            >
              {open ? (
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>
              ) : (
                <div>
                  <i style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faUser} />
                  </i>
                  <Link to={"/profile"}>Profile</Link>
                </div>
              )}
            </Button>
            <Button
              style={{
                justifyContent: open ? "center" : "flex-start",
                width: open && "45px",
              }}
              onClick={toggleMenu}
              id="more-button"
            >
              {open ? (
                <i>
                  <FontAwesomeIcon icon={faBars} />
                </i>
              ) : (
                <div>
                  <i style={{ marginRight: 10 }}>
                    <FontAwesomeIcon icon={faBars} />
                  </i>
                  More
                </div>
              )}
            </Button>
            {isMenuOpen && (
              <Box
                style={{
                  position: "absolute",
                  bottom: 50, // Position the menu above the button
                  left: 10,
                  backgroundColor: "white",
                  border: "1px solid #ddd",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                  borderRadius: "5px",
                  width: "100%", // Full width of the button
                }}
              >
                <Button id="open-drawer-btn" width="100%">
                  <a
                    onClick={() => {
                      localStorage.removeItem("authToken");
                    }}
                    href="/log-in"
                  >
                    Log Out
                  </a>
                </Button>
              </Box>
            )}
          </div>
        </ChakraProvider>
      </div>
    </>
  );
}

export default Sidebar;
