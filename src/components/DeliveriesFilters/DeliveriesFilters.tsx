import React from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import {
  DeliveryFilterStatus,
  statusOptions,
} from '@/lib/app/store/slices/deliveriesSlice';

interface Props {
  value: DeliveryFilterStatus;
  onChange: (value: DeliveryFilterStatus) => void;
}

const DeliveriesFilters: React.FC<Props> = ({ value, onChange }) => {
  const labelId = 'delivery-status-label';

  const handleChange = (e: SelectChangeEvent<DeliveryFilterStatus>) => {
    onChange(e.target.value as DeliveryFilterStatus);
  };

  return (
    <FormControl sx={{ minWidth: 200, mb: 2 }}>
      <InputLabel id={labelId}>Статус доставки</InputLabel>
      <Select
        labelId={labelId}
        value={value}
        label="Статус доставки"
        onChange={handleChange}
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DeliveriesFilters;
