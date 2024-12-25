import { Component, OnInit } from '@angular/core';
import { BrowserDetailsService } from '../browser-details.service';

@Component({
  selector: 'app-browser-details',
  templateUrl: './browser-details.component.html',
  styleUrls: ['./browser-details.component.css'],
})
export class BrowserDetailsComponent implements OnInit {
  details: any = null;
  validationMessage: string = '';
  isValid: boolean = true;

  constructor(private browserDetailsService: BrowserDetailsService) {}

  ngOnInit(): void {
    this.fetchDetails();
  }

  async fetchDetails() {
    this.details = await this.browserDetailsService.getBrowserDetails();
    this.validationMessage = this.browserDetailsService.validateDetails(this.details);
    this.isValid = this.validationMessage === 'Your browser and OS are supported.';
  }
}
