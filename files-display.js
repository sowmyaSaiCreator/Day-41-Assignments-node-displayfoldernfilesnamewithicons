const { time } = require("console");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path")
const folderPath = 'C:/Users/Welcome/Downloads';
//const folderPath = 'C:/Users/Welcome/Downloads/B-21';

var fileData = `current time stamp is ${new Date().toLocaleString()}`;

fs.writeFile(path.join(folderPath,'date-time.txt'), fileData, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});

fs.readdir(folderPath, { withFileTypes: true }, function (err, files) {
    var finalHtml = "<div><h1 style='text-align:center;'>Display files from the local system</h1>";
    if (err) throw err;
    files.forEach(item => {
        if (item.isDirectory()) {
            var imgPath = 'public/images/folder.png';
        }
        else if (item.isFile()) {
            var pathname = path.extname(item.name);
            // console.log(pathname);
            if (pathname == ".txt") {
                imgPath = "public/images/text.png";
            }
            if (pathname == ".jpeg" || pathname == ".jpg" || pathname == ".png") {
                var imgPath = "public/images/image.png";
            }
            else if (pathname == ".pdf") {
                var imgPath = "public/images/pdf.png";
            }
            else if (pathname == ".xlsx") {
                var imgPath = "public/images/spreadsheet.png";
            }
            else if (pathname == ".mp3") {
                var imgPath = "public/images/mp3.png";
            }
            else if (pathname == ".mp4" || pathname == ".wmv") {
                var imgPath = "public/images/video.png";
            }
            else if (pathname == ".docx") {
                var imgPath = "public/images/word.png";
            }
            else if (pathname == ".html") {
                var imgPath = "public/images/html.png";
            }
            else if (pathname == ".css") {
                var imgPath = "public/images/word.png";
            }
            else if (pathname == ".js") {
                var imgPath = "public/images/word.png";
            }
        }
        if (imgPath) {
            fs.readFile(imgPath, function (err, data) {
                if (err) throw err; // Fail if the file can't be read.
                finalHtml += (`<div style="height: 71px; width:300px; display:inline-block;padding: 0.5rem;text-align:left;">
                                    <div style="border: 1px solid #dadce0;box-sizing: border-box;padding: 13px 16px;position: relative; width: 100%;font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif;">
                                    <div style="line-height: 20px;margin-left: 14px;padding-bottom: 4px; cursor: default;font-size: 13px;font-weight: 500;overflow: hidden; position: relative;white-space: nowrap;">
                                    <img style="height:20px;" src="data:image/png;base64,${Buffer.from(data).toString('base64')}"/>
                                    <span style="margin-left: 10px;display: inline-block;position: relative;top: -4px;">${item.name}</span>
                                    </div>
                                    </div>
                                    </div> `);
            });
        }
    });

    finalHtml += "</div>";

    app.get("/", function (req, res) {

        res.send(finalHtml);
    });

});

app.listen("3000", function () {
    console.log('server is running');
});