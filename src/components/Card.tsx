import React from "react";

import { Box, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  title: string;
  description: string;
  content: string;
  id: string;
}

function Card({ title, description, content, id }: CardProps) {
  const navigate = useNavigate();
  return (
    <Box bg="#0d0d0d" cursor="pointer" borderRadius="8px" gap="1rem">
      <Box
        mt="1rem"
        width="12rem"
        display="flex"
        flexDir="column"
        ml="1rem"
        gap="1rem"
      >
        <strong>Titulo: {title}</strong>
        <span>Descrição: {description}</span>
        <span>Conteúdo: {content}</span>

        <Button
          onClick={() => navigate(`/information/${id}`)}
          mr="1rem"
          mb="1rem"
          colorScheme="blue"
        >
          Ver mais informaçoes
        </Button>
      </Box>
    </Box>
  );
}

export { Card };
