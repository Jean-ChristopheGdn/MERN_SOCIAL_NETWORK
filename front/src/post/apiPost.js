export const create = (userId, token, post) => {
    return fetch(`http://localhost:8080/post/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            AUthorization: `Bearer ${token}`
        },
        body:post
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}

export const list = () => {
    return fetch(`http://localhost:8080/posts`, {
        method: "GET"
        }
    )
    .then (response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

export const singlePost = (postId) => {
    return fetch(`http://localhost:8080/post/${postId}`, {
        method: "GET"
        }
    )
    .then (response => {
        return response.json()
    })
    .catch(err => console.log(err))
}