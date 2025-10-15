import conf from "@/conf/conf";
import { Client, Databases ,ID , Query } from "appwrite";

export class AuthCard {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId); // Your project ID
        this.databases = new Databases(this.client);
    }

    async addbook({bookId , userId , bookData}) {
    try {

        const existing = await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            [
                Query.equal('bookId',bookId),
                Query.equal('userId',userId),
                Query.limit(1)
            ]
        );

        if(existing.documents.length>0){
            // book exist in card
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                existing.documents[0].$id,
                {
                    quantity: existing.documents[0].quantity + 1
                }
            );
        }
        else{
            // book not exist in card
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    bookId: bookId,
                    userId: userId,
                    quantity: 1,
                    ...bookData
                }
            );
        }

        
    } catch (error) {
        console.log("Error while creating post", error);
        
    }
    }

    async getBook(userId) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [Query.equal('userId',userId)]
            );
        } catch (error) {
            console.log("Error while fetching posts", error);
        }
    }

    async deleteBook(cardId) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                cardId
            );
        } catch (error) {
            console.log("Error while deleting post", error);
        }
    }

    async decreaseBookQuantity(cardId) {
        try {
            const doc = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                cardId
            );
            if (doc.quantity <= 1) {
                // delete the document
                return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    cardId
                );
            }
            else {
                // decrease the quantity by 1
                return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    cardId,
                    {
                        quantity: doc.quantity - 1
                    }
                );
            }
        }
        catch (error) {
            console.log("Error while updating post", error);
        }
    }
}

const cardService =  new AuthCard();
export default cardService;