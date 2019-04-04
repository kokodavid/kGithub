
  import { Injectable } from '@angular/core';
  import {HttpClient} from '@angular/common/http';
  import {environment} from '../../environments/environment';
  import {from, Observable} from 'rxjs';
  import { Repos } from '../repos';
  import {Users} from '../users';
  

  
  
  @Injectable({
    providedIn: 'root'
  })
  export class ProfileService {
  
  userName :string;
    user:Users;
    repos:Repos;
    apiUrl = "https://api.github.com/users/"+this.userName;
  
    constructor(private http:HttpClient) { 
      this.user= new Users("","","",0,0,0,"","","","");
      this.repos=new Repos("","","");
     }
  
     getProfileInfo(userName){
      return this.http.get("https://api.github.com/users/" + userName )
    
    }
  
    getProfileRepos(userName){
      return this.http.get("https://api.github.com/users/" + userName+"/repos" )
      
    }
  
    updateProfile(userName){
      this.userName = userName;
    }

     profileRequest(){
      interface ProfileResponse{
        name:string;
        login:string;
        avatar_url:any;
        public_repos:number;
        bio:string;
        location:string;
      }
  
  
      let promise=new Promise((resolve,reject)=>{
        this.http.get<ProfileResponse>(this.apiUrl+"?access_token="+environment.token).toPromise().then(response=>{
          this.user.name=response.name;
          this.user.login=response.login;
          this.user.avatar_url=response.avatar_url;
          this.user.public_repos=response.public_repos;
          this.user.bio=response.bio;
          this.user.location=response.location;
  
          resolve();
        },
        error=>{
          alert("An Error has occurred processing your request");
  
          reject(error);
        }
        
        )
  
      });
      console.log(promise);
      return promise;
     }
  
     reposRequest(): Observable<Repos[]>{
       return this.http.get<Repos[]>(this.apiUrl+"/repos"+"?access_token="+environment.token)
      
     }
  }
  
