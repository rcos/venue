// @flow
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var sharp = require('sharp');
import async from 'async';

/**
 * Save image to disk (or move to place on disk).
 */
export function saveImage(file: {originalname: string, path: string},
                          uploadPath: string,
                          cb: Function): string {
  var extension = path.extname(file.originalname);
  var ext = extension.substring(1).toLowerCase();

  if (ext !== 'jpeg' && ext !== 'jpg' && ext !== 'png' && ext !== 'tiff' && ext !== 'gif' && ext !== 'webp'  && ext !== 'svg' ){
    cb("Invalid extension");
    return "";
  }
  var name = file.originalname.substring(0,file.originalname.length-extension.length);

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
