import conf from '../conf/conf.js'
import { Client, Account ,ID } from 'appwrite'

export class AuthService{
    client = new Client();
    account 

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl) // Your Appwrite Endpoint
        .setProject(conf.appwriteProjectId); // Your project ID
        this.account=new Account(this.client)
    }

    async createAccount({email,password,name}){
    try {
    const userAccount = await this.account.create(ID.unique(),email,password,name)

    if(userAccount){
        return this.login({email,password})
    }
    else{
        return userAccount 
    }
    } catch (error) {
        console.log('Auth::CreateAccount::Error',error);
        throw error
    
    }
    }

    async login({email,password}){

        try {
        
        const currentUser = await this.getCurrentUser();
            if (currentUser) {
                console.log('User already logged in');
                return currentUser; 
            }
        } catch (error) {
            console.log('Auth::Login::getCurrentUser::Error',error);
        }

        try {
            const userLogin = await this.account.createEmailPasswordSession(email,password)
            return userLogin

        } catch (error) {
        console.log('Auth::Login::Error',error);
        throw error    
        }
    }


    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('Auth::getCurrentUser::Error',error);
        }
        return null
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log('Auth::Logout::Error',error);
            throw error    
        }

    }



}

const authservice = new AuthService()

export default authservice