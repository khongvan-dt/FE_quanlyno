import { Injectable } from '@angular/core';
import axios from 'axios';
import { AllLoan } from '../model/AllLoan';

@Injectable({
  providedIn: 'root'
})
export class AllLoanService {
  getAllLoan(): Promise<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return axios.get<any>(
      'http://localhost:5219/api/BorrowerInformation', 
      { headers }
    );
  }
}
