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
  Select,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
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

  const handleTypeChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, type: value } : field
    );
    setFields(updatedFields);
  };

  const handleLabelChange = (id, value) => {
    const updatedFields = fields.map((field) =>
      field.id === id ? { ...field, label: value } : field
    );
    setFields(updatedFields);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedFields = Array.from(fields);
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);
    setFields(reorderedFields);
  };

  return (
    <Container centerContent maxW="container.sm" py={4}>
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl" fontWeight="bold">
          Mobile-First Form Builder
        </Text>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <VStack
                {...provided.droppableProps}
                ref={provided.innerRef}
                spacing={4}
                width="100%"
              >
                {fields.map((field, index) => (
                  <Draggable key={field.id} draggableId={String(field.id)} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        width="100%"
                        bg="gray.50"
                        p={4}
                        borderRadius="md"
                        boxShadow="md"
                      >
                        <HStack>
                          <FormControl>
                            <FormLabel>Field Label</FormLabel>
                            <Input
                              value={field.label}
                              onChange={(e) => handleLabelChange(field.id, e.target.value)}
                              placeholder="Enter field label"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Field Type</FormLabel>
                            <Select
                              value={field.type}
                              onChange={(e) => handleTypeChange(field.id, e.target.value)}
                            >
                              <option value="text">Text</option>
                              <option value="number">Number</option>
                              <option value="select">Select</option>
                              <option value="multi-select">Multi-select</option>
                              <option value="range">Range</option>
                              <option value="calculation">Calculation</option>
                            </Select>
                          </FormControl>
                          <IconButton
                            aria-label="Remove field"
                            icon={<FaTrash />}
                            onClick={() => removeField(field.id)}
                          />
                        </HStack>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </VStack>
            )}
          </Droppable>
        </DragDropContext>
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