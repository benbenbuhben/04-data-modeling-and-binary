'use strict';

const fs = require('fs');
const os = require('os');



const filePath = process.argv[2];
const transformedFilePath = process.argv[3];
const transformMethod = process.argv[4];

// const buffer = fs.readFileSync(`${__dirname}/bitmap.bmp`);
const buffer = fs.readFileSync(filePath);

console.log(buffer);



const parsedBitmap = {};
const FILE_SIZE_OFFSET = 2;
const WIDTH_OFFSET = 18;
const HEIGHT_OFFSET = 22;
const NUM_COLORS_OFFSET = 46;
const COLOR_TABLE_OFFSET = 54;
const BYTES_PER_PIXE_OFFSET = 28;
const PIXEL_ARRAY_OFFSET = 1024 + 54;

//------------------------------------------------------
// READING INFORMATION FROM THE BITMAP FILE
//------------------------------------------------------
parsedBitmap.type = buffer.toString('utf-8', 0, 2);
parsedBitmap.fileSize = buffer.readInt32LE(FILE_SIZE_OFFSET);
parsedBitmap.bytesPerPixel = buffer.readInt16LE(BYTES_PER_PIXE_OFFSET);
parsedBitmap.height = buffer.readInt32LE(HEIGHT_OFFSET);
parsedBitmap.width = buffer.readInt32LE(WIDTH_OFFSET);
parsedBitmap.numColors = buffer.readInt32LE(NUM_COLORS_OFFSET);
let COLOR_TABLE_SIZE = parsedBitmap.numColors * 4;
parsedBitmap.colorTable = buffer.slice(COLOR_TABLE_OFFSET, COLOR_TABLE_OFFSET + COLOR_TABLE_SIZE);
parsedBitmap.pixelArray = buffer.slice(COLOR_TABLE_OFFSET + COLOR_TABLE_SIZE, 10000);
// parsedBitmap.pixelArray = console.log(parsedBitmap.colorTable.length);
console.log(parsedBitmap.colorTable.length);

for(var i = 0; i < parsedBitmap.colorTable.length; i++){
  if(parsedBitmap.colorTable[i] > 0) {
    parsedBitmap.colorTable[i] = 155;
  }
}

console.log(parsedBitmap.colorTable)

for(var i = 0; i < parsedBitmap.colorTable.length; i++){
  buffer[54+i] = parsedBitmap.colorTable[i];
}




parsedBitmap;



fs.writeFile(transformedFilePath, buffer);