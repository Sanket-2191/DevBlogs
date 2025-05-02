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

            if (!newAccount) throw new Error("APPWRITE AUTH SERVICE :: New Account was not created");

            return this.login({ email, password });
        } catch (error) {
            throw new Error("APPWRITE AUTH SERVICE :: Some error occured during signUp: ", error)
        }
    }

    async login({ email, password }) {
        try {
            const userSession = await this.account.createEmailPasswordSession(
                email,
                password
            );

            if (!userSession) throw new Error("APPWRITE AUTH SERVICE :: Login Failed");

            return userSession;
        } catch (error) {
            throw new Error("APPWRITE AUTH SERVICE :: Some error occured during Login: ", error)
        }
    }

    async getCurrUser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw new Error("APPWRITE AUTH SERVICE :: User is not LoggedIn: ", error)
        }

    }

    async logout() {
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw new Error("APPWRITE AUTH SERVICE :: Logout: ", error)
        }
    }

}


export const authService = new AuthService();

export default AuthService;