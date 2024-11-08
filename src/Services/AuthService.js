import {role_permissions, user} from '../Stores/UserStore';
import {RESTClient} from "../Utils/RESTClient"
class AuthService {
    // Key names to use in localStorage
    static STORAGE_KEY_USER = 'auth_user';
    static STORAGE_KEY_TOKENS = 'auth_tokens';
    static STORAGE_KEY_VENDOR = 'vendor';

    // Save user and tokens to localStorage
    static login(response) {
        if(response.user){
            localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(response.user));
            user.set(response.user)
        }
       if(response.tokens){
            localStorage.setItem(this.STORAGE_KEY_TOKENS, JSON.stringify(response.tokens));
       }
       if(response.access && response.refresh){
            localStorage.setItem(this.STORAGE_KEY_TOKENS, JSON.stringify({access: response.access, refresh: response.refresh}));
       }

       if(response.permissions)
        {
          role_permissions.set(response.permissions);
        }

       return
    }

    // Check if the user is logged in
    static isLoggedIn() {
        // return true;
        const tokens = this.getTokens();
        return !!tokens && !!tokens.access && new Date(tokens.access.expires) > new Date();
    }

    // Get the logged in user's data
    static getUser() {
        const userJson = localStorage.getItem(this.STORAGE_KEY_USER);
        if(userJson && userJson !== 'undefined') { 
            user.set(JSON.parse(userJson))                          
            return JSON.parse(userJson);
        }
        return null;
    }

    static setUser(updatedUser) {
        // Save the updated user details in localStorage (or sessionStorage, based on your implementation)
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

    // Get the stored tokens
    static getTokens() {
        const tokensJson = localStorage.getItem(this.STORAGE_KEY_TOKENS);
        if(tokensJson && tokensJson !== 'undefined') {                           
            return JSON.parse(tokensJson);
        }
        return null; 
    }

    // Log the user out by clearing the localStorage
    static logout() {
        localStorage.removeItem(this.STORAGE_KEY_USER);
        localStorage.removeItem(this.STORAGE_KEY_TOKENS);
    }

    // Update token (can be used for refreshing tokens)
    static updateAccessToken(newAccessToken) {
        const tokens = this.getTokens();
        if (tokens) {
            tokens.access = newAccessToken;
            localStorage.setItem(this.STORAGE_KEY_TOKENS, JSON.stringify(tokens));
        }
    }


    static setVendor(response) {
        localStorage.setItem(this.STORAGE_KEY_VENDOR, JSON.stringify(response));
        return
    }

    static getVendor() {
        const vendorJson = localStorage.getItem(this.STORAGE_KEY_VENDOR);
        return vendorJson ? JSON.parse(vendorJson) : null;
    }
    
    static isVendor() {
        const vendor = this.getVendor();
        return !!vendor;
    }

    static updateVendorProfile(data) {
        const currentUser = this.getUser();
        if(currentUser){
            const updatedUser = {
                ...currentUser,
                ...data
            };
            localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(updatedUser));
            user.set(updatedUser)}
        }

    
}

export default AuthService;
