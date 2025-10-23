import {conf}  from '../conf/conf.js'
import { Client, Storage, ID } from 'appwrite'

export class FileService{
    client = new Client()
    storage

    constructor(){
        this.client
        .setEndpoint(conf.appwriteendpoint) // Your Appwrite Endpoint
        .setProject(conf.appwriteProjectId);
        this.storage=new Storage(this.client)
    }

    async uploadFile(file){
        try {
            const response= await this.storage.createFile(conf.appwritebucketId,ID.unique(),file)
            return response
        } catch (error) {
            console.log('File::Upload::Error',error);
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            const response= await this.storage.deleteFile(conf.appwritebucketId,fileId)
            return response
        } catch (error) {
            console.log('File::Delete::Error',error);
            throw error
        }
    }

    async getFilePreview(fileId){
        try {
            const response= this.storage.getFilePreview(conf.appwritebucketId, fileId)
            return response
        } catch (error) {
            console.log('File::GetPreview::Error',error);
            throw error
        }
    }

}

const fileService=new FileService()
export { fileService }