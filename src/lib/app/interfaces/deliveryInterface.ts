export interface Delivery {
  uuid: string;
  type: number;
  is_return: boolean;
  is_reverse: boolean;
  is_client_return: boolean;
  cdek_number: string;
  number: string;
  tariff_code: number;
  comment: string;
  shipment_point: string;
  delivery_point: string;
  items_cost_currency: string;
  recipient_currency: string;

  delivery_recipient_cost: {
    value: number;
    vat_sum: number;
  };

  sender: {
    company: string;
    name: string;
    contragent_type: string;
    passport_requirements_satisfied: boolean;
  };

  seller: {
    name: string;
  };

  recipient: {
    company: string;
    name: string;
    phones: {
      number: string;
    }[];
    passport_requirements_satisfied: boolean;
  };

  from_location: {
    code: number;
    city_uuid: string;
    city: string;
    country_code: string;
    country: string;
    region: string;
    region_code: number;
    longitude: number;
    latitude: number;
    address: string;
    postal_code: string;
  };

  to_location: {
    code: number;
    city_uuid: string;
    city: string;
    country_code: string;
    country: string;
    region: string;
    region_code: number;
    longitude: number;
    latitude: number;
    address: string;
    postal_code: string;
  };

  services: {
    code: string;
    parameter: string;
    sum: number;
    total_sum: number;
    discount_percent: number;
    discount_sum: number;
    vat_rate: number;
    vat_sum: number;
  }[];

  packages: {
    number: string;
    barcode: string;
    weight: number;
    length: number;
    width: number;
    weight_volume: number;
    weight_calc: number;
    height: number;
    comment: string;
    package_id: string;
    items: {
      name: string;
      ware_key: string;
      payment: {
        value: number;
        vat_sum: number;
      };
      weight: number;
      weight_gross: number;
      amount: number;
      delivery_amount: number;
      excise: boolean;
      cost: number;
      return_item_detail: object;
    }[];
  }[];

  statuses: {
    code: string;
    name: string;
    date_time: string;
    city: string;
  }[];

  delivery_mode: string;

  delivery_detail: {
    delivery_sum: number;
    total_sum: number;
    delivery_vat_rate: number;
    delivery_vat_sum: number;
    delivery_discount_percent: number;
    delivery_discount_sum: number;
  };

  calls: object;

  // requests: {
  //   request_uuid: string;
  //   type: string;
  //   date_time: string;
  //   state: string;
  //   errors?: {
  //     code: string;
  //     message: string;
  //   }[];
  // }[];
}
