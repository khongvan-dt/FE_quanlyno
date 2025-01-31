import { Injectable } from '@angular/core';
import axios from 'axios';
import { BorrowerInformation } from '../model/BorrowerInformation';
import  { getToken, getUserIdFromToken } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
  addBorrower(newBorrowerInformation: BorrowerInformation): Promise<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
    return axios.post<any>(
      'http://localhost:5219/api/BorrowerInformation',
      newBorrowerInformation,
      { headers }
    );
  }
  getBorrowerInformation(): Promise<BorrowerInformation[]> {
    const token = getToken();
    if (token) {
      const userId = getUserIdFromToken(token);
      const headers = {
        Authorization: 'Bearer ' + token,
      };

      return axios
        .get<BorrowerInformation[]>(`http://localhost:5219/api/BorrowerInformation`, {
          headers,
        })
        .then((response) => response.data)
        .catch((error) => {
          console.error('Error fetching Borrower Information list:', error);
          throw error;
        });
    } else {
      return Promise.reject('Token not found');
    }
  }
}
