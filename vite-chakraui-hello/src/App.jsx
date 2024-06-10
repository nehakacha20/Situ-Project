import { Image, Divider, Text, Box, Button, SimpleGrid, Grid, GridItem, Stack, Center } from '@chakra-ui/react'
import './App.css'
import { useState } from 'react';

function App() {
  const [propertInformation, setPropertyInformation] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState([null]);
  const [isModalopen, setIsModalOpen] = useState([false]);
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

  return (   
        <Box p={5}>
          <Button onClick={fetchDataFromServer} mb={5}>Fetch Properties</Button>
          <SimpleGrid columns={[1, 2, 3]} spacing={10}>  
          {propertInformation.map(info => (
          <Box key={info.id} borderWidth="1px" borderRadius="md" overflow="hidden" p={5} boxShadow="md" verticalAlign={30}>
          <Stack spacing={3}>
              <Text fontSize="xl" fontWeight="bold">{info.address}</Text>
              <Text fontSize="xl" mb={2}>{info.hostedBy} </Text>  
              <Text fontSize="xl" mb={2}> {info.price} </Text>
              <Text fontSize="xl" mb={2}>{info.guestSize} </Text> 
              <Text fontSize="xl" mb={2}>{info.bedroom}</Text> 
              <Text fontSize="xl" mb={2}>{info.bed} </Text>
              <Text fontSize="xl" mb={2}>{info.bathroom}</Text>
              {info.address === "South Devon" ?(
                <Button onClick={() => handleButtonClick(info)} mb={5}>South Devon</Button>
              ) : (
                <Button onClick={() => handleButtonClick(info)} mb={5}>France</Button>
              )}
            </Stack>
           
            <SimpleGrid columns={2} spacing={2} mt={4}>
              {info.imageLink.map((link, index) => (
                <Image
                key={index}
                src={link}
                alt={`Property ${info.id} Image ${index + 1}`}
                borderRadius="md"
                boxShadow="md"
                width="100%"
                height="200px"
                objectFit="cover"
                cursor="pointer"
                
                >
                </Image>
              ))}
            </SimpleGrid>
            </Box>
        ))
      }
    </SimpleGrid>
    </Box>
  )
}
export default App



// function App() {
//   const [Property, setProperty] = useState([]);

//   async function fetchDataFromServer() {
//     const data = await fetch("/Property-details.json");
//     const contacts = await data.json();
//     setProperty(Property);
//     console.log(Property);
//   }
//   return (
//     <>
//       <Table>
//         <TableCaption>Property Details</TableCaption>
//         <Thead>
//           <Tr>
//             <Th>Address</Th>
//             <Th>Hosted by</Th>
//             <Th>Guest Size</Th>
//             <Th>Bedroom</Th>
//             <Th>Bed</Th>
//             <Th>Bathroom</Th>
//             <Th>Price</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {
//             Property.map(Property => <Tr key={Property-details.south-devon}>
//               <Td>{Property-details.address}</Td>
//               <Td>{Property.hoseted-by}</Td>
//               <Td>{Property.guest-size}</Td>
//               <Td>{Property.bedrrom}</Td>
//               <Td>{Property.bed}</Td>
//               <Td>{Property.bathroom}</Td>
//             </Tr>)
//           }
//         </Tbody>
//       </Table>
//       <Button onClick={fetchDataFromServer}>Fetch Property</Button>
//     </>
//   )}
