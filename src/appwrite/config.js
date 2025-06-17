import conf from "../conf/conf";
import { Client, Account, ID,Databases,Storage,Query} from "appwrite";

export class Service{
    client= new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID)
        this.databases=new Databases(this.client)
        this.bucket=new Storage(this.client)
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDBID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDBID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error;
        }
    }

    async delatePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDBID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(
            conf.appwriteDBID,
            conf.appwriteCollectionID,
            slug
           )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getposts(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDBID,
                conf.appwriteCollectionID,
                queries,

            )
        } catch (error) {
            throw error;
            return false
        }
    }

    //file upload service 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false
        }
    }

    async delateFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketID,
            fileId
        )
    }
}

const service=new Service()
export default service