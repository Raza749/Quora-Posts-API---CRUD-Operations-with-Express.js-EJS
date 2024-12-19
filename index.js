const express = require("express");
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


let posts = [
    {
        id: uuidv4(),
        username: "razaali",
        content: "I Love JavaScript"
    },
    {
        id: uuidv4(),
        username: "danishali",
        content: "I Love editing"
    },
    {
        id: uuidv4(),
        username: "aliriaz",
        content: "I Love Business"
    },
];

app.get('/posts', (req, res) => {
    res.render("index", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("createNewpost.ejs");
});

app.post("/posts", (req, res) => {
    let id = uuidv4();
    const { username, content } = req.body;
    posts.push({ id, username, content });
    res.redirect('/posts');
});

app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("postDetail", { post });
});

app.patch("/posts/:id",(req,res)=>{
    const {id} = req.params;
    const newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    res.redirect('/posts');
});

app.get("/posts/:id/edit",(req,res)=>{
    const {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit",{post});
});

app.delete("/posts/:id/",(req,res)=>{
    const {id} = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
});



app.listen(PORT, () => {
    console.log("Server is running on the PORT: ", PORT);
});