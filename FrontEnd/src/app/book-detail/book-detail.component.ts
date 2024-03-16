import { Component } from '@angular/core';
import { BookService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {
  book: any;
  updatedBook: any = {};
  constructor(private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    let id = this.bookService.bookId;
    this.bookService.getBookById(id).subscribe(res => {
      this.book = res[0];
      this.updatedBook = { ...this.book };
    });
  }
  goToUpdate(id: number) {
    this.bookService.bookId = id;
    this.router.navigate(['/update']);
  }
  deleteBook(id: number) {
    this.bookService.deleteBook(id).subscribe(() => {
      this.router.navigate(['/books']);
      alert("Book deleted successfully")
    });
  }
}
