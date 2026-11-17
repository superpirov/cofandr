export type OrderStatus = "PENDING" | "SUCCEEDED" | "CANCELED" | "FAILED";

export type PublicOrderStatus = {
  status: OrderStatus;
  planName: string;
  amount: number;
  currency: string;
};

export type CreatePaymentResponse = {
  confirmationUrl: string;
  orderId: string;
};
