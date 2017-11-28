import { Component, OnInit, Inject } from '@angular/core';

import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  public sliderTime;

  constructor(
    private translateService: TranslateService,
    public dialogRef: MdDialogRef<ConfirmDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.sliderTime = 5;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onYesClick() {
    if (this.data.delete) {
      this.data.delete.emit();
    }
    this.dialogRef.close();
  }

  sendMessage() {
    let message;
    this.translateService.get('TEXT.SEND-MESSAGE').subscribe(
      value => message = value
    );
    message = `${message} ${this.sliderTime}`;
    this.translateService.get('TEXT.TIME').subscribe(
      value => message = `${message} ${value}.`
    );
    const retrospectiveMessage = {
      retrospective: this.data.retrospective,
      message,
    };
    this.data.service.sendMessageToPlayers(retrospectiveMessage)
      .subscribe(() => {});
  }

}
