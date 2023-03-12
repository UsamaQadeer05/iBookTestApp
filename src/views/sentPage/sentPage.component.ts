import { Component } from '@angular/core';
import { BookService } from 'src/services/book.service';

@Component({
    selector: 'sentPage',
    templateUrl: './sentPage.component.html',
    styleUrls: ['./sentPage.component.scss']
})

export class SentPageViewComponent {
    friendData: any;

    constructor(private bookService: BookService) { }

    ngOnInit() {
        // Getting Stored Information from Rxjs
        this.bookService.currentFriendData.pipe().subscribe(friendData => {
            this.friendData = friendData;
        });
    }
} 