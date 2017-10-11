import { IInvoice } from '../../interfaces/invoice';

export interface Invoice extends IInvoice {};

export interface InvoiceState {
  invoices: Invoice[];
}

export interface InvoiceContext {
  invoices: Invoice[];
}