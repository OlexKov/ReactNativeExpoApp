import { IUserCreate } from "@/models/account"
import { ICategoryCreationModel } from "@/models/category/ICategoryCreationModel"

export const generateUserCreateFormData = (userModel: IUserCreate):FormData => {
    const formData = new FormData();
    if (userModel.imageUri) {
        formData.append('imageFile', {
            uri: userModel.imageUri,
            type: "image/" + userModel.imageUri.split('.').pop(),
            name: userModel.imageUri.split('/').pop(),
        } as any);
    }
    formData.append('firstName', userModel.firstName)
    formData.append('lastName', userModel.lastName)
    formData.append('email', userModel.email );
    formData.append('password', userModel.password );
    return formData;
}

export const generateCategoryFormData = (categoryModel: ICategoryCreationModel):FormData => {
    const formData = new FormData();
    if (categoryModel.imageUri) {
        formData.append('imageFile', {
            uri: categoryModel.imageUri,
            type: "image/" + categoryModel.imageUri.split('.').pop(),
            name: categoryModel.imageUri.split('/').pop(),
        } as any);
    }
    formData.append('name', categoryModel.name)
    formData.append('description', categoryModel.description || '')
    formData.append('id', categoryModel.id ? `${categoryModel.id}` : "0");
    return formData;
}