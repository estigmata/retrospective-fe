import { Component, AfterViewInit, OnInit, Input, Output, ViewChild, EventEmitter, Inject, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdFormFieldModule, MdDialog } from '@angular/material';

import { Item } from '../models/item.model';
import { User } from './../../shared/models/user.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  @Output() modified = new EventEmitter<Item>();
  @Output() deleted = new EventEmitter<void>();
  @Output() ungroup = new EventEmitter<void>();
  @Output() vote = new EventEmitter<boolean>();
  @Input() state;
  @Input() currentUser;
  public itemSummary;

  public editMode;
  public itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MdDialog) {
    this.itemForm = this.formBuilder.group({
      'summary': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.editMode = !this.item.summary && this.item.user._id === this.currentUser._id;
  }

  save(newItemValue) {
    Object.assign(this.item, newItemValue);
    this.editMode = false;
    this.modified.emit(this.item);
  }

  cancel() {
    if (!this.itemSummary) {
      this.deleted.emit();
    } else {
      this.item.summary = this.itemSummary;
      this.modified.emit(this.item);
      this.editMode = false;
    }
  }

  openDialog () {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: this.item.summary, delete: this.deleted, type: 'delete' }
    });
  }

  openEditMode () {
    this.itemSummary = this.item.summary;
    this.editMode = true;
    this.itemForm = this.formBuilder.group({
      'summary': [this.itemSummary, Validators.required]
    });
    this.item.summary = '';
    this.modified.emit(this.item);
  }

  addRate() {
    this.vote.emit(true);
  }

  removeRate() {
    if (this.item.userRate > 0) {
      this.vote.emit(false);
    }
  }

  openUngroupDialog () {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: this.item.summary, delete: this.ungroup, type: 'ungroup' }
    });
  }
}
