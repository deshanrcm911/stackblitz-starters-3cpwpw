import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid'; // Install `uuid` library: npm install uuid
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-material-18-start';

  constructor(private http: HttpClient) {}

  callApi() {
    const url = 'https://localhost:5001/';

    // Create the request body
    const requestData = {
      sessionId: uuidv4(), // Generates a new GUID
      Action: 'Sign',
      StatusMessage: 'Document signed successfully.',
      EviaSignAPIUrl: 'https://localhost:7214',
      EviaSignDPAPIUrl: 'https://localhost:7214',
      UserPin: 'LppL@576',
      AnnotationTextList: [
        {
          StampId: uuidv4(), // Generates a new GUID for StampId
          StampText: 'Approved',
        },
        {
          StampId: uuidv4(), // Generates another new GUID for StampId
          StampText: 'Verified',
        },
      ],
      AuditDetails: {
        AuthorType: 'Internal',
        AuthorIPAddress: '192.168.1.1',
        Device: 'Laptop',
      },
    };

    // Make the POST request
    this.http.post(url, requestData).subscribe(
      (response: any) => {
        // Handle successful response
        console.log('API Response:', response);
        alert('API Response: ' + JSON.stringify(response));
      },
      (error) => {
        // Handle errors
        console.error('Error calling API:', error);
        alert('Error calling API: ' + error.message);
      }
    );
  }
}
