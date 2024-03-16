import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './models/books';


@Injectable({ providedIn: 'root' })
export class BookService {
    bookId: number = 0;


    constructor(private http: HttpClient) { }

    getBooks() {
        const url = `${window.location.origin}/books/list`
        return this.http.get(url, this.getHttpOptions());
    }
    getBookById(id: any): Observable<any> {
        const url = `${window.location.origin}/books/${id}`
        return this.http.get(url, this.getHttpOptions());
    }

    addBook(bookDetail: Book) {
        const url = `${window.location.origin}/books/add`
        return this.http.post(url, bookDetail, this.getHttpOptions());
    }

    updateBook(id: number, updatedDetail: Book) {
        const url = `${window.location.origin}/books/${id}/update`
        return this.http.post(url, updatedDetail, this.getHttpOptions());
    }

    deleteBook(id: number) {
        const url = `${window.location.origin}/books/${id}/delete`
        return this.http.post(url, {}, this.getHttpOptions());
    }

    private getHttpOptions(): any {
        const token = localStorage.getItem('token');
        return {
            headers: new HttpHeaders({
                'Authorization': token ? `bearer ${token}` : ''
            })
        };
    }
}