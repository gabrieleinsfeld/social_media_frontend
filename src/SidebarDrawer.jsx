import {
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
  ChakraProvider,
  Drawer,
  Center,
} from "@chakra-ui/react";
import { faPlus, faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SidebarDrawer({ onUpdateState, content, isAnyOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
                <FontAwesomeIcon icon={faPlus} />
              </i>
            ) : (
              <div>
                <i style={{ marginRight: 10 }}>
                  <FontAwesomeIcon icon={faPlus} />
                </i>
                Create
              </div>
            )
          ) : null}
        </Button>
        <Drawer placement="left" onClose={handleClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent marginLeft="65px">
            <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
            <DrawerBody>
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </ChakraProvider>
    </>
  );
}

export default SidebarDrawer;
