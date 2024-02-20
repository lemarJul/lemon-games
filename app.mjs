import express from "express";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import morgan from "morgan";

const app = express();

app.set("view engine", "ejs");
app.set("views", "public");
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  redirect("public/index.html");
});

// app.get("/games/:gameName/views", (req, res) => {
//   const gameName = req.params.gameName;
//   const viewsDir = path.join("public/", gameName, "/views");

//   return fs.readdir(viewsDir, (error, files) => {
//     if (error) {
//       return res
//         .status(404)
//         .json({ message: "Failed to read views directory", error });
//     }

//     const views = {};
//     files.forEach((file) => {
//       if (path.extname(file) === ".html") {
//         const filePath = path.join(viewsDir, file);
//         const fileContent = fs.readFileSync(filePath, "utf8");
//         views[file] = fileContent;
//       }
//     });

//     res.json(views);
//   });
// });

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
