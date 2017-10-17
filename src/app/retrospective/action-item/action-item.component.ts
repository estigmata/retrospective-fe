import { Component, OnInit, OnChanges, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdFormFieldModule } from '@angular/material';

import { ActionItem } from './../models/action-item.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.css']
})
export class ActionItemComponent implements OnInit {
  @Output() modified = new EventEmitter<ActionItem>();
  @Output() deleted = new EventEmitter<void>();
  @Input() actionItem;
  public editMode;
  public actionItemForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.editMode = true;
    this.actionItemForm = this.formBuilder.group({
      'summary': [null, Validators.required]
    });
  }

  ngOnInit() {
    this.editMode = !this.actionItem._id;
  }

  ngOnChanges () {
    this.editMode = !this.actionItem._id;
    this.actionItemForm = this.formBuilder.group({
      'summary': [null, Validators.required]
    });
  }

  save(newItemValue) {
    Object.assign(this.actionItem, newItemValue);
    this.editMode = false;
    this.modified.emit(this.actionItem);
  }

  cancel() {
    this.editMode = false;
    if (!this.actionItem._id) {
      this.deleted.emit();
    }
  }

  openEditMode () {
    this.editMode = true;
    this.actionItemForm = this.formBuilder.group({
      'summary': [this.actionItem.summary, Validators.required]
    });
  }

}
