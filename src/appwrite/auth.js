import conf from '../conf.js';
import { Client, Account, ID } from "appwrite";

// const client = new Client()
//     .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
//     .setProject('<PROJECT_ID>');               // Your project ID

// const account = new Account(client);

// const promise = account.create('[USER_ID]', 'email@example.com', '');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {
//     console.log(error); // Failure
// });

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({email, password, name}) {
		try {
			const userAccount = await this.account.create(ID.unique(), email, password, name);
			if (userAccount) {
				// if userAccount has been created then log the user in directly
				return this.login({email, password});
			} else {
				// return something to denote failure
				return null;
			}
		} catch (error) {
			throw error;
		}
	}

	async login({email, password}) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			throw error;
		}
	}

	async logout() {
		try {
			return await this.account.deleteSessions();
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			throw error;
		}
	}
}

const authService = new AuthService();

export default authService;