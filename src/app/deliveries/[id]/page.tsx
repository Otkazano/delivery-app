'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { fetchDeliveries } from '@/lib/app/store/slices/deliveriesSlice';
import { RootState } from '@/lib/app/store';
import { useAppDispatch, useAppSelector } from '@/lib/app/store/hooks';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Box,
  Button,
} from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';

export default function DeliveryPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const deliveries = useAppSelector(
    (state: RootState) => state.deliveries.list
  );
  const loading = useAppSelector(
    (state: RootState) => state.deliveries.loading
  );
  const error = useAppSelector((state: RootState) => state.deliveries.error);

  useEffect(() => {
    if (deliveries.length === 0) {
      dispatch(fetchDeliveries());
    }
  }, [dispatch, deliveries.length]);

  const delivery = useMemo(() => {
    return deliveries.find((d) => d.uuid === id);
  }, [deliveries, id]);

  if (loading || deliveries.length === 0)
    return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Ошибка: {error}</Typography>;
  if (!delivery) return <Typography>Доставка не найдена</Typography>;

  return (
    <Box sx={{ padding: 2 }}>
      <Button
        variant="outlined"
        onClick={() => router.push('/')}
        sx={{ marginBottom: 2 }}
      >
        Назад
      </Button>

      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h5">Доставка #{delivery.cdek_number}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Отправитель: {delivery.sender.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Получатель: {delivery.recipient.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Текущий статус: {delivery.statuses.at(-1)?.name}
          </Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>
        История статусов
      </Typography>
      <List>
        {delivery.statuses.map((status) => (
          <ListItem key={status.code}>
            <ListItemText
              primary={`${format(new Date(status.date_time), 'dd MMM yyyy HH:mm:ss')} — ${status.name}`}
              secondary={status.city}
            />
          </ListItem>
        ))}
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Адрес доставки</Typography>
              <Typography variant="body1">
                {delivery.to_location.address}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {delivery.to_location.city}, {delivery.to_location.country}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6">Стоимость доставки</Typography>
              <Typography variant="body1">
                {delivery.delivery_detail.delivery_sum}{' '}
                {delivery.items_cost_currency}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                НДС: {delivery.delivery_detail.delivery_vat_sum}{' '}
                {delivery.items_cost_currency}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        Услуги
      </Typography>
      <List>
        {delivery.services.map((service) => (
          <ListItem key={service.code}>
            <ListItemText
              primary={`${service.parameter} — ${service.sum} ${delivery.items_cost_currency}`}
              secondary={`Скидка: ${service.discount_sum} ${delivery.items_cost_currency}`}
            />
          </ListItem>
        ))}
      </List>

      <Typography variant="h6" gutterBottom>
        Посылки
      </Typography>
      <List>
        {delivery.packages.map((pkg) => (
          <ListItem key={pkg.package_id}>
            <ListItemText
              primary={`Посылка № ${pkg.number}`}
              secondary={`Вес: ${pkg.weight} кг, Длина: ${pkg.length} см, Ширина: ${pkg.width} см, Высота: ${pkg.height} см`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
