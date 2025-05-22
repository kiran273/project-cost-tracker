import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, useToast } from '@chakra-ui/react';
import { addItem } from '../features/items/itemsSlice';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [cost, setCost] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();

  const handleAdd = async () => {
    const result = await dispatch(addItem({ userId: user.uid, name, cost }));
    if (addItem.fulfilled.match(result)) {
      toast({ title: 'Item Added', status: 'success', duration: 3000 });
      setName('');
      setCost(0);
    } else {
      toast({ title: 'Error', description: result.payload, status: 'error', duration: 3000 });
    }
  };

  return (
    <Box maxW="400px">
      <FormControl>
        <FormLabel>Item Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Cost</FormLabel>
        <NumberInput value={cost} onChange={(value) => setCost(Number(value))}>
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <Button onClick={handleAdd} colorScheme="blue" mt={4}>Add Item</Button>
    </Box>
  );
};

export default ItemForm;