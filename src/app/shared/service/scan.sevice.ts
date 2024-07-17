import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  Scan(formData: FormData): Promise<any> {
    return axios.post<any>(
      'http://localhost:5219/api/ScanInformation',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
  }
}
