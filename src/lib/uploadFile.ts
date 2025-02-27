import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
    secure_url: string;
    public_id: string;
}

export const UploadImage = async (file: File, folder: string): Promise<CloudinaryUploadResult> => {
    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);

    return new Promise(async (resolve, reject) => {
        await cloudinary.v2.uploader
            .upload_stream(
                {
                    resource_type: "auto", // Automatically detect the file type (image, video, etc.)
                    folder: folder, // Folder in Cloudinary where the image will be uploaded
                },
                (error, result) => {
                    if (error) {
                        reject(error.message); // Reject if there is an error
                    } else {
                        resolve(result as CloudinaryUploadResult); // Resolve with the result of the upload
                    }
                }
            )
            .end(bytes);
    });
};

export const deleteImage = async (publicId: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await cloudinary.v2.uploader.destroy(publicId);
            return resolve(result);
        } catch (error) {
            if (error instanceof Error) {
                reject(new Error(error.message));
            }
        }
    });
};
