import jwt_decode from 'jwt-decode';
import moment from 'moment';

export const post = async (url, json) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json)
    })
    let j = await res.json();
    return j;
};

export const get = async (url) => {
    let res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    let j = await res.json();
    return j;
};

//
export const checkAccessTokenWillExpireInDay = (days) => {
    // decode access token
    // check exp
    // if will exp in a day
    let decoded = getDecodedAccessToken();
    return moment(decoded.exp * 1000).subtract(days, "days").isBefore(moment());
};

export const getDecodedAccessToken = () => {
    let accessToken = getLocalToken();
    let decoded = jwt_decode(accessToken);
    return decoded;
}

export const exchangeRefreshTokenWithNewAccessToken = async () => {
    let refreshToken = localStorage.getItem("refreshToken");
    let username = getDecodedAccessToken().username;
    let res = await post("/api/auth/renew", {
        username,
        refreshToken
    });
    return res.token;
};

export const renewAccessTokenIfGoingExpire = async () => {
    let willExpire = checkAccessTokenWillExpireInDay(1);
    if (willExpire) {
        let token = await exchangeRefreshTokenWithNewAccessToken();
        localStorage.setItem("token", token);
    }
};

export const getAuthed = async (url) => {
    await renewAccessTokenIfGoingExpire();

    let token = getLocalToken();
    let res = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    if (res.status !== 200) {
        throw res;
    }
    let j = await res.json();
    return j;
}

export const postAuthed = async (url, json) => {
    await renewAccessTokenIfGoingExpire();

    let token = getLocalToken();
    let res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(json)
    })
    if (res.status !== 200) {
        throw res;
    }
    let j = await res.json();
    return j;
}

export const putAuthed = async (url, json) => {
    await renewAccessTokenIfGoingExpire();

    let token = getLocalToken();
    let res = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    if (res.status !== 200) {
        throw res;
    }
    // console.log(res);
    let j = await res.json();
    return j;
}

export const patchAuthed = async (url, json) => {
    await renewAccessTokenIfGoingExpire();

    let token = getLocalToken();
    let res = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(json)
    })
    if (res.status !== 200) {
        throw res;
    }
    // console.log(res);
    let j = await res.json();
    return j;
}

export const deleteAuthed = async (url) => {
    await renewAccessTokenIfGoingExpire();

    let token = getLocalToken();
    let res = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    if (res.status !== 200) {
        throw res;
    }
}

export const getLocalToken = () => {
    let token = localStorage.getItem("token");
    return token;
};

export const removeLocalToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
};

export const getLastSegmentFromUrl = (url) => {
    return url.substr(url.lastIndexOf('/') + 1)
};

export const logout = () => {
    removeLocalToken();
    window.location = "/login";
};

export const filterUsersByWorkers = (users) => {
    return users.filter((user) => {
        return user.roles.indexOf("ROLE_WORKER") >= 0;
    })
};

export const filterUsersByRole = (users, role) => {
    return users.filter((user) => {
        return user.roles.indexOf(role) >= 0;
    })
};

export const getIdFromEntity = (entity) => {
    if (!entity) return false;
    let href = entity._links.self.href;
    let id = getLastSegmentFromUrl(href);
    return id;
};

export const getEntityById = (entities, entityId) => {
    return entities.find((entity) => {
        // console.log(entity);
        // return false;
        let id = getIdFromEntity(entity);
        return id == entityId;
    })

};

export const indexOfEntityById = (entities, entityId) => {
    return entities
        .map((person) => {
            return getIdFromEntity(person);
        })
        .indexOf(entityId);
};

export const filterByFields = (entities, search) => {
    if (!search) {
        return entities;
    }
    // console.log(entities);
    return entities.filter((entity) => {
        return entity.firstName.toLowerCase().includes(search.toLowerCase());
    })
};