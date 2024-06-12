import { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  IconButton,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [fields, setFields] = useState([{ id: 1, label: "", type: "text" }]);

  const addField = () => {
    const newField = { id: fields.length + 1, label: "", type: "text" };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleLabelChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, label: value } : field
    );
    setFields(updatedFields);
  };

  return (
    <Container centerContent maxW="container.sm" py={4}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Mobile-First Form Builder
        </Text>
        {fields.map((field) => (
          <Box key={field.id} width="100%">
            <HStack>
              <FormControl>
                <FormLabel>Field Label</FormLabel>
                <Input
                  value={field.label}
                  onChange={(e) => handleLabelChange(field.id, e.target.value)}
                  placeholder="Enter field label"
                />
              </FormControl>
              <IconButton
                aria-label="Remove field"
                icon={<FaTrash />}
                onClick={() => removeField(field.id)}
              />
            </HStack>
          </Box>
        ))}
        <Button
          leftIcon={<FaPlus />}
          colorScheme="teal"
          onClick={addField}
          width="100%"
        >
          Add Field
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;