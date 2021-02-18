const fs = require('fs')
const path = require('path')

const dirname1800 = __dirname + '/1800';
const dirname2000 = __dirname + '/2000';

// Перекидає пацанів
function moveToBoy() {
    fs.readdir(dirname1800,(err, files) => {
        if (err) {
            console.log(err)
            return;
        }
        files.forEach(value => {
            const filePath = path.join(dirname1800, value);
            fs.readFile(filePath,(err1, data) => {
                if (err1) {
                    console.log(err1)
                    return;
                }
                let user = JSON.parse(data.toString());
                if(user.gender === 'male'){
                    fs.rename(`${dirname1800}/${value}`, `${dirname2000}/${value}`, err2 => {
                        if (err2) {
                            console.log(err2)
                        }
                    })
                }
            });
        })
    })
}

moveToBoy()

//Перекидає дівчат
function moveToGirl() {
    fs.readdir(dirname2000, (err, files) => {
        if (err) {
            console.log(err)
            return;
        }
        files.forEach(value => {
            const filePath = path.join(dirname2000, value);
            fs.readFile(filePath, (err1, data) => {
                if (err1) {
                    console.log(err1)
                    return;
                }
                let user = JSON.parse(data.toString());
                if (user.gender === 'female') {
                    fs.rename(`${dirname2000}/${value}`, `${dirname1800}/${value}`, err2 => {
                        if (err2) {
                            console.log(err2)
                        }
                    })
                }
            });
        })
    })
}
moveToGirl()
