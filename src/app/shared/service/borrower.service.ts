import { Injectable } from '@angular/core';
import axios from 'axios';
import { BorrowerInformation } from '../model/BorrowerInformation';
import  { getToken, getUserIdFromToken } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
  addBorrower(newBorrowerInformation: BorrowerInformation) {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    };
    return axios.post<any>(
      'http://localhost:5219/api/BorrowerInformation',
      newBorrowerInformation,
      { headers }
    );
  }
  async getBorrowerInformation(): Promise<BorrowerInformation[]> {
    const token = await getToken();
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
  async deleteBorrower(id: number): Promise<void> {
    const token = await getToken();
    if (token) {
      const headers = {
        Authorization: 'Bearer ' + token,
      };

      return axios
        .delete<void>(`http://localhost:5219/api/BorrowerInformation/${id}`, {
          headers,
        })
        .then(() => {
          console.log('Borrower deleted successfully');
        })
        .catch((error) => {
          console.error('Error deleting Borrower:', error);
          throw error;
        });
    } else {
      return Promise.reject('Token not found');
    }
  }
}
