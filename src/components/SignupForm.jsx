import { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const SignupForm = ({ setTabIndex }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth); // Sign out to prevent auto-login
      toast({ title: 'Signup Successful, Please Login', status: 'success', duration: 3000 });
      setEmail('');
      setPassword('');
      setTabIndex(0); // Switch to login tab
    } catch (error) {
      toast({ title: 'Signup Failed', description: error.message, status: 'error', duration: 3000 });
    }
  };

  return (
    <VStack spacing={4} maxW="400px" mx="auto" mt={8}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button colorScheme="blue" onClick={handleSignup}>Sign Up</Button>
    </VStack>
  );
};

export default SignupForm;