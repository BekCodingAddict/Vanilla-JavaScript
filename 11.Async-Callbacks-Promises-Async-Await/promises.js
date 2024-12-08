const posts = [
  { title: "Past One", body: "This is post one" },
  { title: "Past two", body: "This is post two" },
];

function getPosts() {
  setTimeout(() => {
    let output = "";
    posts.forEach((post, index) => {
      output += `<li>${post.title}</li>`;
    });
    document.body.innerHTML = output;
  }, 1000);
}

function createPost(post) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      posts.push(post);
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error:Somthing was wrong!");
      }
    }, 2000);
  });
}

// createPost({ title: "Post 3", body: "This is tree post" }).then(getPosts);

//Async Await
// async function init() {
//   await createPost({ title: "Post 3", body: "This is tree post" });
//   getPosts();
// }
// init();

//aysnc await fetch
async function fetchUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
}
fetchUsers();
//Promise.all
// const promise1 = Promise.resolve("Hello 1");
// const promise2 = Promise.resolve("Hello 2");
// const promise3 = new Promise((resolve, rejects) => {
//   setTimeout(resolve, 2000, "Goodbye");
// });

// Promise.all([promise1, promise2, promise3]).then((val) => console.log(val));
