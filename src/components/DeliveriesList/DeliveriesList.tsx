'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/app/store/hooks';
import {
  fetchDeliveries,
  selectVisibleDeliveries,
  selectFilteredDeliveries,
  selectDeliveryLoading,
  selectDeliveryError,
  setFilterStatus,
  increaseVisibleCount,
  DeliveryFilterStatus,
} from '@/lib/app/store/slices/deliveriesSlice';
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TableContainer,
  useMediaQuery,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import DeliveriesItem from '../DeliveriesItem/DeliveriesItem';
import DeliveriesFilters from '../DeliveriesFilters/DeliveriesFilters';

const DeliveryList: React.FC = () => {
  const dispatch = useAppDispatch();
  const deliveries = useAppSelector(selectVisibleDeliveries);
  const allFiltered = useAppSelector(selectFilteredDeliveries);
  const loading = useAppSelector(selectDeliveryLoading);
  const error = useAppSelector(selectDeliveryError);
  const [status, setStatus] = useState<
    'all' | 'created' | 'accepted' | 'in_transit' | 'delivered' | 'cancelled'
  >('all');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      dispatch(fetchDeliveries());
    }
  }, [dispatch, mounted]);

  const handleFilterChange = (newStatus: DeliveryFilterStatus) => {
    setStatus(newStatus);
    dispatch(setFilterStatus(newStatus));
  };

  if (!mounted) return null;

  return (
    <Box p={isMobile ? 2 : 4}>
      <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
        Список доставок
      </Typography>

      <DeliveriesFilters value={status} onChange={handleFilterChange} />

      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {loading && (
        <Box mt={2} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {!loading && !error && deliveries.length === 0 && (
        <Box mt={2}>
          <Typography variant="body1">
            Нет доставок по выбранному фильтру.
          </Typography>
        </Box>
      )}

      {!loading && !error && deliveries.length > 0 && (
        <>
          <Paper>
            <TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
              <Table size={isMobile ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow>
                    <TableCell>Номер</TableCell>
                    <TableCell>Статус</TableCell>
                    <TableCell>Дата создания</TableCell>
                    <TableCell>Откуда</TableCell>
                    <TableCell>Куда</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <DeliveriesItem key={delivery.uuid} delivery={delivery} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {deliveries.length < allFiltered.length && (
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(increaseVisibleCount())}
              >
                Показать ещё
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default DeliveryList;
