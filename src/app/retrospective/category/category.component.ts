import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { RateObject } from './../models/rate-object.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
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
    const newItem = new Item ({
      category: this.category._id,
      retrospective: this.retrospectiveId,
      children: [],
      parent: true
    });
    this.items.unshift(newItem);
  }

  onItemModified(newItem: Item) {
    if (!newItem._id) {
      console.log('[FE] Category: New Item: ', newItem);
      this.itemService.save(newItem).subscribe(
        (item: Item) => {
          Object.assign(newItem, item);
        },
        (err) => {
          console.log(err);
          this.items.shift();
        }
      );
    } else {
      this.itemService.update(newItem._id, newItem).subscribe(
        (item: Item) => {
          Object.assign(newItem, item);
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
    const rateObject = new RateObject({
      isIncrement: isIncrement,
      item: this.items[index],
      userId: 1
    });
    this.vote.emit(rateObject);
  }

  onGroup(foreingItem: any, localItem: Item) {
    if (foreingItem.dragData._id !== localItem._id) {
      if (!localItem.children.length) {
        const newItem = new Item({
          summary: `${this.category.name} group`,
          retrospective: localItem.retrospective,
          category: localItem.category,
          children: [foreingItem.dragData, localItem],
          parent: true
        });
        foreingItem.dragData.parent = false;
        localItem.parent = false;
        this.onItemModified(localItem);
        this.onItemModified(foreingItem.dragData);
        this.onItemModified(newItem);
        this.items.splice(this.items.findIndex(someItem => {
          return someItem._id === localItem._id;
        }) + 1, 0, newItem);
      } else {
        foreingItem.dragData.parent = false;
        localItem.children.push(foreingItem.dragData);
        this.onItemModified(foreingItem.dragData);
        this.onItemModified(localItem);
      }
    }
  }

}
