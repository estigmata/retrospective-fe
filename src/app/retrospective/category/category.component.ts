import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Input() state;
  @Input() currentUser;
  @Output() vote = new EventEmitter<Object>();

  public items: Item[] = [];

  constructor (
    private itemService: ItemService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
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
    newItem.user = this.currentUser._id;
    if (!newItem._id) {
      this.itemService.save(newItem).subscribe(
        (itemSaved: Item) => {},
        (err) => console.error(err)
      );
    } else {
      this.itemService.update(newItem._id, newItem).subscribe(
        (item: Item) => {},
        (err) => console.error(err)
      );
    }
  }

  onItemDeleted(index) {
    this.itemService.delete(this.items[index]._id).subscribe(
      () => {},
      (err) => console.error(err)
    );
  }

  onUngroup(index) {
    this.items[index].children.map(child => {
      child.parent = true;
      this.onItemModified(child);
    });
    this.itemService.delete(this.items[index]._id).subscribe(
      () => {},
      (err) => console.error(err)
    );
    this.items[index].parent = false;
  }

  voteItem(isIncrement, index) {
    const rateObject = new RateObject({ isIncrement: isIncrement, item: this.items[index] });
    this.vote.emit(rateObject);
  }

  onGroup(foreingItem: any, localItem: Item) {
    if (foreingItem.dragData.belong.parent) {
      if (foreingItem.dragData.belong.children.length > 2 ) {
        foreingItem.dragData.belong.children.splice(foreingItem.dragData.index, 1);
        this.onItemModified(foreingItem.dragData.belong);
      } else {
        foreingItem.dragData.belong.children[0].parent = true;
        foreingItem.dragData.belong.children[1].parent = true;
        this.onItemModified(foreingItem.dragData.belong.children[0]);
        this.onItemModified(foreingItem.dragData.belong.children[1]);
        this.itemService.delete(foreingItem.dragData.belong._id)
          .subscribe(() => {}, (err) => console.log(err));
      }
    }
    if (foreingItem.dragData.item._id !== localItem._id) {
      if (!localItem.children.length) {
        const newItem = new Item({
          retrospective: localItem.retrospective,
          category: localItem.category,
          children: [ localItem, foreingItem.dragData.item],
          parent: true,
          user: this.currentUser._id
        });
        this.translateService.get('ITEM.GROUP-ITEM').subscribe(
          value => newItem.summary = value
        );
        foreingItem.dragData.item.parent = false;
        localItem.parent = false;
        this.onItemModified(newItem);
        this.onItemModified(localItem);
        this.onItemModified(foreingItem.dragData.item);
      } else {
        foreingItem.dragData.item.parent = false;
        localItem.children.push(foreingItem.dragData.item);
        this.onItemModified(foreingItem.dragData.item);
        this.onItemModified(localItem);
      }
    }
  }

  onUnGroup(foreingItem: any) {
    if (foreingItem.dragData.belong.children.length > 2) {
      foreingItem.dragData.belong.children.splice(foreingItem.dragData.index, 1);
      this.onItemModified(foreingItem.dragData.belong);
      foreingItem.dragData.item.parent = true;
      this.onItemModified(foreingItem.dragData.item);
    } else {
      foreingItem.dragData.belong.children[0].parent = true;
      foreingItem.dragData.belong.children[1].parent = true;
      this.onItemModified(foreingItem.dragData.belong.children[0]);
      this.onItemModified(foreingItem.dragData.belong.children[1]);
      this.itemService.delete(foreingItem.dragData.belong._id)
        .subscribe(() => {}, (err) => console.log(err));
      foreingItem.dragData.belong.parent = false;
    }
  }

}
