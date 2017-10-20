import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdFormFieldModule, MdDialog } from '@angular/material';

import { Item } from '../models/item.model';
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
  @Output() vote = new EventEmitter<boolean>();
  @Input() state;
  public editMode;
  public itemForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MdDialog ) {
    this.itemForm = this.formBuilder.group({
      'summary': [null, Validators.required]
    });
  }

  ngOnInit() {
   this.editMode = !this.item._id;
   this.item.rate = 0;
  }

  save(newItemValue) {
    Object.assign(this.item, newItemValue);
    this.editMode = false;
    this.modified.emit(this.item);
  }

  cancel() {
    this.editMode = false;
    if (!this.item._id) {
      this.deleted.emit();
    }
  }

  openDialog () {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { title: this.item.summary, delete: this.deleted }
    });
  }

  openEditMode () {
    this.editMode = true;
    this.itemForm = this.formBuilder.group({
      'summary': [this.item.summary, Validators.required]
    });
  }

  addRate() {
    this.vote.emit(true);
  }

  removeRate() {
    if (this.item.rate > 0) {
      this.vote.emit(false);
    }
  }

}
