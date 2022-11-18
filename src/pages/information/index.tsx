import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {
  deleteNote,
  getNoteById,
  updateNote,
} from "../../services/noteService";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { Input } from "../../components/Input";
import { Notyf } from "notyf";
import { TEXTS } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
interface NoteProps {
  author: { id: string; name: string };
  content: string;
  created_at: string;
  description: string;
  title: string;
  id: string;
  authorId: string;
}

function Information() {
  moment.locale("pt-br");
  const notify = new Notyf({ duration: 3000 });
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState({} as NoteProps);
  const date = moment().format("MMM Do YY");
  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const dataNote = await getNoteById(id);
          setNote(dataNote);
        }
      } catch (err: any) {
        console.log(err);
      }
    })();
  }, [id]);
  console.log(note.authorId);
  const handleDeleteNote = async () => {
    await deleteNote(note?.id);
    navigate("/home");
  };
  const handleUpdateNote = async (e: any) => {
    e.preventDefault();

    try {
      if (!title || !description || !content) {
        notify.error(TEXTS.ERROR);
      }

      const authorId = user.id;

      if (!title) {
        setTitle(note?.title);
      }
      if (!description) {
        setDescription(note?.description);
      }
      if (!content) {
        setContent(note?.content);
      }

      if (title && description && content) {
        const data = {
          title,
          description,
          content,
          authorId,
        };

        console.log(data);
        await updateNote(note?.id, data);

        notify.success(TEXTS.UPDATE_SUCESS);
      }

      const dataNote = await getNoteById(note?.id);
      setNote(dataNote);
      onClose();
    } catch (err: any) {
      notify.error(TEXTS.ERROR);
    }
  };

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box mt="8rem" fontSize="3rem">
        <h1>
          {" "}
          <strong>{note.title}</strong>{" "}
        </h1>
      </Box>

      <Box
        width="50rem"
        height="30rem"
        bg="gray"
        margin="auto"
        mt="3rem"
        mb="2rem"
        display="flex"
        flexDir="column"
        alignItems="center"
        //   justifyContent="center"
        gap="1rem"
      >
        <Text fontSize="2rem">
          <strong>Descrição:</strong> {note.description}{" "}
        </Text>
        <Text fontSize="2rem">
          <strong>Autor: {note?.author?.name}</strong>{" "}
        </Text>
        <Text fontSize="2rem">
          <strong>Criada em {date}</strong>{" "}
        </Text>
        <Text fontSize="2rem" mt="0.5rem">
          ⬇ Conteúdo dá Nota ⬇
        </Text>
        <Text fontSize="2rem"> {note.content} </Text>

        {user?.id === note?.authorId ? (
          <Box mt="5rem">
            <Button colorScheme="blue" onClick={onOpen}>
              Atualizar Nota
            </Button>
            <Button onClick={handleDeleteNote} colorScheme="red" ml="1rem">
              Deletar Nota
            </Button>
          </Box>
        ) : (
          ""
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          {/* <ModalOverlay /> */}
          <ModalContent bg={"#202024"} alignItems={"center"} gap={2}>
            <ModalHeader> Adicione uma Nota </ModalHeader>
            <Input
              defaultValue={note.title}
              name={"Title"}
              label={"Title"}
              width={"80%"}
              ml={12}
              onChange={(e: any) => {
                setTitle(e.target.value);
              }}
            />
            <Input
              defaultValue={note.description}
              name={"description"}
              label={"Descrição"}
              width={"80%"}
              ml={12}
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
            />
            <Input
              defaultValue={note.content}
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
                onClick={handleUpdateNote}
                // variant="ghost"
              >
                Atulizar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

export { Information };
