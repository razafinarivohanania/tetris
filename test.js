'use strict';

const removedLines = [];
removedLines.push(1);
removedLines.push(2);
removedLines.push(3);
removedLines.sort((line1, line2) => line2 - line1);
console.log(removedLines);