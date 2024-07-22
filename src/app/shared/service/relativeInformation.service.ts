import { Injectable } from '@angular/core';
import axios from 'axios';
import { RelativeInformation } from '../model/RelativeInformation';
import { getToken, getUserIdFromToken } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class RelativeInformationservice {
    addRelativeInformation(newRelativeInformation: RelativeInformation): Promise<any> {
        const headers = {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        };
        return axios.post<any>(
            'http://localhost:5219/api/RelativeInformation',
            newRelativeInformation,
            { headers }
        );
    }
}