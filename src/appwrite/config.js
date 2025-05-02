import config from "../config/config.js";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


class Service {
    constructor() {
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createBlog({ title, content, status, contentImage, userId }) {
        try {
            const newDoc = await this.databases.createDocument(
                config.appwriteDBId, // databaseId
                config.appwriteCollectionId, // collectionId
                ID.unique(), // documentId
                {
                    title,
                    content,
                    contentImage,
                    status,
                    userId
                }, // data
            );
            if (!newDoc) throw new Error("APPWRITE SERVICE :: New Blog not created.")

            return newDoc;

        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to create new Blog: ", error)
        }
    }

    async updateBlog(docId, { title, content, status, contentImage }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                docId,
                { title, content, status, contentImage }
            )

        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to update the Blog: ", error)
        }
    }

    async deleteBlog(docId) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                docId
            )
        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to Delete the Blog: ", error)
        }
    }

    async getABlog(docId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                docId
            )
        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to fetch a Blog: ", error)
        }
    }

    async getBlogs(query = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDBId,
                config.appwriteCollectionId,
                query
            )
        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to fetch Blogs: ", error)
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to upload a file: ", error)
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to delete a file: ", error)
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw new Error("APPWRITE SERVICE :: Error while trying to get preview of a file: ", error)
        }
    }
}

export const service = new Service();

export default Service;