export interface Payment{
    paymentId?:number;
    customerId:number;
    cardNameSurname:string;
    cardNumber:string;
    cardExpiryDate:string;
    cardCvv:string;
    amountPay:number;
}