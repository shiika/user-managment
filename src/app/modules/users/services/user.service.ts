import { Injectable, signal, WritableSignal } from "@angular/core";
import { map, Observable } from "rxjs";
import { User, UserStatusEnum } from "src/app/modules/users/models/user.interface";
import { PaginationBody } from "src/app/shared/models/pagination.interface";
import { HttpRequestService } from "src/app/shared/services/http-request.service";
import { environment } from "src/environments/environment";

@Injectable(
    {
        providedIn: 'root'
    }
)

export class UserService {
    apiUrl = environment.apiUrl;
    _user: WritableSignal<User> = signal(null);
    constructor(private httpService: HttpRequestService) { }

    getUsers(body: PaginationBody): Observable<User[]> {
        return this.httpService.getRequest(`/users`, { params: body })
            .pipe(
                map(
                    result => {
                        // Mocking the status property with mock response
                        result = result.map((user: User, index) => {
                            if (index % 2 === 0) {
                                user.status = UserStatusEnum.ACTIVE;
                            } else {
                                user.status = UserStatusEnum.SOFT_DELETED;
                            }
                            return user;
                        });
                        return result
                    }
                )
            );
    }

    createUser(body: User): Observable<User> {
        return this.httpService.postRequest(`/users`, body);
    }

    getUser(id: string): Observable<User> {
        return this.httpService.getRequest(`/users/${id}`);
    }
}