import { Component, OnInit } from '@angular/core';
import { HomepageService } from './homepage.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private homepage: HomepageService) { }

  public href: any;

  ngOnInit() {
    this.Homescreen();
  }

  Homescreen() {
    this.homepage.Home().subscribe(url => {
      this.href = url[0];
    }, error => {
      console.error('error:', error);
    });
  }

}
