import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../shared/abonnement.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import { User } from '../shared/user'; // user interface class for Data types.
import { UserService } from '../shared/user.service'; // CRUD API service class
import { Abonnement } from '../shared/abonnement'; // Parking interface class for Data types.
@Component({
  selector: 'app-add-abonnement',
  templateUrl: './add-abonnement.component.html',
  styleUrls: ['./add-abonnement.component.css']
})
export class AddAbonnementComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  User: User[];                 // Save users data in user's array.
  hideWhenNoStudent: boolean = false; // Hide users data table when no user.
  noData: boolean = false;   
  public abonnementForm: FormGroup;  // Define FormGroup to park's form
codee:number;
today:Date;
time:string;
expire:string;
capacite:string;
Abonnement: Abonnement[];                 // Save Parks data in Park's array.

  constructor(
    public userApi: UserService, // Inject user CRUD services in constructor.

    public crudApi: AbonnementService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) {  

   }
  ngOnInit() {
    this.capacite=localStorage.getItem("reserve");
    this.crudApi.GetAbonnementsList();  // Call ModifierClientsList() before main form is being called
    let s = this.userApi.GetUsersList();
    console.log(s);
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Abonnement = [];
      data.forEach(item => {
        let b = item.payload.toJSON();
        //console.log(a);
        b['$key'] = item.key;
       
        this.Abonnement.push(b as Abonnement);
      })
    })
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.User = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //console.log(a);
        a['$key'] = item.key;
       
        this.User.push(a as User);
      })
    })

this.today = new Date();
this.time = this.today.getFullYear() + "/"+this.today.getMonth() + "/"+this.today.getDay() + "  "+ +this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
let nextmonth=this.today.getMonth()+1;
this.expire = this.today.getFullYear() + "/"+ nextmonth+ "/"+this.today.getDay() + "  "+ +this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds();
console.log(this.time);
console.log(this.expire);

this.studenForm();   

  }
  studenForm() {
    this.abonnementForm = this.fb.group({
     // mode: ['', [Validators.required, Validators.minLength(4)]],
      mode: this.time,//
      expiration:this.expire,
      code:    1000000 + Math.round(Math.random()*(100000-999999)) ,
      etat:"off",
      email:""
    })
  }
  get mode() {
    return this.abonnementForm.get('mode');
  }
  get email() {
    return this.abonnementForm.get('email');
  }
  get etat() {
    return this.abonnementForm.get('etat');
  }

  get expiration() {
    return this.abonnementForm.get('expiration');
  }

  ResetForm() {
    this.abonnementForm.reset();
  }
  submitAbonnementData() {
    if(this.capacite=="8"){
alert("Parking plein !")
    }else{
    
    this.crudApi.AjouterAbonnement(this.abonnementForm.value); // Submit park data using CRUD API
    this.toastr.success(this.abonnementForm.controls['code'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['abonnements']);  }  

  };




}







