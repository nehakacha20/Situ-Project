import { 
  ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal, Image,Text, Box, Button, 
  SimpleGrid, Stack} from '@chakra-ui/react'

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChakraProvider, FormControl, FormLabel, FormHelperText } from '@chakra-ui/react';
import { addMonths, differenceInDays, addDays, addYears } from 'date-fns';
import DatePickerComponent from './enquiryForm';



function App() {

  const [propertInformation, setPropertyInformation] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookedDates, setBookedDates] = useState({});

  async function fetchDataFromServer() {
    try {
    const propertyData = await fetch("/PropertyDetails.json");
    let propertInformation = await propertyData.json();
    setPropertyInformation(propertInformation);
    console.log(propertInformation)
  } 
  catch (error) {
    console.error('Error fetching property data:', error);
    }
  }
  const handleButtonClick = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  }
  const handleCloseModal = () => {
    
    setIsModalOpen(false);
    setSelectedProperty(null);
  }
  const handleDatesChange = (dates) => {
    setBookedDates((prevDates) => ({
      prevDates,
      [selectedProperty.id]: dates
    }));
  }

  return (   
        <Box > 
          <Button onClick={fetchDataFromServer} mb={5}> Properties Details</Button>
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>  
          {propertInformation.map(info => (
          <Box key={info.id} borderWidth="1px" borderRadius="md" overflow="hidden" p={5} boxShadow="md" verticalAlign={30}>
          <Stack spacing='24px'>
              <Text fontSize="xl" fontWeight="bold">{info.address}</Text>
              <Button onClick={() => handleButtonClick(info)} mb={5}>
              {info.id === "South Devon" ? "South Devon" : "France"}
              </Button>
              
            </Stack>
    
            </Box>
        ))
      }
    </SimpleGrid>

    {selectedProperty && (
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Property Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedProperty.imageLink && (
                 <SimpleGrid row={1} columns={1} spacing={5} mt={4}>
                    {selectedProperty.imageLink.map((link, index) => (
                      <Image
                        key={index}
                        src={link}
                        alt={`Property ${selectedProperty.id} Image ${index + 1}`}
                        borderRadius="md"
                        boxShadow="md"
                        width="100%"
                        height="200px"
                        objectFit="cover"
                        cursor="pointer"
                        onClick={() => setIsModalOpen(false)}
                      />
                    ))}
                  </SimpleGrid>
                )}
              <Text fontSize="xl" fontWeight="bold">{selectedProperty.address}</Text>
              <Text fontSize="xl" mb={2}>{selectedProperty.hostedBy}</Text>
              <Text fontSize="xl" mb={2}>{selectedProperty.price}</Text>
              <Text fontSize="xl" mb={2}>{selectedProperty.guestSize}</Text>
              <Text fontSize="xl" mb={2}>{selectedProperty.bedroom}</Text>
              <Text fontSize="xl" mb={2}>{selectedProperty.bed}</Text>
              <Text fontSize="xl" mb={2}>{selectedProperty.bathroom}</Text>
              <DatePickerComponent
                  bookedRanges={bookedDates[selectedProperty.id]?.bookedRanges || []}
                  onDatesChange={handleDatesChange}
                />
            
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      )}
      </Box>
  );
  }

export default App
