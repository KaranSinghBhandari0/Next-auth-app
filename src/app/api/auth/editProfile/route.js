import { editProfile } from "@/controllers/authController"

export const PUT = async (req) => {
    return await editProfile(req);
}