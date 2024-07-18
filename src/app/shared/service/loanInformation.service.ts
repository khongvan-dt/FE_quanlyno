import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoanInformation } from '../model/LoanInformation';
import { getToken, getUserIdFromToken } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class LoanInformationService {
    addLoanInformation(newLoanInformation: LoanInformation): Promise<any> {
        const headers = {
            Authorization: 'Bearer' + localStorage.getItem('token')
        };
        return axios.post<any>(
            'http://localhost:5219/api/LoanInformation',
            newLoanInformation,
            { headers }
        );
    }
}