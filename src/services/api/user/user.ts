import { BaseApi, ISessionService } from "../../baseApi";


export class UserApi extends BaseApi {
    constructor(sessionService: ISessionService) {
        super(sessionService)
    }

    async getUser() {
        // console.log("From UserApi");
        return this.getAuthenticatedSession()
    }
}