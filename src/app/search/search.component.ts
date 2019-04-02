
import { Component, OnInit } from '@angular/core';
import {Users} from '../users';
import {ProfileService} from '../services/profile.service';
import {Repos} from '../repos';



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers:[ProfileService],
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userName = "";
  user:Users;
  repos:Repos;
  profile: any;
  repo: Object;


  constructor(private profileService:ProfileService) { }


  findProfile(){
  	this.profileService.updateProfile(this.userName);
  	this.profileService.getProfileInfo(this.userName).subscribe(profile => {
  	
  		this.profile = profile;
  	});

    this.profileService.getProfileRepos(this.userName).subscribe(repos => {
  		this.repo = repos;
  	})  	
  

  }
  ngOnInit() {
    this.profileService.profileRequest();
    this.user = this.profileService.user;  
    this.profileService.getProfileInfo(this.userName).subscribe(profile => {
  	
  		this.profile = profile;
  	});
      
    }


  }

