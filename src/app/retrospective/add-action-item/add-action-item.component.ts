import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ActionItemService } from '../services/action-item.service';

import { Retrospective } from '../../shared/models/retrospective.model';
import { Item } from './../models/item.model';
import { ItemInfo } from './../models/item-info.model';
import { ActionItem } from '../models/action-item.model';
import { State } from '../models/state.model';

@Component({
  selector: 'app-add-action-item',
  templateUrl: './add-action-item.component.html',
  styleUrls: ['./add-action-item.component.css']
})

export class AddActionItemComponent implements OnInit {

  public itemsInfo: ItemInfo[];

  public actionItems: ActionItem[];
  public retrospective: Retrospective;
  public itemSelected: ItemInfo;
  public actionItemSelected: ActionItem;
  public itemIndex = 0;
  public state = new State({addAction: true});
  public categoryHashName = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private actionItemService: ActionItemService
  ) { }

  ngOnInit() {
    this.activatedRoute.parent.data
      .subscribe(
        (data) => {
          this.retrospective = data.retrospective;
          this.itemsInfo = [...data.retrospectiveItems];
          this.categoryHashName = this.getCategoriesMapById(this.retrospective.categories);
          this.sortItemsByVote(this.itemsInfo);
          this.itemsInfo = this.itemsInfo.filter(item => item.votes > 0);
          if (this.itemsInfo.length > 0) {
            this.itemSelected = this.itemsInfo[this.itemIndex];
            this.actionItems = new Array(this.itemsInfo.length);
            this.itemsInfo.map((itemInfo, index) => {
              this.actionItems[index] = new ActionItem({
                retrospectiveId: this.itemsInfo[index].retrospective,
                itemId: this.itemsInfo[index]._id
              });
            });
            this.actionItemSelected = this.actionItems[this.itemIndex];
          }
        },
        (error: Error) => console.error('error')
      );
  }

  private sortItemsByVote (items: ItemInfo[]) {
    items.sort((itemA, itemB) => this.getAllVotedItems(itemB) - this.getAllVotedItems(itemA));
  }

  private getAllVotedItems (item: ItemInfo) {
    item.votes = item.rates.reduce((current, next) => next.quantity ? current + next.quantity : current, 0);
    item.categoryName = this.categoryHashName[`${item.category}`];
    return item.votes;
  }

  getCategoriesMapById(categories) {
    return categories.reduce((hash, next) => {
      hash[next._id] = next.name;
      return hash;
    }, {});
  }

  getPreviewItem() {
    if (this.itemIndex - 1 > -1) {
      this.itemIndex -= 1;
      this.itemSelected = this.itemsInfo[this.itemIndex];
      this.actionItemSelected = this.actionItems[this.itemIndex];
    }
  }

  getNextItem() {
    if (this.itemIndex + 1 < this.itemsInfo.length) {
      this.itemIndex += 1;
      this.itemSelected = this.itemsInfo[this.itemIndex];
      this.actionItemSelected = this.actionItems[this.itemIndex];
    }
  }

  onActionItemModified(newActionItem: ActionItem) {
    if (!newActionItem._id) {
      this.actionItemService.save(newActionItem).subscribe(
        (actionItem: ActionItem) => Object.assign(newActionItem, actionItem),
        (err) => console.log(err)
      );
    }
  }
}
