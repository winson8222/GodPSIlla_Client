import React, { useState } from "react";
import BackgroundComponent from "../Background";
import { Container, SubContainer } from "./styles";
import { toast } from "react-toastify";
import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Table,
  Tbody,
  Tr,
  Td,
  CloseButton,
  Button // For delete row button
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import logo from "../../public/query.png" 
import FormComponent from "../FormComponent";

export default function QueryBoxComponent() {
  // Start with 1 row, each having two empty inputs

  return (
    <>
      <BackgroundComponent />
      <Container>
        <SubContainer>
          <img src={logo.src} width="40%" />
          <FormComponent/>
        </SubContainer>
      </Container>
    </>
  );
}
