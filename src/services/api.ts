import { ShopApi } from "./api/shop/shopApi";
import { UserApi } from "./api/user/user";
import { ISessionService, SessionService } from "./baseApi";

const sessionService: ISessionService = new SessionService();


export const userApi = new UserApi(sessionService)


export const shopApi = new ShopApi(sessionService)