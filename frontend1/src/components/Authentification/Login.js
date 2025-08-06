import {React, useState} from 'react'
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { ChatState } from "../../Context/ChatProvider";

//import all the neccessary

const Login = () => {
    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [show,setShow]=useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleClick = () => setShow(!show);
    const toast = useToast();

    const navigate = useNavigate();
    const { setUser } = ChatState();

    const submitHandler = async() => {
        setLoading(true);
        if(!email || !password){
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;  
        }
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const {data} = await axios.post(
                "/api/user/login",
                {email,password},
                config
            );
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            
            setUser(data);  //this is in rep, not in vid
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
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
            setLoading(false);
        }
    };

  return (
    <VStack spacing="5px" > 
        <FormControl id='email-login' isRequired >
        <FormLabel>Email</FormLabel>
        <Input 
        value={email}
        type="email"
        placeholder='Enter Your Email' 
        onChange={(e) => setEmail(e.target.value)}
        />
        </FormControl>

        <FormControl id='Password-login' isRequired >
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={show ? "text" : "password"}
                placeholder= "Enter Your Password" 
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>

        <Button
        width="100%"
        style={{marginTop:'15px'}}
        onClick={submitHandler}
        backgroundColor="white" color="black" _hover={{backgroundColor:"#D0F9FD"}}
        isLoading={loading}
         >
        LOGIN
        </Button>
        
    </VStack>
  )
}

export default Login