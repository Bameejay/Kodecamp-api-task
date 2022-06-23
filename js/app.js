let postWrapper = document.querySelector("#post-holder");
let postForm = document.querySelector("#post-form");
let title = document.querySelector("#title");
let body = document.querySelector("#body");

let postBox = [];

function getPosts() {
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
            console.log(postBox);
            postBox = data;
            let postHolder = " ";
            postBox.forEach((post) => {
                postHolder += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h6 id="post-title">${post.title}</h6>
                                <p id="post-body">
                                    ${post.body}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary rounded-3"onclick=updatePost(${post.id})>Update</button>
                                    <button class="btn btn-danger rounded-3"onclick=deletePost(${post.id})>Delete</button>
                                    <button class="btn btn-success rounded-3"onclick=openSingle(${post.id})>View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                
                `;
            });
            postWrapper.innerHTML = postHolder;
        });
    // .then(json => console.log(json))
}

getPosts();

postForm.addEventListener("submit", createPost);

function createPost(e) {
    e.preventDefault();
    // console.log(title.value, body.value);
    fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            body: JSON.stringify({
                title: title.value,
                body: body.value,
                userId: 2,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            alert("Post created successfully");
            postBox.push(data);
            console.log(postBox);
            let postHolder = " ";
            postBox.forEach((post) => {
                postHolder += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h6 id="post-title">${post.title}</h6>
                                <p id="post-body">
                                    ${post.body}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary rounded-3"onclick=updatePost(${post.id})>Update</button>
                                    <button class="btn btn-danger rounded-3"onclick=deletePost(${post.id})>Delete</button>
                                    <button class="btn btn-success rounded-3"onclick=openSingle${post.id})>View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                
                `;
            });
            postWrapper.innerHTML = postHolder;
        });
}


function updatePost(id) {
    console.log(id);

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                id: 1,
                title: title.value,
                body: body.value,
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let postTitles = document.querySelectorAll("#post-title");
            let postBodies = document.querySelectorAll("#post-body");
            postTitles.forEach((postTitle, index) => {
                if (index + 1 === id) {
                    if (data.title !== "") {
                        postTitle.innerHTML = data.title;
                    }
                }
            })
            postBodies.forEach((postBody, index) => {
                if (index + 1 === id) {
                    if (data.body !== "") {
                        postBody.innerHTML = data.body;
                    }
                }
            })
        })
}


function openSingle(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            localStorage.setItem("viewedPost", JSON.stringify(data));
            window.location.href = `single.html`;
        });
}


function deletePost(id) {
    fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            postBox = postBox.filter(post => post.id !== id);
            console.log(postBox);
            let postHolder = " ";
            postBox.forEach((post) => {
                postHolder += `
                    <div class="col-md-4 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <p>${post.id}</p>
                                <h6 id="post-title">${post.title}</h6>
                                <p id="post-body">
                                    ${post.body}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary rounded-3"onclick=updatePost(${post.id})>Update</button>
                                    <button class="btn btn-danger rounded-3"onclick=deletePost(${post.id})>Delete</button>
                                    <button class="btn btn-success rounded-3"onclick=openSingle(${post.id})>View</button>
                                </div>
                            </div>
                        </div>
                    </div>
                
                
                
                `;
            });
            postWrapper.innerHTML = postHolder;
        })
}