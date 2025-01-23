import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../shared/service/base-service.service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../shared/interfaces/common-response.interface';
import { CategoryInterface } from '../../../shared/interfaces/category/category.interface';

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {
    endpoint: string = `${this.baseUrl}/category`;


    constructor(private httpClient: HttpClient) {
        super();  // Call the constructor of the parent class (BaseService)
    }

    getAll(): Observable<ApiResponse<CategoryInterface[]>> {
        return this.httpClient.get<ApiResponse<CategoryInterface[]>>(this.endpoint); // Make an HTTP GET request to the specified endpoint
    }

}