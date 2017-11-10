import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Item } from '../models/item.model';
import { ItemService } from '../services/item.service';
import { RateObject } from './../models/rate-object.model';
import { User } from './../../shared/models/user.model';

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
  public currentUser: User;

  constructor (
    private itemService: ItemService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.parent.data
      .subscribe(data => this.currentUser = data.userData);

    if (this.category) {
      this.items = this.category.items;
    }
  }
  addItem() {
    const newItem = new Item ({
      category: { _id: this.category._id, name: this.category.name},
      retrospective: this.retrospectiveId,
      children: [],
      parent: true,
      user: this.currentUser._id
    });

    this.itemService.save(newItem).subscribe(
      (itemSaved: Item) => {},
      (err) => this.items.shift()
    );
  }

  onItemModified(newItem: Item) {
    if (!newItem._id) {
      const itemFound = this.items.find(item => !item._id);
      const itemIndex = this.items.indexOf(itemFound);
      this.items.splice(itemIndex, 1);
      this.itemService.save(newItem).subscribe(
        (itemSaved: Item) => {},
        (err) => this.items.shift()
      );
    } else {
      this.itemService.update(newItem._id, newItem).subscribe(
        (item: Item) => {},
        (err) => console.error(err)
      );
    }
  }

  onItemDeleted(index) {
    if (!this.items[index]._id) {
      this.items.splice(index, 1);
    } else {
      this.itemService.delete(this.items[index]._id).subscribe(
        () => {},
        (err) => console.error(err)
      );
    }
  }

  voteItem(isIncrement, index) {
    const rateObject = new RateObject({ isIncrement: isIncrement, item: this.items[index] });
    this.vote.emit(rateObject);
  }

  onGroup(foreingItem: any, localItem: Item) {
    if (foreingItem.dragData._id !== localItem._id) {
      if (!localItem.children.length) {
        const newItem = new Item({
          retrospective: localItem.retrospective,
          category: localItem.category,
          children: [ localItem, foreingItem.dragData],
          parent: true,
          user: this.currentUser._id
        });
        this.translateService.get('ITEM.GROUP-ITEM').subscribe(
          value => newItem.summary = value
        );
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
