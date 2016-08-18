var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
var sharp = require('sharp');
import async from 'async';

// Save image to disk here
// accepted formats are JPEG, PNG, WebP, GIF, SVG, TIFF
// Save to jpeg

exports.getImage = function (originalName, filepath, size, res) {
  var name = originalName;
  if (size){
      var extension = path.extname(name);
      var id = name.substring(0,name.length-extension.length);

    if (size === 'preview'){
      name = id + "-preview" + extension;
    }
    else if (size === 'large'){
      name = id + "-large" + extension;
    }
  }

  let imgPath = path.join(filepath, name);

  var stats;
  try {
    // Query the entry
    stats = fs.lstatSync(imgPath);
    return res.sendFile(imgPath);
  }
  catch (e) {
    imgPath = path.join(filepath, originalName);
    try {
        // Query the entry
        stats = fs.lstatSync(imgPath);
        return res.sendFile(imgPath);
    }
    catch (e) {
      // File not found, send 404
      return res.json(404);
    }
  }

}
