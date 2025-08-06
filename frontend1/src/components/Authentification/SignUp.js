import { FormControl, VStack , FormLabel, Input, InputGroup, InputRightElement,Button} from '@chakra-ui/react'
import React from 'react'
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [pic, setPic] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [show,setShow]=useState(false);
    const [picLoading, setPicLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show);
    

    const submitHandler = async() => {
        setPicLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;  
        }
        if(password !== confirmpassword){
            toast({
                title: "Passwords Do Not Match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(name, email, password, pic);//this is in rep, not in vid
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post(
                "/api/user",
                {name,email,password,pic},
                config
            );
            console.log(data); //this is in rep, not in vid
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setPicLoading(false);
            navigate("/chats");
        } catch(error){
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
        }
    };

    const postdetails=(pics)=>{
        setPicLoading(true);
        if(pics === undefined){
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(pics);  //this is in repo, not in vid
        if(pics.type === "image/jpeg" || pics.type === "image/png" || pics.type === "image/jpg"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","piyushproj");    //dwxplxlml
            fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload",{
                method:"post",
                body:data,
            }).then((res) => res.json())
              .then(data => {
                setPic(data.url.toString());
                console.log(data.url.toString());
                setPicLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setPicLoading(false);
              });
        }
        else{
            toast({
                title: "Please Select an Image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };

  return (
    <VStack spacing="5px" >
        <FormControl id='first-name' isRequired >
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter Your Name' 
                onChange={(e) => setName(e.target.value)}
        />
        </FormControl>
        <FormControl id='email-signup' isRequired >
            <FormLabel>Email</FormLabel>
            <Input 
                type="email"
                placeholder='Enter Your Email' 
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>

        <FormControl id='Password-signup' isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    type={show ? "text" : "password"}
                    placeholder='Enter Your Password' 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>     
            </InputGroup>
        </FormControl>

        <FormControl id='confirmpassword-signup' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size="md">
                <Input
                    type={show ? "text" : "password"}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmpassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <FormControl id='Pic'  >
        <FormLabel >Profile Picture</FormLabel>
        <Input 
            type='file' 
            p={1}
            accept='image/*'
            onChange={(e) => postdetails(e.target.files[0])}
        />
        </FormControl>

        <Button
        width="100%"
        style={{marginTop: 15 }}
        // onChange={handleSubmit}
        backgroundColor="white" color="black" _hover={{backgroundColor:"#D0F9FD"}}
        onClick={submitHandler}
        isLoading={picLoading}
        >
        SUBMIT
        </Button>
        
    </VStack>
  )
}

export default SignUp;