import HttpService from './HttpService';

export const GetUserListService = () => {
    const http = new HttpService();
    let signupUrl = "admin/users";
    const tokenId = "user-token";

    return http.getData(signupUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetObjectCategoriesService = () => {
    const http = new HttpService();
    let getUrl = "admin/categories";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetObjectRaritiesService = () => {
    const http = new HttpService();
    let getUrl = "admin/rarities";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const PostMintTokensService = (postData) => {
    const http = new HttpService();
    let postUrl = "admin/mint";
    const tokenId = "user-token";

    return http.formData(postData, postUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetTokenInformationService = (id) => {
    const http = new HttpService();
    let getUrl = "admin/token/" + id;
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetCratesService = () => {
    const http = new HttpService();
    let getUrl = "admin/crates";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}