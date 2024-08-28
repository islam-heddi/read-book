const path = require('path')
const fs = require('fs')

const move_this_profile_picture = (oldfile) => {
    let oldpath = oldfile.originalname
    const ext = path.extname(oldpath)
    if(ext != ".png" && ext != '.jpg' && ext != '.jpeg' && ext != '.bmp') return 2
    const filename = path.basename(oldpath,ext)
    var today = new Date()
    var year = today.getFullYear()
    var month = today.getMonth()
    month = (month < 10)? "0"+month : month
    var day = today.getDay()
    day = (day < 10)? "0"+day : day
    var hour = today.getHours()
    hour = (hour < 10)? "0"+hour:hour
    var minute = today.getMinutes()
    minute = (minute < 10)? "0"+minute:minute
    var second = today.getSeconds()
    second = (second < 10)? "0"+second:second
    const newpath = `./files/${filename}${year}${month}${day}${hour}${minute}${second}${ext}`
    fs.copyFile(oldfile.path,newpath,(err) => {
        if(err) return 0
    }) 
    return newpath
}

module.exports = {
    move_this_profile_picture
}