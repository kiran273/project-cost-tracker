import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, FormControl, FormLabel, Input, NumberInput, NumberInputField, useToast } from '@chakra-ui/react';
import { addOtherCost } from '../features/otherCosts/otherCostsSlice';

const OtherCostForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const toast = useToast();

  const handleAdd = async () => {
    const result = await dispatch(addOtherCost({ userId: user.uid, description, amount }));
    if (addOtherCost.fulfilled.match(result)) {
      toast({ title: 'Cost Added', status: 'success', duration: 3000 });
      setDescription('');
      setAmount(0);
    } else {
      toast({ title: 'Error', description: result.payload, status: 'error', duration: 3000 });
    }
  };

  return (
    <Box maxW="400px">
      <FormControl>
        <FormLabel>Other Item</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Amount</FormLabel>
        <NumberInput value={amount} onChange={(value) => setAmount(Number(value))}>
          <NumberInputField />
        </NumberInput>
      </FormControl>
      <Button onClick={handleAdd} colorScheme="blue" mt={4}>Add Cost</Button>
    </Box>
  );
};

export default OtherCostForm;