import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { Card } from "../../components/Card";
import { useNavigate } from "react-router-dom";
import { createNote, getNotes } from "../../services/noteService";
import { Input } from "../../components/Input";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import { TEXTS } from "../../utils/constants";

function Home() {
  const token = Cookies.get("reactauth.token");
  const { user, note, fetchNotes } = useContext(AuthContext);
  const [notes, setNotes] = useState(note);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      if (token) {
        const note = await getNotes();
        setNotes(note);
      } else {
        navigate("/");
      }
    })();
  }, [token, navigate, notes]);

  const handleSubmitNote = async (e: any) => {
    e.preventDefault();

    try {
      if (!title || !description || !content) {
        toast.error(TEXTS.ERROR, {
          autoClose: 2000,
        });
      }
      const authorId = user.id;
      const data = {
        title,
        description,
        content,
        authorId,
      };

      await createNote(data);

      toast.success(TEXTS.REGISTER_NOTES, {
        autoClose: 2000,
      });

      fetchNotes();
      onClose();
      setContent("");
      setDescription("");
      setTitle("");
    } catch (err: any) {
      toast.error(TEXTS.ERROR, {
        autoClose: 2000,
      });
    }
  };

  return (
    <>
      <Box
        width="100%"
        border="0"
        padding="1rem"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Button onClick={onOpen} width="30%" top="10rem" colorScheme="blue">
          Adicione uma Nota
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          {/* <ModalOverlay /> */}
          <ModalContent bg={"#202024"} alignItems={"center"} gap={2}>
            <ModalHeader> Adicione uma Nota </ModalHeader>
            <Input
              defaultValue={title}
              name={"Title"}
              label={"Title"}
              width={"80%"}
              ml={12}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              defaultValue={description}
              name={"description"}
              label={"Descrição"}
              width={"80%"}
              ml={12}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
            <Input
              defaultValue={content}
              name={"content"}
              label={"Conteúdo"}
              width={"80%"}
              ml={12}
              onChange={(e: any) => {
                setContent(e.target.value);
              }}
            />

            <ModalCloseButton />

            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSubmitNote}
                // variant="ghost"
              >
                Adicionar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Box
        maxWidth="73rem"
        margin="10rem auto"
        padding="5rem 1rem"
        display="flex"
        flexDir="column"
      >
        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          gap="2rem"
        >
          {notes.map((note: any) => {
            return (
              <Card
                key={note.id}
                title={note.title}
                description={note.description}
                content={note.content}
                id={note.id}
              />
            );
          })}
        </Box>
      </Box>
    </>
  );
}

export { Home };
