import { Injectable } from '@angular/core';
import axios from 'axios';
import { BorrowerInformation } from '../model/BorrowerInformation';

@Injectable({
  providedIn: 'root'
})
export class BorrowerService {
  addBorrower(newBorrowerInformation: BorrowerInformation): Promise<any> {
    const headers = {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    };
    return axios.post<any>(
      'http://localhost:5219/api/BorrowerInformation',
      newBorrowerInformation,
      { headers }
    );
  }
}
