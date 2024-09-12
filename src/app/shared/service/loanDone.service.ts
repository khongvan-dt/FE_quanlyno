import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoanDone } from '../model/LoanDone';
import { getToken, getUserIdFromToken } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoanDoneService {
  async getLoanDone(): Promise<LoanDone[]> {
    const token = await getToken();
    if (token) {
      const userId = getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      return axios
        .get<LoanDone[]>(`http://localhost:5219/api/LoanDone`, {
          headers,
        })
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error fetching loan done list:', error);
          throw error;
        });
    } else {
      return Promise.reject('Token not found');
    }
  }
  addLoanDone(newLoanDone: LoanDone) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return axios.post<any>(
      'http://localhost:5219/api/LoanDone',
      newLoanDone,
      { headers }
    );
  }
}
