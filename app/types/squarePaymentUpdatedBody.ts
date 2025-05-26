import type { SquarePaymentStatus } from "@prisma/client";

export interface SquarePaymentUpdatedBody {
  merchant_id: string;
  type: string;
  event_id: string;
  created_at: string;
  data: Data;
}
export interface Data {
  type: string;
  id: string;
  object: Object;
}
export interface Object {
  payment: Payment;
}
export interface Payment {
  amount_money: AmountMoneyOrApprovedMoneyOrTotalMoney;
  approved_money: AmountMoneyOrApprovedMoneyOrTotalMoney;
  card_details: CardDetails;
  created_at: string;
  delay_action: string;
  delay_duration: string;
  delayed_until: string;
  id: string;
  location_id: string;
  order_id: string;
  receipt_number: string;
  receipt_url: string;
  risk_evaluation: RiskEvaluation;
  source_type: string;
  status: SquarePaymentStatus;
  total_money: AmountMoneyOrApprovedMoneyOrTotalMoney;
  updated_at: string;
  version_token: string;
}
export interface AmountMoneyOrApprovedMoneyOrTotalMoney {
  amount: number;
  currency: string;
}
export interface CardDetails {
  avs_status: string;
  card: Card;
  card_payment_timeline: CardPaymentTimeline;
  cvv_status: string;
  entry_method: string;
  statement_description: string;
  status: string;
}
export interface Card {
  bin: string;
  card_brand: string;
  card_type: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  last_4: string;
  prepaid_type: string;
}
export interface CardPaymentTimeline {
  authorized_at: string;
  captured_at: string;
}
export interface RiskEvaluation {
  created_at: string;
  risk_level: string;
}
