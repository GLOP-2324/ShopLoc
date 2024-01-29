import { Component } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent {
  cardInfo = {
    cardNumber: '',
    cardHolder: '',
    expirationMonth: '',
    expirationYear: '',
    cvv: ''
  };

  months = Array.from({ length: 12 }, (v, k) => ('0' + (k + 1)).slice(-2));
  years = Array.from({ length: 10 }, (v, k) => new Date().getFullYear() + k);

  onCardNumberInput(value: string) {
    // Ensure to remove spaces and limit length to 16 digits
    const sanitizedValue = value.replace(/\D/g, '').slice(0, 16);
    // Format as '#### #### #### ####'
    this.cardInfo.cardNumber = sanitizedValue.replace(/(.{4})/g, '$1 ').trim();
  }

  onCardHolderInput(value: string) {
    this.cardInfo.cardHolder = value.toUpperCase();
  }

  onCVVInput(value: string) {
    this.cardInfo.cvv = value.slice(0, 3);  // CVV max length is 3
  }

  // Function to mask all but the last four digits of the card number
  maskedCardNumber(): string {
    const visibleDigits = 4;
    const maskedSection = this.cardInfo.cardNumber.slice(0, -visibleDigits).replace(/\d/g, '*');
    const visibleSection = this.cardInfo.cardNumber.slice(-visibleDigits);
    return maskedSection + visibleSection;
  }
}