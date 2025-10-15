import {conf} from '../conf/conf.js'
import { Client, Databases, ID, Query } from 'appwrite'

export class PostService{
    client = new Client()
    databases
    constructor(){
        this.client
        .setEndpoint(conf.appwriteendpoint) // Your Appwrite Endpoint
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client)
    }

    async createPost({title,content,imageId}){
        try {
            const response= await this.databases.createDocument(conf.appwritedatabaseId,conf.appwitecollectionId,ID.unique(),{
                title,
                content,
                imageId
            })
            return response
        } catch (error) {
            console.log('Post::Create::Error',error);
            throw error
        }
    }

    async getPosts(){
        try {
            const response= await this.databases.listDocuments(conf.appwritedatabaseId,conf.appwitecollectionId,[
                Query.orderDesc('$createdAt'),
                Query.equal('status','active')
            ])
            return response
        } catch (error) {
            console.log('Post::Get::Error',error);
            throw error
        }
    }

    async getPost(postId){
        try {
            const response= await this.databases.getDocument(conf.appwritedatabaseId,conf.appwitecollectionId,postId)
            return response
        } catch (error) {
            console.log('Post::GetSingle::Error',error);
            throw error
        }
    }
    async deletePost(postId){
        try {
            const response= await this.databases.deleteDocument(conf.appwritedatabaseId,conf.appwitecollectionId,postId)
            return response
        } catch (error) {
            console.log('Post::Delete::Error',error);
            throw error
        }
    }

    async updatePost({postId,title,content,imageId}){
        try {
            const response= await this.databases.updateDocument(conf.appwritedatabaseId,conf.appwitecollectionId,postId,{
                title,
                content,
                imageId
            })
            return response
        } catch (error) {
            console.log('Post::Update::Error',error);
            throw error
        }
    }

}

const postService=new PostService()
export { postService }
