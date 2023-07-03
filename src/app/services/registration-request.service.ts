import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RegistrationRequest } from "../models/RegistrationRequest";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class RegistrationRequestService {
    
    constructor(private http: HttpClient) { }

    createUsuario(registrationRequest: RegistrationRequest): Observable<RegistrationRequest>{
        const url = `${environment.apiURLBase}/register`;
        return this.http.post<RegistrationRequest>(url, registrationRequest)
    }
}