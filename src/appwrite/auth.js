import config from "../config/config.js";

import { Client, Account, ID } from "appwrite";


class AuthService {
    constructor() {
        // console.log("config in authservice:", config);
        this.client = new Client()
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async signUp({ email, fullname, password, username }) {
        try {
            const newAccount = await this.account.create(ID.unique(), email, password, username, fullname);

            if (!newAccount) {
                throw new Error("New account was not created");
            }

            return this.login({ email, password });
        } catch (error) {
            console.error("APPWRITE AUTH SERVICE :: signUp error:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const userSession = await this.account.createEmailPasswordSession(email, password);

            if (!userSession) {
                throw new Error("Login failed");
            }

            return userSession;
        } catch (error) {
            console.error("APPWRITE AUTH SERVICE :: login error:", error);
            throw error;
        }
    }

    async getCurrUser() {
        try {
            const currUser = await this.account.get();
            // console.log("getCurrUser: ", currUser);

            return currUser;
        } catch (error) {
            console.error("APPWRITE AUTH SERVICE :: getCurrUser error:", error);
            throw error;
        }
    }


    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.error("APPWRITE AUTH SERVICE :: logout error:", error);
            throw error;
        }
    }
}


export const authService = new AuthService();

export default AuthService;