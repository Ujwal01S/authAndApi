
import { db } from "@/lib/mongo";
import { UploadImage } from "@/lib/uploadFile";
import { Shop } from "@/models/shop";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, context: { params: Promise<{ name: string }> }) => {

    const { name: id } = await context.params
    if (!id) {
        return NextResponse.json({ message: "Id parameter is missing" }, { status: 400 });
    }
    await db();
    try {

        const shop = await Shop.findById(id);

        if (!shop) {
            return NextResponse.json({ message: "Shop not found" }, { status: 404 });
        }

        return NextResponse.json({ shop });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error while finding data" }, { status: 400 });
        } else {
            return NextResponse.json({ message: "Something went wrong!" });
        }
    }
};


export const DELETE = async (req: NextRequest, context: { params: Promise<{ name: string }> }) => {
    const { name: id } = await context.params;

    try {
        const shop = await Shop.findById(id);

        if (!shop) {
            return NextResponse.json(
                { message: "Shop not found" },
                { status: 404 }
            );
        }


        await Shop.findByIdAndDelete(id);

        return NextResponse.json(
            { message: "Shop Successfully Deleted!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Delete shop error:", error);
        return NextResponse.json(
            { message: "Error while deleting shop" },
            { status: 500 }
        );
    }
}


export const PUT = async (req: NextRequest, context: { params: Promise<{ name: string }> }) => {
    const { name: id } = await context.params;


    try {
        const formData = await req.formData();
        const name = formData.get("name");
        const level = formData.get("level");
        const phone = formData.get("phone");
        const category = formData.get("category");
        const subCategory = formData.get("subCategory");
        const openTime = formData.get("openTime");
        const closeTime = formData.get("closeTime");
        const description = formData.get("description");
        const mallName = formData.get("mallName");
        const images = formData.getAll("image");
        const video = formData.getAll("video");

        const arrayOfShopImages: string[] = [];

        // console.log("Image from put", images);

        const uploadPromises = images.map(async (image) => {
            if (typeof image === 'string') {
                arrayOfShopImages.push(image)
                console.log("imageReached")
            } else {
                const imageData = await UploadImage(image as unknown as File, "shops")
                arrayOfShopImages.push(imageData.secure_url);
            }
        });

        await Promise.all(uploadPromises);

        // console.log(video)
        // console.log("type:", typeof video)
        const videoUrl: string[] = [];
        if (video) {
            const videoPromise = video.map(async (vid) => {
                if (typeof vid === "string") {
                    videoUrl.push(vid)
                    console.log("videoReached");
                } else {
                    const videoData = await UploadImage(vid as unknown as File, "Shop-video");
                    videoUrl.push(videoData.secure_url);
                    console.log("URLVIDEO");
                }
            })
            await Promise.all(videoPromise);
        }

        // console.log("image in URL:", arrayOfShopImages);

        const payload = {
            name,
            level,
            phone,
            category,
            subCategory,
            openTime,
            closeTime,
            description,
            image: arrayOfShopImages,
            mallName,
            ...(videoUrl ? { video: videoUrl } : {})
        }

        // console.log("Payload data:", payload);

        await Shop.findByIdAndUpdate(id, payload)


        return NextResponse.json({ message: "Shop Successfully updated!!", shopId: id })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: "Error while updating Shop!" });
        }
    }
}