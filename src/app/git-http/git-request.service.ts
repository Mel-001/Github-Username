import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user';
import { Repository} from '../repository'

@Injectable({
  providedIn: 'root'
})
export class GitRequestService {
  gitRequest() {
    throw new Error('Method not implemented.');
  }
  
  user: User;
  repos: Repository[]=[];
  Username?: string;

  constructor(private http:HttpClient) {
    this.user = new User("","",0 , 0, "", "")
    // this.repos = new Repository("", "", "", new Date(), "")
    
    this.Username = "Mel-001" 
  }
  
  searchUser(userRequest: any) {
    throw new Error('Method not implemented.');
  }

   getUser(){
    interface ApiResponse{
      name:string,
      login: string,
      followers: number,
      following: number,
      repos_url: string,
      avatar_url: string,
      url: string
    }

    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>(environment.apiUrl+this.Username+"?access_token=").toPromise().then((response:any)=>{
        this.user.name = response.name
        this.user.login = response.login
        this.user.followers = response.followers
        this.user.following = response.following
        
        resolve(response)
      }), 
      (error:any) => {
        reject()
      }
    })
    return promise;
  }

  getRepo(){
    interface ApiResponse{
      name:string,
      description:string,
      language:string,
      created_at:Date,
      repos_url: string
    }

    let promise = new Promise((resolve,reject)=>{
      this.http.get<ApiResponse>(environment.apiUrl + this.Username +"/repos").toPromise().then((response:any)=>{
        this.repos.push = (response);
        resolve(response)
      }), 
      (error:any) => {
        reject()
      }
    })
    return promise;
  }

  userRequest(UserName:any) {
    interface ApiResponse {
    name: string,
    login: string;
    followers: number,
    following: number,
    avatar_url: string,
    url: string
    }

    let promise = new Promise((_resolve,_reject)=>{
    this.http.get<ApiResponse>(environment.apiUrl + UserName + "?access_token=" ).toPromise().then((response:any)=>{
    this.user.name = response.name;
    this.user.login = response.login; 
    this.user.followers = response.followers;
    this.user.following = response.following;
      })
    })
    return promise
    } 

  getUserRepos(UserName:any){
    interface ApiResponse{
      name:string,
      description:string,
      language:string,
      created_at:Date,
      repos_url: string
    }

    let promise = new Promise((resolve, reject) => {
      this.http.get<ApiResponse>(environment.apiUrl + UserName + "/repos?access_token=" ).toPromise().then((res:any) => { 
        this.repos = res;
          resolve(res);
            },
            (error)=>{
              reject();
            }
          );
      });
      return promise;
    }
}
