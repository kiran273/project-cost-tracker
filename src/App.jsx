import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { setUser, clearUser } from './features/auth/authSlice';
import { fetchItems } from './features/items/itemsSlice';
import { fetchOtherCosts } from './features/otherCosts/otherCostsSlice';
import { Box, Heading, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Button, useToast } from '@chakra-ui/react';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ItemForm from './components/ItemForm';
import OtherCostForm from './components/OtherCostForm';
import ItemList from './components/ItemList';
import OtherCostList from './components/OtherCostList';
import TotalCost from './components/TotalCost';

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const toast = useToast();
  const [tabIndex, setTabIndex] = useState(0); // 0: Login, 1: Sign Up

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const serializedUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName || null,
        };
        dispatch(setUser(serializedUser));
        dispatch(fetchItems(firebaseUser.uid));
        dispatch(fetchOtherCosts(firebaseUser.uid));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
      toast({ title: 'Logged Out', status: 'success', duration: 3000 });
    } catch (error) {
      toast({ title: 'Logout Failed', description: error.message, status: 'error', duration: 3000 });
    }
  };

  return (
    <Box p={4}>
      {isAuthenticated ? (
        <VStack spacing={6}>
          <Heading>Project Cost Tracker</Heading>
          <Heading size="md">Welcome, {user.email}</Heading>
          <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
          <ItemForm />
          <OtherCostForm />
          <ItemList />
          <OtherCostList />
          <TotalCost />
        </VStack>
      ) : (
        <Tabs maxW="400px" mx="auto" mt={8} index={tabIndex} onChange={(index) => setTabIndex(index)}>
          <TabList>
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <LoginForm />
            </TabPanel>
            <TabPanel>
              <SignupForm setTabIndex={setTabIndex} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </Box>
  );
};

export default App;