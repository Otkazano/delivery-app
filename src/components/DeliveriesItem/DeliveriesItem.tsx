import React from 'react';
import { TableRow, TableCell, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Delivery } from '@/lib/app/interfaces/deliveryInterface';

interface Props {
  delivery: Delivery;
}

const DeliveriesItem: React.FC<Props> = ({ delivery }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/deliveries/${delivery.uuid}`);
  };

  return (
    <TableRow>
      <TableCell>{delivery.cdek_number}</TableCell>
      <TableCell>
        {delivery.statuses[delivery.statuses.length - 1].name}
      </TableCell>
      <TableCell>
        {new Date(delivery.statuses[0].date_time).toLocaleDateString()}
      </TableCell>
      <TableCell>{delivery.from_location.city}</TableCell>
      <TableCell>{delivery.to_location.city}</TableCell>
      <TableCell>
        <Button variant="contained" color="primary" onClick={handleViewDetails}>
          Подробнее
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DeliveriesItem;
