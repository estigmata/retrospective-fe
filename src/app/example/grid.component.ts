import {Component} from '@angular/core';

@Component({
  selector: 'grid-list-dynamic',
  templateUrl: 'grid.component.html',
  styleUrls: [ 'grid.component.css' ]
})
export class GridComponent {
  tiles = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
}
