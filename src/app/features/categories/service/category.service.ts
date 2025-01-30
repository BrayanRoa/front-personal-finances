import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/service/base-service.service';
import { Observable } from 'rxjs';
import { ApiResponse, CommonResponse } from '../../../shared/interfaces/common-response.interface';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';
import { ICategory, IColor, IIcon } from '../interface/category.interface';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
    endpoint: string = `${this.baseUrl}/category`;


    constructor(private httpClient: HttpClient) {
        super();  // Call the constructor of the parent class (BaseService)
    }

    getAll(): Observable<ApiResponse<ICategory[]>> {
        return this.httpClient.get<ApiResponse<ICategory[]>>(this.endpoint); // Make an HTTP GET request to the specified endpoint
    }

    getAllIcons(): Observable<ApiResponse<IIcon[]>> {
        return this.httpClient.get<ApiResponse<any[]>>(`${this.endpoint}/icons`); // Make an HTTP GET
    }

    getAllColors(): Observable<ApiResponse<IColor[]>> {
        return this.httpClient.get<ApiResponse<any[]>>(`${this.endpoint}/colors`); // Make an HTTP GET
    }

    create(data: CategoryInterface): Observable<CommonResponse> {
        return this.httpClient.post<CommonResponse>(`${this.endpoint}`, data)
    }
}