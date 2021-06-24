import User from "App/Models/User";

export class UserService {

    static async getById(id: number) {
        let result;
        
        result = await User.find(id);

        if (result) return result;

    }
}