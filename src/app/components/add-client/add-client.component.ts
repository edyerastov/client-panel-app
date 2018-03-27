import { Component, OnInit, ViewChild } from '@angular/core';

// Message
import { FlashMessagesService } from 'angular2-flash-messages';

// Models
import { Client } from '../../models/client';

// Services
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

// Router
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    balance: 0
  };

  disabledBalanceOnAdd: boolean;

  @ViewChild('clientForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disabledBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit() {

    if (!this.form.valid) {
      this.flashMessage.show('Please enter form', {
        timeout: 4000,
        cssClass: 'alert-danger'
      });
    } else {
      // edit new client
      this.clientService.newClient(this.client);
      // Show message success
      this.flashMessage.show('New client add success', {
        cssClass: 'alert-success',
        timeout: 4000
      });
      // Redirect
      this.router.navigate(['/']);
    }

  }



}
