import { Component, OnInit } from '@angular/core';
import { ParkService } from '../shared/park.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

@Component({
  selector: 'app-add-parking',
  templateUrl: './add-parking.component.html',
  styleUrls: ['./add-parking.component.css']
})
export class AddParkingComponent implements OnInit {

  public parkForm: FormGroup;  // Define FormGroup to park's form

  constructor(
    public crudApi: ParkService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }
  ngOnInit() {
    this.crudApi.GetParksList();  // Call ModifierClientsList() before main form is being called
    this.studenForm();   
  }
  studenForm() {
    this.parkForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      capacite: ['',[Validators.required, Validators.minLength(1),Validators.maxLength(3)]],
      adresse: ['', [Validators.required, Validators.minLength(3)]]
    })
  }
  get capacite() {
    return this.parkForm.get('capacite');
  }

  get titre() {
    return this.parkForm.get('titre');
  }

  get adresse() {
    return this.parkForm.get('adresse');
  }
  ResetForm() {
    this.parkForm.reset();
  }

  submitParkData() {
    this.crudApi.AjouterPark(this.parkForm.value); // Submit park data using CRUD API
    this.toastr.success(this.parkForm.controls['titre'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['parks']);
  };
}