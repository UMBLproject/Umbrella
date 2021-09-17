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

export const AssignTokenService = (postData) => {
    const http = new HttpService();
    let postUrl = "admin/assign";
    const tokenId = "user-token";

    return http.postData(postData, postUrl, tokenId).then((data) => {
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

export const GetRaritiesService = () => {
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

export const AddNewCrateService = (crate) => {
    const http = new HttpService();
    let postUrl = "admin/crates";
    const tokenId = "user-token";

    return http.postData(crate, postUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetCrateService = (id) => {
    const http = new HttpService();
    let getUrl = "admin/crates/" + id;
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const UpdateCrateService = (id, crateData) => {
    const http = new HttpService();
    let patchUrl = "admin/crates/" + id;
    const tokenId = "user-token";

    return http.patchData(crateData, patchUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const DeleteCrateService = (id) => {
    const http = new HttpService();
    let deleteUrl = "admin/crates/" + id;
    const tokenId = "user-token";

    return http.deleteData(deleteUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetUserCountService = () => {
    const http = new HttpService();
    let getUrl = "admin/usercount";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetCrateCountService = () => {
    const http = new HttpService();
    let getUrl = "admin/cratecount";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetObjectCountService = () => {
    const http = new HttpService();
    let getUrl = "admin/objectcount";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}

export const GetLoginCountService = () => {
    const http = new HttpService();
    let getUrl = "admin/logincount";
    const tokenId = "user-token";

    return http.getData(getUrl, tokenId).then((data) => {
        console.log(data);
        return data;
    }).catch((error) => {
        return error;;
    })
}