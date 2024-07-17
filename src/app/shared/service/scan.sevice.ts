import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
    providedIn: 'root'
})
export class ScanService {
    Scan(imagePaths: string[]): Promise<any> {
        return axios.post<any>(
            'http://localhost:5219/api/ScanInformation',
            { imagePaths: imagePaths }
        );
    }
}
