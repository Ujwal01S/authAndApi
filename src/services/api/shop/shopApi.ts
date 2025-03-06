import { BaseApi, ISessionService } from "@/services/baseApi";
import { SuccessGetResponse } from "@/types/response";

export type ShopTypes = {
    _id: string;
    name: string;
    openTime: string;
    closeTime: string;
    phone: string;
    image: string[];
    mallName: string;
    category: string;
    subCategory: string
    video?: string
};

export class ShopApi extends BaseApi {
    constructor(sessionService: ISessionService) {
        super(sessionService)
    }

    async getShopData() {
        return this.handleServerQuery<SuccessGetResponse<ShopTypes>>({
            query: "api/shop",
            cache: "no-cache",
            tags: ["shops"]
        })
    }
}