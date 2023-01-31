
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/'+file.fieldname)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = req.body.nombre+"_"+req.body.apellidos+ '-' + Date.now() +'.png'
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
const upload = multer({ storage })

module.exports = upload