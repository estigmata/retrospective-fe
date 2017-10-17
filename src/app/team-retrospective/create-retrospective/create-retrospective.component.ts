import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdFormFieldModule } from '@angular/material';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/switchMap';

import { Strategy } from '../models/strategy.model';
import { StrategyService } from '../services/strategy.service';
import { RetrospectiveService } from '../services/retrospective.service';
import { Retrospective } from '../../retrospective/models/retrospective.model';

@Component({
  selector: 'app-create-retrospective',
  templateUrl: './create-retrospective.component.html',
  styleUrls: ['./create-retrospective.component.css']
})
export class CreateRetrospectiveComponent implements OnInit {
  teamName= 'DEVINT22';
  projectName= 'Retrospective';
  currentStrategyId= '59e4c742fd28530011264914';
  newRetrospectiveNumber: number;
  strategyTemplates: Strategy[];
  newRetrospective: Retrospective;

  createRetrospectiveForm: FormGroup;
  constructor (
    private formBuilder: FormBuilder,
    private strategyService: StrategyService,
    private retrospectiveService: RetrospectiveService,
    private route: Router
  ) {
    this.createRetrospectiveForm = this.formBuilder.group({
      name: [`${this.teamName}-${this.projectName}-${this.newRetrospectiveNumber}`, Validators.required],
      strategies: [ this.currentStrategyId ]
    });
  }

  save(newRetrospective) {
    this.newRetrospective = new Retrospective({ name: newRetrospective.name, categories: [{}] });
    const strategy = this.strategyTemplates.find(selectedStrategy => selectedStrategy._id === newRetrospective.strategies);
    this.newRetrospective.categories.pop();
    strategy.categories.forEach( category => this.newRetrospective.categories.push({name: category.name}));
    let recoveredRetrospective: Retrospective;
    this.retrospectiveService.saveRetrospective(this.newRetrospective)
      .subscribe((retrospective: Retrospective) => {
        recoveredRetrospective = retrospective;
        this.route.navigate([ `../retrospective/${recoveredRetrospective._id}/add-items` ]);
      });
  }

  ngOnInit() {
    this.strategyService.getStrategies()
      .switchMap((strategies: Strategy[]) => {
          this.strategyTemplates = strategies;
          return this.retrospectiveService.getRetrospectiveList();
      })
      .subscribe(
        retrospectives => {
          this.newRetrospectiveNumber = retrospectives ? retrospectives.length + 1 : 1;
          this.createRetrospectiveForm = this.formBuilder.group({
            name: [`${this.teamName}-${this.projectName}-${this.newRetrospectiveNumber}`, Validators.required],
            strategies: [ this.currentStrategyId ]
          });
        },
        error => console.error(error)
      );
  }
}
