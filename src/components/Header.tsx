import React from "react";

import styles from "../styles/Header.module.css";
import {
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { SignOut } from "phosphor-react";
import { AuthContext } from "../context/AuthContext";
import logoToDo from "../assets/todo.svg";

function Header() {
  const navigate = useNavigate();
  const { user, signOutUser } = useContext(AuthContext);
  const { pathname } = useLocation();
  return (
    <>
      {pathname === "/" ? (
        ""
      ) : (
        <Box
          className={styles.header}
          display="flex"
          justifyContent="space-between"
        >
          <Box cursor="pointer">
            <img
              onClick={() => navigate("/home")}
              src={logoToDo}
              alt="LogoShareBlog"
            />
          </Box>
          <Box
            _hover={{ cursor: "pointer", borderBottom: "3px solid #3182ce" }}
            onClick={() => navigate("/home")}
          >
            Home
          </Box>

          <div>
            <Menu>
              <MenuButton
                className={styles.signOut}
                as={Button}
                colorScheme="blue"
                boxShadow="none"
                rightIcon={<ChevronDownIcon />}
              >
                {user?.name}
              </MenuButton>
              <MenuList bg="white" color="gray.600">
                <MenuItem
                  gap={150}
                  onClick={signOutUser}
                  transition="all 0.2"
                  fontSize={"1.15rem"}
                  _hover={{
                    bg: "#3182ce",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "none",
                  }}
                  boxShadow="none"
                  bg="transparent"
                  fontWeight="bold"
                >
                  Sair {<SignOut size={24} />}
                </MenuItem>
              </MenuList>
            </Menu>
          </div>
        </Box>
      )}
    </>
  );
}

export { Header };
