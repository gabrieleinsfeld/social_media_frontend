import {
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  ChakraProvider,
  Drawer,
  Avatar,
} from "@chakra-ui/react";
import { faSearch, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../url";

function SidebarDrawer({ onUpdateState, content, isAnyOpen }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await fetch(
          `${URL}/search?q=${encodeURIComponent(value)}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]); // Clear results if input is empty
    }
  };

  const handleClick = () => {
    onUpdateState(true);
  };
  const handleClose = () => {
    onUpdateState(false);
    onClose();
  };
  return (
    <>
      <ChakraProvider>
        <Button
          style={{
            justifyContent: isAnyOpen ? "center" : "flex-start",
            width: isAnyOpen && "45px",
          }}
          id="open-drawer-btn"
          colorScheme="blue"
          onClick={() => {
            onOpen();
            handleClick();
          }}
        >
          {content === "main" ? (
            isAnyOpen ? (
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
            )
          ) : null}
          {content === "create" ? (
            isAnyOpen ? (
              <i>
                <FontAwesomeIcon icon={faSearch} />
              </i>
            ) : (
              <div>
                <i style={{ marginRight: 10 }}>
                  <FontAwesomeIcon icon={faSearch} />
                </i>
                Search
              </div>
            )
          ) : null}
        </Button>
        <Drawer placement="left" onClose={handleClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent marginLeft="65px">
            <DrawerHeader borderBottomWidth="1px">
              Search{" "}
              <input
                id="search-bar"
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </DrawerHeader>
            <DrawerBody style={{ padding: "0px" }}>
              {results.length > 0 ? (
                results.map((user, index) => {
                  return (
                    <Link
                      to={"/another-profile"}
                      state={user}
                      id="search-item"
                      key={index}
                      onClick={handleClose}
                    >
                      <Avatar></Avatar>
                      <span>{user.username}</span>
                    </Link>
                  );
                })
              ) : (
                <div style={{ textAlign: "center" }}>No results found</div>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </ChakraProvider>
    </>
  );
}

export default SidebarDrawer;
