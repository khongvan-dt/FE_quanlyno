import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { LoanContract } from '../model/LoanContract';
import { getToken, getUserIdFromToken } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoanContractService {
  addLoanContract(newLoanContract: LoanContract) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };

    return axios.post<any>(
      'http://localhost:5219/api/LoanContract',
      newLoanContract,
      { headers }
    )
    .then(response => {
      console.log('Loan Contract added successfully', response.data);
      return response.data;
    })
    .catch((error: AxiosError) => {
      console.error('Error adding Loan Contract:', error.message);
      if (error.response) {
        console.error('Error details:', error.response.data);
      }
      throw error;
    });
  }

  async getLoanContract(): Promise<LoanContract[]> {
    const token = await getToken();
    if (token) {
      const userId = getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };

      return axios
        .get<LoanContract[]>(`http://localhost:5219/api/LoanContract`, {
          headers,
        })
        .then((response) => response.data)
        .catch((error: AxiosError) => {
          console.error('Error fetching LoanContract list:', error.message);
          if (error.response) {
            console.error('Error details:', error.response.data);
          }
          throw error;
        });
    } else {
      return Promise.reject('Token not found');
    }
  }
}
