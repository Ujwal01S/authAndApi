

// import mongoose from "mongoose";
import { UploadImage } from "@/lib/uploadFile";
import { Shop } from "@/models/shop";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    const shops = await Shop.find({})
    return NextResponse.json(shops)
}

export const POST = async (req: NextRequest) => {
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
        const images = formData.getAll("image");
        const mallName = formData.get("mallName");
        const video = formData.getAll("video");
        // const id = formData.get("mallId");

        // console.log("From API Shop", images);

        if (!name || !level || !phone || !category || !description) {
            // console.log("Missing required fields");
            return NextResponse.json({ message: "All Fields are required" });
        }

        const arrayOfShopImage: string[] = [];
        const uploadPromises = images.map(async (image) => {
            // console.log("Uploading image:", image);
            const imageData = await UploadImage(image as unknown as File, "Shops");
            // console.log("Uploaded image data:", imageData);
            arrayOfShopImage.push(imageData.secure_url);
        });

        await Promise.all(uploadPromises);

        const videoUrl: string[] = []
        if (video) {
            const videoUrlsPromise = video.map((async (vid) => {
                const videoData = await UploadImage(vid as unknown as File, "Shop-video");
                videoUrl.push(videoData.secure_url);
            }));
            await Promise.all(videoUrlsPromise);
        }

        // console.log("Uploaded Images:", arrayOfShopImage);

        // console.log("after upload Image")

        // if (id === null || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
        //     return NextResponse.json({ message: "Invalid mallId" });
        // }
        // const mallObjectId = new mongoose.Types.ObjectId(id);

        const shop = await Shop.create({
            name,
            level,
            phone,
            category,
            subCategory,
            openTime,
            closeTime,
            description,
            image: arrayOfShopImage,
            mallName,
            ...(videoUrl ? { video: videoUrl } : {})
            // mallId: mallObjectId
        })

        // await Category.findOneAndUpdate(
        //     { category: category },
        //     { $push: { shops: shop._id } },
        //     { new: true },
        // )

        return NextResponse.json({ message: "Shop created successfully", shopId: shop._id });

    } catch (error) {
        console.error("Error creating shop:", error);
        return NextResponse.json({ message: "Error creating shop" });
    }
}