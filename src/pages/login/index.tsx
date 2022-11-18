import { Flex, Button, Stack, Text } from "@chakra-ui/react";

import { Input } from "../../components/Input";

import { useNavigate } from "react-router-dom";
// import { getUser } from "../../services/userService";

import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import logoToDo from "../../assets/todo.svg";
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  //   const NavigateForHome = () => {
  //     navigate("/app");
  //   };

  async function handleSubmit(event: any) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    if (data.email && data.password) {
      await signIn(data);
      navigate("/home");
    }
  }

  return (
    <Flex
      display="flex"
      flexDirection="column"
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      {" "}
      <img
        style={{ marginBottom: "3rem", width: "10rem" }}
        src={logoToDo}
        alt="Logo do app"
      />
      <Flex
        onSubmit={handleSubmit}
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
          <Text>
            Não possui uma conta?{" "}
            <Text
              transition="all 0.2"
              _hover={{
                color: "white",
                fontWeight: "bold",
                boxShadow: "none",
              }}
              as="a"
              href="/register"
              textDecoration="underline"
            >
              Cadastre-se
            </Text>{" "}
          </Text>
        </Stack>

        <Button type="submit" mt="6" colorScheme="blue">
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export { SignIn };
