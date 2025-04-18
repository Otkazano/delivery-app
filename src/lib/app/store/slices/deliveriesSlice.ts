import { deliveries } from '@/lib/mock/mockData';
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { Delivery } from '../../interfaces/deliveryInterface';

type DeliveryStatus =
  | 'created'
  | 'accepted'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';
export type DeliveryFilterStatus = DeliveryStatus | 'all';

export const statusOptions: { value: DeliveryFilterStatus; label: string }[] = [
  { value: 'all', label: 'Все' },
  { value: 'created', label: 'Создан' },
  { value: 'accepted', label: 'Принят' },
  { value: 'in_transit', label: 'В пути' },
  { value: 'delivered', label: 'Доставлено' },
  { value: 'cancelled', label: 'Отменено' },
];

interface DeliveryState {
  list: Delivery[];
  filtered: Delivery[];
  filterStatus: DeliveryStatus | 'all';
  loading: boolean;
  error: string | null;
  visibleCount: number;
}

const initialState: DeliveryState = {
  list: [],
  filtered: [],
  filterStatus: 'all',
  loading: false,
  error: null,
  visibleCount: 20,
};

export const fetchDeliveries = createAsyncThunk(
  'deliveries/fetch',
  async () => {
    await new Promise((r) => setTimeout(r, 500));
    return deliveries as Delivery[];
  }
);

const statusMap: Record<string, DeliveryStatus> = {
  created: 'created',
  accepted: 'accepted',
  in_transit: 'in_transit',
  delivered: 'delivered',
  cancelled: 'cancelled',
};

const deliveriesSlice = createSlice({
  name: 'deliveries',
  initialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<DeliveryFilterStatus>) {
      state.filterStatus = action.payload;
      state.visibleCount = 20;
    },
    increaseVisibleCount(state) {
      state.visibleCount += 20;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка при загрузке доставок';
      });
  },
});

export const { setFilterStatus, increaseVisibleCount } =
  deliveriesSlice.actions;

export default deliveriesSlice.reducer;

const selectList = (state: RootState) => state.deliveries.list;
const selectFilterStatus = (state: RootState) => state.deliveries.filterStatus;
export const selectDeliveryLoading = (state: RootState) =>
  state.deliveries.loading;
export const selectDeliveryError = (state: RootState) => state.deliveries.error;
export const selectVisibleCount = (state: RootState) =>
  state.deliveries.visibleCount;

export const selectFilteredDeliveries = createSelector(
  [selectList, selectFilterStatus],
  (list, filterStatus) => {
    if (filterStatus === 'all') return list;

    const filter = filterStatus.toLowerCase();
    return list.filter((delivery) => {
      const lastStatus = delivery.statuses[delivery.statuses.length - 1];
      const mapped = statusMap[lastStatus.code.toLowerCase()];
      return mapped === filter;
    });
  }
);

export const selectVisibleDeliveries = createSelector(
  [selectFilteredDeliveries, selectVisibleCount],
  (filtered, count) => filtered.slice(0, count)
);
