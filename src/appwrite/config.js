import conf from '../conf.js';
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class DatabaseService {
	client = new Client();
	databases;
	storage;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.databases = new Databases(this.client);
		this.storage = new Storage(this.client);
	}

	async createArticle({title, slug, content, featuredImage, status, userId}) {
		try {
			return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				})
		} catch (error) {
			console.log("Error in Creating Article");
			return false;
		}
	}

	async updateArticle(slug, {title, content, featuredImage, status}) {
		try {
			return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug,
				{
					title,
					content,
					featuredImage,
					status,
				})
		} catch (error) {
			console.log("Error in Updating Article");
			return false;
		}
	}

	async deleteArticle(slug) {
		try {
			await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
			return true;
		} catch (error) {
			console.log("Error in Deleting Article");
			return false;
		}
	}

	async getArticle(slug) {
		try {
			return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
		} catch (error) {
			console.log("Error in Getting Articles");
			return false;
		}
	}

	async getArticles(queries = [Query.equal("status", "active")]) {
		try {
			return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries,);
		} catch (error) {
			console.log("Error");
			return false;
		}
	}

	// FILE UPLOAD = use Storage
	// Here we are passing the actual file, and not the filename or file ID
	async uploadFile(file) {
		try {
			return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file);
		} catch (error) {
			console.log("Error in File Upload");
			return false;
		}
	}

	// Here we are passing the fileId, not the file blob or filename
	async deleteFile(fileId) {
		try {
			await this.storage.deleteFile(conf.appwriteBucketId, fileId);
			return true;
		} catch (error) {
			console.log("Error in Removing File");
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
		} catch (error) {
			console.log("Error in Previewing File");
			return false;
		}
	}

}

const dbService = new DatabaseService();

export default dbService;