import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, NumberInput, NumberInputField, useToast } from '@chakra-ui/react';
import { editOtherCost, deleteOtherCost } from '../features/otherCosts/otherCostsSlice';

const OtherCostList = () => {
  const otherCosts = useSelector((state) => state.otherCosts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const [editId, setEditId] = useState(null);
  const [editDescription, setEditDescription] = useState('');
  const [editAmount, setEditAmount] = useState(0);

  const handleEdit = (cost) => {
    setEditId(cost.id);
    setEditDescription(cost.description);
    setEditAmount(cost.amount);
  };

  const saveEdit = async () => {
    const result = await dispatch(editOtherCost({ userId: user.uid, id: editId, description: editDescription, amount: editAmount }));
    if (editOtherCost.fulfilled.match(result)) {
      toast({ title: 'Cost Updated', status: 'success', duration: 3000 });
      setEditId(null);
    } else {
      toast({ title: 'Error', description: result.payload, status: 'error', duration: 3000 });
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteOtherCost({ userId: user.uid, id }));
    if (deleteOtherCost.fulfilled.match(result)) {
      toast({ title: 'Cost Deleted', status: 'success', duration: 3000 });
    } else {
      toast({ title: 'Error', description: result.payload, status: 'error', duration: 3000 });
    }
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Other Item</Th>
            <Th>Amount</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {otherCosts.map((cost) => (
            <Tr key={cost.id}>
              {editId === cost.id ? (
                <>
                  <Td>
                    <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  </Td>
                  <Td>
                    <NumberInput value={editAmount} onChange={(value) => setEditAmount(Number(value))}>
                      <NumberInputField />
                    </NumberInput>
                  </Td>
                  <Td>
                    <Button colorScheme="green" onClick={saveEdit}>Save</Button>
                    <Button ml={2} onClick={() => setEditId(null)}>Cancel</Button>
                  </Td>
                </>
              ) : (
                <>
                  <Td>{cost.description}</Td>
                  <Td>${cost.amount}</Td>
                  <Td>
                    <Button colorScheme="blue" onClick={() => handleEdit(cost)}>Edit</Button>
                    <Button colorScheme="red" ml={2} onClick={() => handleDelete(cost.id)}>Delete</Button>
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OtherCostList;