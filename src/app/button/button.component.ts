import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ButtonLabel } from './button.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit,OnChanges {
  @Input()
  defaultTemplate: TemplateRef<any>;
  @Input()
  processingTemplate: TemplateRef<any>;
  @Input()
  completeTemplate: TemplateRef<any>;
  changeTemplate: TemplateRef<any>;
  @Input("buttonObservable")
  button$:Observable<any>;

  @Output() data = new EventEmitter();
  disableBtn:boolean = false;

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.button$){
      this.disableBtn = true;
      this.changeTemplate = this.processingTemplate;
    this.button$.subscribe(res=>{
      this.data.emit(res);
      this.changeTemplate = this.completeTemplate;
      
    },()=>{
      this.changeTemplate = this.defaultTemplate;
      this.disableBtn = false;
    },()=>{
      setTimeout(()=>{
        this.changeTemplate = this.defaultTemplate;
        this.disableBtn = false;
      },500)
    })
  }
  }

  ngOnInit(): void {
    this.changeTemplate = this.defaultTemplate;
  }
}