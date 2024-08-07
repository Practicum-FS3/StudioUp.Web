import { Component,OnInit,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ContactMod } from '../../models/contact';
import { CommonModule } from '@angular/common';
import {ContactService} from '../../services/contact.service'
import { response } from 'express';
//import {submitContactForm} from '../services/contact.service'

@Component({
  selector: 'app-contact',
  ///standalone: true,
  //imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent{
  ShowHideEmail:boolean = false;
  ShowHideMessage:boolean = false;
  ShowHidePhone:boolean = false;
  ShowHideName:boolean = false;
  formContact: ContactMod;
  form_group:FormGroup;
  // contact: ContactService;
  // nameControl:FormControl;

  constructor(private formBuilder:FormBuilder, private contactService:ContactService){
    this.formContact = {id:0,name:"",phone:"",email:"",message:"",isWatch:false}
    this.form_group = new FormGroup({
    nameControl:new FormControl('',[Validators.required,Validators.pattern('[A-Za-zא-ת ]*')]),
    phoneControl:new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(10)]),
    messageControl:new FormControl('',[Validators.required,Validators.maxLength(80),Validators.pattern('[A-Za-zא-ת !?,()0123456789.]*')]),
    EmailControl:new FormControl('',[Validators.required,Validators.email])
    })
    // this.contact = new ContactService(this.formContact);
  }

  ngOnInit(): void{
    console.log("ngOnInit");
    // this.nameControl = this.formBuilder.control(this.formContact.name);
  }

  onSubmit(){
    console.log("submit");
    //this.formContact = {name:"",phone:0,email:"",message:""}
    //this.form_group.reset()
    if(!this.form_group.controls['EmailControl'].valid)
        this.ShowHideEmail = true;
    else
        this.ShowHideEmail = false;  
    if(!this.form_group.controls['messageControl'].valid)
        this.ShowHideMessage = true;
    else
        this.ShowHideMessage = false;
    if(!this.form_group.controls['nameControl'].valid)
        this.ShowHideName = true;
    else
        this.ShowHideName = false;
    if(!this.form_group.controls['phoneControl'].valid)
        this.ShowHidePhone = true;
    else
        this.ShowHidePhone = false;
            
    if(this.form_group.controls['EmailControl'].valid && this.form_group.controls['messageControl'].valid && 
    this.form_group.controls['nameControl'].valid && this.form_group.controls['phoneControl'].valid)
    {
        this.formContact.email = this.form_group.controls['EmailControl'].value;
        this.formContact.message = this.form_group.controls['messageControl'].value;
        this.formContact.name = this.form_group.controls['nameControl'].value;
        this.formContact.phone = this.form_group.controls['phoneControl'].value;
        console.log("formContact",this.formContact);
         this.contactService.addContact(this.formContact).subscribe(response =>{
          alert("This form sent to the database: " + JSON.stringify(this.formContact));
         });
         this.form_group.reset();
    }
    //console.log("formContact",this.formContact);
    //submitContactForm(this.formContact);
  }

  //  changeShowHideEmail(){
  //    this.ShowHideEmail = true;
  //  }
  //  changeShowHideMessage(){
  //   this.ShowHideMessage = true;
  // }
  // changeShowHidePhone(){
  //   this.ShowHidePhone = true;
  // }
  // changeShowHideName(){
  //   this.ShowHideName = true;
  // }

}

