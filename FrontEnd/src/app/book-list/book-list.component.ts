import { Component } from '@angular/core';
import { BookService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {
  books: any;

  constructor(
    private bookService: BookService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe(res => {
      this.books = res;
    });
  }


  goToDetail(id: number) {
    this.bookService.bookId = id;
    this.router.navigate([`/books/${id}`])
  }
  goToAddBook() {
    this.router.navigate([`addNewBook`])
  }
}
