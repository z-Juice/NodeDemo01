'use strict';

const fs = require('fs');

let demoController = module.exports;

demoController.getdemo = (req, res) => {
    
//  fs.readFile('./views/demo/form.html', 'utf8', (err, data) => {
//      if (err) {
//          console.log(err);
//          return;
//      };
//      console.log(err);
//      res.send(data);
//  })
    
    res.render('../views/demo/form.html');
    
}

demoController.process_get = (req, res) => {
    
    let response = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    };
    res.end(JSON.stringify(response));
    
}

demoController.process_post = (req, res) => {
    
    let response = {
        "first_name": req.body.first_name,
        "last_name": req.body.last_name
    };
    res.end(JSON.stringify(response));
    
}

demoController.file_upload = (req, res) => {
    
    console.log(req.files[0]);
    
    let dir = __dirname.slice(0, __dirname.length - 11);
    
    let des_file = dir + req.files[0].originalname;
    
    let response;
    
    fs.readFile( req.files[0].path, (err, data) => {
        fs.writeFile(des_file, data, (err) => {
            if(err){
                console.log(err);
            }else{
                response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                }
            }
            console.log(response);
            res.end(JSON.stringify(response));
        })
    })
    
}
