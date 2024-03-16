import { Component } from '@angular/core';
import { BookService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.scss']
})
export class UpdateBookComponent {
  book: any;
  updatedBook: any = {};

  constructor(
    private router: Router,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    const id = this.bookService.bookId;
    this.bookService.getBookById(id).subscribe(res => {
      this.book = res[0];
      this.updatedBook = { ...this.book };
    });
  }

  updateSelectedBook() {
    this.bookService.updateBook(this.book.id, this.updatedBook).subscribe(updatedBook => {
      this.book = updatedBook;
      this.updatedBook = { ...this.book };
    });
    alert("Book Updated Sucessfully !");
    this.router.navigate(['books'])
   
  }
}

