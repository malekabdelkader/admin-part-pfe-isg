import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { User } from '../shared/user'; // user interface class for Data types.
import { UserService } from '../shared/user.service'; // CRUD API service class
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services

import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  invalide:string="";
  p: number = 1;                      // Settup up pagination variable
  User: User[];                 // Save users data in user's array.
  hideWhenNoStudent: boolean = false; // Hide users data table when no user.
  noData: boolean = false;            // Showing No user Message, when no user in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)

  public userForm: FormGroup;  // Define FormGroup to user's form

  constructor(
    public crudApi: UserService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }


  ngOnInit() {
    this.studenForm(); 
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
    })
  }
 studenForm() {
    this.userForm = this.fb.group({
    
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(4)]],
     
    })
  }

  

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

 
  // Using valueChanges() method to fetch simple list of users data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in user data list in real-time.
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

  // Method to delete user object
  Searchannonce(user) {
   let email=this.userForm.controls['email'].value;
   let password=this.userForm.controls['password'].value;
    let a="Admin" ;
    let b=0;
    let n=0;

    for (let us of this.User)
   {
    n=n+1;
     if((email==us.email)&&(password==us.password)&&(us.grade==a))
     {
      this.router.navigate(['users']);   
      this.toastr.success('Connexion reussie'); // Show success message when data is successfully submited 
      localStorage.setItem("email",us.email);

     }
     else {
       b=b+1;
     }
      
     //alert("aucun identifiant existant!")
   }
   if(b==n){
     this.invalide="* Email ou mot de passe incorrecte!"
   }     
   console.log("b=" + b +" ; "+ "n="+n)


}
}