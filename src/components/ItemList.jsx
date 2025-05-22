import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, Input, NumberInput, NumberInputField, useToast } from '@chakra-ui/react';
import { editItem, deleteItem } from '../features/items/itemsSlice';

const ItemList = () => {
  const items = useSelector((state) => state.items);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toast = useToast();
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCost, setEditCost] = useState(0);

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
    setEditCost(item.cost);
  };

  const saveEdit = async () => {
    const result = await dispatch(editItem({ userId: user.uid, id: editId, name: editName, cost: editCost }));
    if (editItem.fulfilled.match(result)) {
      toast({ title: 'Item Updated', status: 'success', duration: 3000 });
      setEditId(null);
    } else {
      toast({ title: 'Error', description: result.payload, status: 'error', duration: 3000 });
    }
  };

  const handleDelete = async (id) => {
    const result = await dispatch(deleteItem({ userId: user.uid, id }));
    if (deleteItem.fulfilled.match(result)) {
      toast({ title: 'Item Deleted', status: 'success', duration: 3000 });
    } else {
      toast({ title: 'Error', description: result.payload, status: 'error', duration: 3000 });
    }
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Cost</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {items.map((item) => (
            <Tr key={item.id}>
              {editId === item.id ? (
                <>
                  <Td>
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </Td>
                  <Td>
                    <NumberInput value={editCost} onChange={(value) => setEditCost(Number(value))}>
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
                  <Td>{item.name}</Td>
                  <Td>${item.cost}</Td>
                  <Td>
                    <Button colorScheme="blue" onClick={() => handleEdit(item)}>Edit</Button>
                    <Button colorScheme="red" ml={2} onClick={() => handleDelete(item.id)}>Delete</Button>
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

export default ItemList;