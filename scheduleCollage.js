const form = document.getElementById('scheduleInput')

// walks through what to do with the files
async function handleFiles() {
  console.log('start handle files');

  const allAssignments = []; // array for all the assignments
  const input = document.getElementById('schedule_csv').files;
   
  // read each file and add contents to allAssign
  if (input.length > 0) {

    for (let element = 0; element < input.length; element++) {
      const file = input[element]; // https://masteringjs.io/tutorials/fundamentals/upload-file 

      let filecontents = await csvtoarray( file);
      allAssignments.push(...filecontents);
    }
  }

  // TODO sort
  const sorted_assignments = array_sort_date( allAssignments);
  
  // display the array in a table
  displayarray( sorted_assignments);

}


// takes a csvfile and turns it into an array
async function csvtoarray( csvfile) {
    console.log('csv reader');
    
    // causes error because it's not an object
    
    var array;
    const file_reader_promise = new Promise(( resolve, reject) => {
      
      const reader = new FileReader(); // instantiate new Filereader

      reader.onload = e => {
        resolve(process(reader.result));
        // https://stackoverflow.com/questions/13729301/html5-file-api-how-to-see-the-result-of-readastext
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsText( csvfile); // read file
    });  
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

    return await file_reader_promise;
}


// split into array
function process( csvin) {
  let rows = csvin.split( "\n");
  const array = [];

  // for every row
  for (let r = 0; r < rows.length; r++) { 
    if (rows[r] === "") {
      continue;
    }
    let words = rows[r].split( ","); // split the row
    // add class
    array.push(words); // add to the new array
  }

  // TODO rearrange columns as necessary

  // remove label row (first row)
  array.shift();

  return array;
}


// takes 2-d array and outputs csv file
function arraytocsv( array, filename) {

  var csvfile = new Blob( array, {type: 'text/csv'});
  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(csvfile, filename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(csvfile);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  }
  // https://gist.github.com/dhunmoon/d743b327c673b589e7acfcbc5633ff4b
}


// test function
function testdisplay(array) {
  document.getElementById("tble").innerHTML = array;
}


// sorts an array by date if date is in the first column
function array_sort_date( array) {
  // determine date format
  // mm/dd or dd/mm or mm/dd/yyyy or dd/mm/yyyy

  // turn into date format
  for (let i=0; i<array.length; i++) {
    array[i][0] = new Date(array[i][0]);
  } 

  // sort
  array.sort(function(a,b){return a[0] - b[0]});
  // https://www.w3schools.com/js/js_array_sort.asp

  // put date in smaller format

  console.log(array);

  return array;
}


function displayarray( words) {
    console.log("begin display array function");

    let table = '<table id="all-class-schedule"><thead><tr><th>Date</th><th>Readings</th><th>Assignments</th></tr></thead><tbody id="assignments">';

    for (let i=0; i<words.length; i++) {
      let row = '<tr>';

      for (cell=0; cell<words[i].length; cell++) {
        cl = '<td>' + words[i][cell] + '</td>';
        row = row + cl;
      }

      row = row + '</tr>';
      table = table + row;
    }

    table += '</tbody></table>';
    
    document.getElementById("all-class-schedule").innerHTML = table;
    console.log("Displayed array");


}

