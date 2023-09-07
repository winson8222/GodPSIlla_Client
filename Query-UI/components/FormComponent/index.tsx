import React, { useState } from "react";
import BackgroundComponent from "../Background";
import { Container, SubContainer } from "./styles";
import { toast, ToastContainer } from "react-toastify";
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
  Button,
  Box // For delete row button
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import axios, { AxiosResponse } from "axios";

export default function FormComponent() {
    const [rows, setRows] = useState([{ svc: "", mtd: "" }]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState("");
  
        const handleSubmit = async (e) => {
            e.preventDefault();
        
            if (!selectedFile) {
              toast.error("Please select a file to upload!");
              return;
            }

            if (!url) {
              toast.error("Please input an upstream url!");
              return;
            }
            
            for (let i = 0; i < rows.length; i++) {
                if(rows[i].mtd == "" || rows[i].svc == "") {
                    toast.error("Please fill in all the boxes")
                    return
                }
            }
      
        const formData = new FormData();
        formData.append('csvfile', selectedFile);

        formData.append('upstreamurl', url);
        
        var svcArray = ""
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
          
            svcArray += row.svc + " ";
            svcArray += row.mtd + " ";
        }
        formData.append('svcinfo', svcArray.trim())
      
        axios
        .post("http://localhost:3001/PSI", formData, {
            headers: {
            "Content-Type": "multipart/form-data",
            },
        })
        .then((response: AxiosResponse) => {
            if (response.status === 200) {
                console.log(response.data);
                toast.success("Intersection Size: " + response.data);
            } else {
              toast.error('Query failed' + response.data);
            }
        })
        .catch((error) => {
            console.log(error); 

            toast.error('Query failed: ' + error.response.data);

        });
  

      };
      
  
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
  
    const handleAddRow = () => {
        if (rows.length >= 5) {
            toast.error('Too many Services Added');
        } else {
            setRows([...rows, { svc: "", mtd: "" }]);
        }
      
    };
  
    const handleInputChange = (rowIndex, inputName, value) => {
      setRows((previous) => {
        const newRows = [...previous];
        newRows[rowIndex][inputName] = value;
        return newRows;
      });
    };
  
    const handleDeleteRow = (rowIndex) => {
      if (rows.length == 1) {
        return
      }
      setRows((previous) => {
        const newRows = [...previous];
        newRows.splice(rowIndex, 1);
        return newRows;
      });
    };
  
    const renderRows = () => {
      return rows.map((row, rowIndex) => (
        <Tr key={rowIndex}>
          <Td>
            <Input
              name={`svc_${rowIndex}`}
              value={row.svc}
              onChange={(e) => handleInputChange(rowIndex, 'svc', e.target.value)}
              width="100%"
              required
              borderColor="gray.700"
              placeholder="Service Name"
            />
          </Td>
          <Td>
            <Input
              name={`mtd_${rowIndex}`}
              value={row.mtd}
              onChange={(e) => handleInputChange(rowIndex, 'mtd', e.target.value)}
              width="100%"
              required
              borderColor="gray.700"
              placeholder="Method Name"
            />
          </Td>
          <Td>
            <CloseButton onClick={() => handleDeleteRow(rowIndex)} />
          </Td>
        </Tr>
      ));
    };
    
    return (
        <FormControl mt={4}>
        {/* <FormLabel><strong>Services</strong></FormLabel> */}
        <Table size="sm" >
          <Tbody >
            {renderRows()}
            <Tr>
              <Td colSpan={3} border="none">
              <IconButton
                onClick={handleAddRow}
                aria-label="Add"
                icon={<AddIcon color="currentColor" />}
                border="none"
                opacity={0.5}
                bg="black"
                color="white"
                _hover={{
                    bg: 'white',  
                    color: 'black'  
                }}
                />
              </Td>
            </Tr>

          </Tbody>
        </Table>
        <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              mt={4}
              ml={4}
              width="85%"
              required
              borderColor="gray.700"
              placeholder="Upstream URL e.g.(localhost:7999)"
            />
        <Input
          type="file"
          onChange={handleFileChange}
          mt={4}  // margin-top for spacing
          border="none"
          required
        />
        <Button color="white" bg='black' onClick={handleSubmit} mt={2} marginLeft={4}>
            Query
        </Button>
      </FormControl>
    )
}