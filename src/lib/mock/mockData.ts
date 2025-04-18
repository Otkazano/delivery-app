import base from './delivery.json';

export const generateDeliveries = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const clone = structuredClone(base.entity);
    clone.uuid = `${clone.uuid}${i + 1}`;
    clone.number = clone.uuid;
    clone.cdek_number = `1008498578${i}`;
    clone.comment = `Твой коментарий ${i + 1}`;

    return clone;
  });
};

export const deliveries = generateDeliveries(1000);
