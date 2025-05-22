import { useSelector } from 'react-redux';
import { Box, Heading } from '@chakra-ui/react';

const TotalCost = () => {
  const items = useSelector((state) => state.items);
  const otherCosts = useSelector((state) => state.otherCosts);
  const total = items.reduce((sum, item) => sum + item.cost, 0) + otherCosts.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <Box>
      <Heading size="md">Total Project Cost: ${total}</Heading>
    </Box>
  );
};

export default TotalCost;