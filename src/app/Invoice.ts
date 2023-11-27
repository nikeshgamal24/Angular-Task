export class salesInfo {
  salesId: number;
  customer: string;
  rate: number;
  quantity: number;
  salesAmount: number;

  constructor(
    salesId: number,
    customer: string,
    rate: number,
    quantity: number,
    salesAmount: number
  ) {
    this.salesId = salesId;
    this.customer = customer;
    this.rate = rate;
    this.quantity = quantity;
    this.salesAmount = salesAmount;
  }
}

export class Invoice {
  invoiceId: number;
  invoiceNumber: string;
  customer: string;
  invoiceAmount: number;
  invoiceDate: string;
  salesInfo: salesInfo[];

  constructor(
    invoiceId: number,
    invoiceNumber: string,
    customer: string,
    invoiceAmount: number,
    invoiceDate: string,
    salesInfo: salesInfo[]
  ) {
    this.invoiceId = invoiceId;
    this.invoiceNumber = invoiceNumber;
    this.customer = customer;
    this.invoiceAmount = invoiceAmount;
    this.invoiceDate = invoiceDate;
    this.salesInfo = salesInfo;
  }
}
