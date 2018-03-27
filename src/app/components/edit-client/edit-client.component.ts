import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

// Models
import { Client } from '../../models/client';

// Services
import { ClientService } from '../../services/client.service';
import { SettingsService } from '../../services/settings.service';

// Router
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client = {
    id: '',
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    balance: 0
  };
  id: string;
  disabledBalanceOnAdd: boolean;

  @ViewChild('editForm') form: any;

  constructor(
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    public route: ActivatedRoute,
    private router: Router,
    private settingsSevice: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
    this.disabledBalanceOnAdd = this.settingsSevice.getSettings().disableBalanceOnAdd;
  }

  onSubmit() {

    if (!this.form.valid) {
      this.flashMessage.show('Please enter form', {
        timeout: 4000,
        cssClass: 'alert-danger'
      });
    } else {
      // edit client
      this.clientService.updateClient(this.client);
    }
    // Show message success
    this.flashMessage.show('Edit success', {
      cssClass: 'alert-success',
      timeout: 4000
    });
    // Redirect
    this.router.navigate([`/client/${this.client.id}`]);

  }

}
