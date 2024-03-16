import { Component } from '@angular/core';
import { BookService } from '../books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent {
  book: any = {
    price: '',
    title: '',
    author: '',
    description: ''
  };

  constructor(private bookService: BookService, private router: Router) { }

  addBook(): void {
    this.bookService.addBook(this.book).subscribe({
      next: () => {
        this.router.navigate(['/books']);
      },
      error: () => {
        // Handle error
        console.log('Failed to add book');
      }
    });
  }
}
