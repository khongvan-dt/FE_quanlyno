import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoanInformation } from '../model/LoanInformation';
import { getToken, getUserIdFromToken } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class LoanInformationService {
  addLoanInformation(newLoanInformation: LoanInformation) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return axios.post<any>(
      'http://localhost:5219/api/LoanInformation',
      newLoanInformation,
      { headers }
    );
  }
  async getLoanInformation(): Promise<LoanInformation[]> {
    const token = await getToken();
    if (token) {
      const userId = getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };
      return axios
        .get<LoanInformation[]>(
          `http://localhost:5219/api/LoanInformation`,
          {
            headers,
          }
        )
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error fetching Loan Information Information list:', error);
          throw error;
        });
    } else {
      return Promise.reject('Token not found');
    }
  }
}
