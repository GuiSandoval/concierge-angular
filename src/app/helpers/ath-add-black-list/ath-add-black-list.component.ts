import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ath-add-black-list',
  templateUrl: './ath-add-black-list.component.html',
  styleUrls: ['./ath-add-black-list.component.scss']
})
export class AthAddBlackListComponent {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
}
