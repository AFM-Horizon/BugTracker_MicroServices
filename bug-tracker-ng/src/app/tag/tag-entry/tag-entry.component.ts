import { Component, ElementRef, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { BaseClickDetectorComponent } from './../../shared/CommonComponents/ClickOusideEventBase.component';

@Component({
  selector: 'app-tag-entry',
  templateUrl: './tag-entry.component.html',
  styleUrls: ['./tag-entry.component.scss']
})
export class TagEntryComponent extends BaseClickDetectorComponent {
  @Input() bugId: string;
  faPlus = faPlus;

  constructor(_eref: ElementRef) {
    super(_eref);
  }
}
