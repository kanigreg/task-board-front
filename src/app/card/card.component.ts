import { Component, Input, OnInit } from '@angular/core';

import { Project } from 'src/models/project';
import { HelperService } from 'src/services/helper.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() project: Project;

  constructor(public helperService: HelperService) { }

  ngOnInit(): void {
  }

}
