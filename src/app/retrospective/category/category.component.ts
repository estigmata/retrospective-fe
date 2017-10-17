import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { RateObject } from './../models/rate-object.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  @Input() category;
  @Input() retrospectiveId;
  @Input () state;
  @Output() vote = new EventEmitter<Object>();
  public items: Item[] = [];
  constructor (private itemService: ItemService) {}

  ngOnInit() {
    if (this.category) {
      this.items = this.category.items;
    }
  }
  addItem() {
    const newItem = new Item ({ category: this.category._id, retrospective: this.retrospectiveId });
    this.items.unshift(newItem);
  }

  onItemModified(newitem: Item) {
    if (!newitem._id) {
      this.itemService.save(newitem).subscribe(
        (item: Item) => {
          Object.assign(newitem, item);
        },
        (err) => {
          console.log(err);
          this.items.shift();
        }
      );
    } else {
      this.itemService.update(newitem._id, newitem).subscribe(
        (item: Item) => {
          Object.assign(newitem, item);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  onItemDeleted(index) {
    if (!this.items[index]._id) {
      this.items.splice(index, 1);
    } else {
      this.itemService.delete(this.items[index]._id).subscribe(
        () => {
          this.items.splice(index, 1);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  voteItem(isIncrement, index) {
    const rateObject = new RateObject({ isIncrement: isIncrement, item: this.items[index] });
    this.vote.emit(rateObject);
  }
}
