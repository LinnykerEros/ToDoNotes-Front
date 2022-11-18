import { Flex, Stack, Button } from "@chakra-ui/react";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUser } from "../../services/userService";
import { toast } from "react-toastify";
import { TEXTS } from "../../utils/constants";
export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    try {
      if (password === confirmPassword) {
        const data = {
          name,
          email,
          password,
        };

        await createUser(data);

        toast.success(TEXTS.REGISTER_SUCESS, {
          autoClose: 2000,
        });
        navigate("/");
      } else {
        toast.error(TEXTS.ERROR, {
          autoClose: 2000,
        });
      }
    } catch (err: any) {
      if (!name || !email || !password) {
        toast.error(err.response.data.message[0], {
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      {" "}
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius="8px"
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            name="name"
            type="name"
            label="Nome"
            onChange={(e: any) => setName(e.target.value)}
          />
          <Input
            name="email"
            type="email"
            label="E-mail"
            onChange={(e: any) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            onChange={(e: any) => setPassword(e.target.value)}
          />
          <Input
            name="confirmPassword"
            type="password"
            label="Confirmar senha"
            onChange={(e: any) => setConfirmPassword(e.target.value)}
          />
        </Stack>

        <Flex justify="space-between">
          <Button onClick={() => navigate("/")} mt="6" colorScheme="red">
            Voltar
          </Button>
          <Button onClick={handleSubmit} mt="6" colorScheme="blue">
            Cadastrar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
