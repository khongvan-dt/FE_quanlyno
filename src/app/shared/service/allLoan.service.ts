import { Injectable } from '@angular/core';
import axios from 'axios';
import { AllLoan } from '../model/AllLoan';
import  { getToken, getUserIdFromToken } from './token.service';

@Injectable({
  providedIn: 'root'
})
//: Promise<any>
export class AllLoanService {
  async getAllLoan() {

    const token = await getToken();
    if (token) {
      const userId = getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      return axios
        .get<AllLoan[]>(`http://localhost:5219/api/BorrowerInformation`, {
          headers,
        })
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error fetching AllLoan list:', error);
          throw error;
        });
    } else {
      return Promise.reject('Token not found');
    }
  }


}
