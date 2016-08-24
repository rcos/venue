var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var sharp = require('sharp');
import async from 'async';

// Save image to disk here
// accepted formats are JPEG, PNG, WebP, GIF, SVG, TIFF
// Save to jpeg

exports.saveImage = function (file, uploadPath, cb) {
  var extension = path.extname(file.originalFilename);
  var ext = extension.substring(1).toLowerCase();

  if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png' && ext !== 'tiff' && ext !== 'gif' && ext !== 'webp'  && ext !== 'svg' ){
    cb("Invalid extension");
    return "";
  }
  var name = file.originalFilename.substring(0,file.originalFilename.length-extension.length);

  name = name+ '-' + Date.now();

  var previewPath = uploadPath + name + "-preview" + ".jpeg";
  var destPath = uploadPath + name + ".jpeg";
  var largePath = uploadPath + name + "-large" + ".jpeg";


  fs.exists(uploadPath, (exists) => {

    if (!exists){
      mkdirp.sync(uploadPath);
    }

    fs.exists(file.path, (exists) => {
      if (!exists){
        cb("Invalid file");
        return "";
      }
      var asyncTasks = [];

      var pipeline = sharp(file.path);

      asyncTasks.push( (callback) => {
        pipeline.clone().resize(330, 330).max().toFile(previewPath,function(err){
          callback(err);
        });
      });
      asyncTasks.push( (callback) => {
        pipeline.clone().resize(800, 800).max().toFile(destPath,function(err){
          callback(err);
        });
      });
      asyncTasks.push( (callback) => {
        pipeline.clone().resize(1200, 1200).max().toFile(largePath,function(err){
          callback(err);
        });
      });

      async.parallel(asyncTasks, (error, results) => {
        // TODO: Handle Error
        if (error){
          cb("Upload not successfull");
        }
        else{
          cb();
        }
      });
    });
  });

  return name + ".jpeg";
}
