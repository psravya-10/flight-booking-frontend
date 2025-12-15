import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-search',
//   standalone: true,
//   template: `
//     <h3>Search Flights</h3>
//     <p>Search form will come here</p>
//   `
// })
// export class SearchComponent {}
