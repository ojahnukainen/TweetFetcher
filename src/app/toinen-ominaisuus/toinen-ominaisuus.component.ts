import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-toinen-ominaisuus',
  templateUrl: './toinen-ominaisuus.component.html',
  styleUrls: ['./toinen-ominaisuus.component.scss']
})
export class ToinenOminaisuusComponent implements OnInit {

  @Input() latausInfo: boolean;

  constructor() { }

  ngOnInit() {
  }

}
