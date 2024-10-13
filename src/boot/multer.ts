import {join} from "path";
import multer from "multer";
import { Application } from "express";

const fileStorage = multer.diskStorage({
  destination(req, file, callback) {
    if(file.fieldname === 'gallery'){
      callback(null, join(process.cwd(), 'public', 'post-images'))
    }else if(file.fieldname === 'avatar'){
      callback(null, join(process.cwd(), 'public', 'avatars'))
    }
  },
  filename(req, file, callback) {
    const fileFormat = file.originalname.split('.')
    const fileExtension = fileFormat[fileFormat.length - 1];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    callback(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension)
  },
})

function fileFilter (req: any, file: any, cb: any) {
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    // To accept the file pass `true`, like so:
    cb(null, true)
  }else{
    // To reject this file pass `false`, like so:
    cb(null, false)
  }
}

function uploadFile(app: Application){
  app.use(multer({storage: fileStorage, fileFilter: fileFilter}).fields([
    {name: 'gallery', maxCount: 5},
    {name: 'avatar', maxCount: 1}
  ]))
}

export {
  uploadFile
}