import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles/modal.css";

function CreatePostModal({ isAnyOpen }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);
  const submitButton = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    // Create a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <Button
        onClick={onOpen}
        id="open-drawer-btn"
        style={{
          justifyContent: "flex-start",
        }}
      >
        {isAnyOpen ? (
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
        )}
      </Button>

      <Modal
        size={imagePreview && "xl"}
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent style={{ textAlign: "center" }}>
          <ModalHeader style={{ borderBottom: "1px #dedede solid" }}>
            Create new Post
          </ModalHeader>
          <ModalCloseButton
            onClick={() => {
              setImage(null);
              setImagePreview(null);
            }}
          />
          <ModalBody style={{ padding: "0px" }}>
            {imagePreview ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  style={{ width: "100%" }}
                />
                <div style={{ height: "100%" }}>
                  <textarea
                    id="content-post"
                    style={{ width: "100%", height: "100%" }}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                </div>
              </div>
            ) : (
              <Text
                style={{
                  marginTop: "80px",
                }}
                fontWeight="bold"
                mb="1rem"
              >
                <i>
                  <FontAwesomeIcon size="4x" icon={faImage} />
                </i>
              </Text>
            )}
          </ModalBody>

          <ModalFooter
            style={{
              justifyContent: "center",
              display: imagePreview ? "none" : "block",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Button onClick={handleButtonClick} colorScheme="blue">
                Select from Computer
                <input
                  hidden
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>

              <div>
                <textarea style={{ display: "none" }} value={content} />
              </div>
              <button ref={submitButton} hidden type="submit"></button>
            </form>
          </ModalFooter>
          {imagePreview && (
            <Button
              colorScheme="blue"
              style={{ width: "100px", margin: "20px auto" }}
              onClick={() => {
                if (submitButton.current) {
                  submitButton.current.click();
                }
              }}
            >
              Create Post
            </Button>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePostModal;
