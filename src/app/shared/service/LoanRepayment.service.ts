import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoanRepayment } from '../model/LoanRepayment';

@Injectable({
  providedIn: 'root',
})
export class LoanRepaymentService {
  addLoanRepayment(newLoanRepayment: LoanRepayment): Promise<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
    return axios.post<any>(
      'http://localhost:5219/api/LoanRepayment',
      newLoanRepayment,
      { headers }
    );
  }
}
