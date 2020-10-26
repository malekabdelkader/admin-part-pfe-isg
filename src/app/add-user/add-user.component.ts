import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.
import {User} from '../shared/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  public userForm: FormGroup;  // Define FormGroup to user's form
show:string;
showw:string;
message:string;
emaill:string;
gradee:string;
User: User[];                 // Save users data in user's array.
hideWhenNoStudent: boolean = false; // Hide users data table when no user.
noData: boolean = false;            // Showing No user Message, when no user in database.
preLoader: boolean = true;

  constructor(
    public crudApi: UserService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }


  ngOnInit() {
    this.emaill=localStorage.getItem("email");
    this.studenForm(); 
    this.gradee=this.userForm.controls['grade'].value;
    this.dataState(); // Initialize user's list, when component is ready
    let s = this.crudApi.GetUsersList();
    console.log(s);

    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.User = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //console.log(a);
        a['$key'] = item.key;
       
        this.User.push(a as User);
      })
    })            // Call user form when component is ready
  }

  // Reactive user form
  studenForm() {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      prenom: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      matricule: ['', [Validators.required]],
      grade: ['', [Validators.required]],
      confirm:['',]
    })
  }

  // Accessing form control using getters
  get nom() {
    return this.userForm.get('nom');
  }

  get prenom() {
    return this.userForm.get('prenom');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get telephone() {
    return this.userForm.get('telephone');
  }
  get matricule() {
    return this.userForm.get('matricule');
  }
  get grade() {
    return this.userForm.get('grade');
  }
  dataState() {
    this.crudApi.GetUsersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }
 

  // Reset user form's values
  ResetForm() {
    this.userForm.reset();
  }
  confirmemail(){
    let email=this.userForm.controls['email'].value;

    let exist="exist";
    console.log("erreur avant boucle for");
    
    for (let us of this.User)
    {console.log("erreur boucle for");
      if(email==us.email){
        console.log("erreur boucle if");

     return(exist);
    
     }}
  }
  submitUserData() {
    this.message="";
    this.showw=""
    if(this.confirmemail()=="exist"){
      this.message="email existant !";
     }
else if(this.userForm.controls['password'].value!==this.userForm.controls['confirm'].value){
        this.showw="* La confirmation du mot de passe ne correspond pas"
      }

      else{
    this.crudApi.AjouterUser(this.userForm.value); // Submit user data using CRUD API
    this.toastr.success(this.userForm.controls['prenom'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['users']);}
  };

}