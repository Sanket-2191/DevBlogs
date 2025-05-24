import config from "../config/config.js";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


class Service {
    constructor() {
        this.client = new Client()
            .setEndpoint(`${config.appwriteUrl}`)
            .setProject(`${config.appwriteProjectId}`);

        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createBlog({ title, slug, content, status, contentImage, userId }) {
        try {
            console.log("Data for new Blog: ", { title, slug, content, status, contentImage, userId })
            const newDoc = await this.databases.createDocument(
                config.appwriteDBId, // databaseId
                config.appwriteCollectionId, // collectionId
                slug, // documentId
                {
                    slug,
                    title,
                    content,
                    contentImage,
                    status,
                    userId
                }, // data
            );
            if (!newDoc) console.error("APPWRITE SERVICE :: New Blog not created.")

            return newDoc;

        } catch (error) {
            console.error("APPWRITE SERVICE :: Error while trying to create new Blog: ", error)
        }
    }

    async updateBlog(slug, { title, content, status, contentImage }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug,
                { title, content, status, contentImage }
            )

        } catch (error) {
            console.error("APPWRITE SERVICE :: Error while trying to update the Blog: ", error)
        }
    }

    async deleteBlog(slug) {
        try {
            return await this.databases.deleteDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("APPWRITE SERVICE :: Error while trying to Delete the Blog: ", error)
        }
    }

    async getABlog(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDBId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.error("APPWRITE SERVICE :: Error while trying to fetch a Blog: ", error)
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
            console.error("APPWRITE SERVICE :: Error while trying to fetch Blogs: ", error)
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
            console.error("APPWRITE SERVICE :: Error while trying to upload a file: ", error)
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.error("APPWRITE SERVICE :: Error while trying to delete a file: ", error)
        }
    }

    async getFilePreview(fileId) {
        try {
            // console.log("File preview for: ", fileId);

            const file = await this.storage.getFilePreview(
                config.appwriteBucketId,
                fileId
            )
            // console.log("File preview for: ", { fileId, fileSplit: file.split('preview').join("view") });
            return file.split('preview').join("view");
        } catch (error) {
            console.error("APPWRITE SERVICE :: Error while trying to get preview of a file: ", error)
        }
    }
}

export const service = new Service();

export default Service;