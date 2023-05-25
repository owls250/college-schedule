// this file works with schedule.html to
// take in csv's with assignment details, sort the assignments, and then display (and possibly export to csv)
// Sophia Ungar with advice from Forrest


// TODO Tasks
// edit entries directly
// Google Calendar API to upload tasks or events
// Make it look pretty


// walks through what to do with the files from reading to exporting
async function handleFiles() {
  // console.log('start handle files');

  // initialize
  const allAssignments = []; // array for all the assignments
  const input = document.getElementById('schedule_csv').files;
   
  // read each file and add contents to allAssign
  if (input.length > 0) {

    for (let element = 0; element < input.length; element++) {
      const file = input[element]; // https://masteringjs.io/tutorials/fundamentals/upload-file 

      let filecontents = await csvToArray( file);
      allAssignments.push(...filecontents); // dot operator to avoid [2 3 [4 5]]
    }
  }

  // sort
  const sortedAssignments = arraySortByDate( allAssignments);
  
  // display the array in a table
  displayArray( sortedAssignments);

  // export
  arrayToCsv( allAssignments);

}


// takes a csvfile and turns it into an array
async function csvToArray( csvfile) {
    // console.log('csv reader');
    

    // TODO read xlsx files
    
    var array;
    const fileReaderPromise = new Promise(( resolve, reject) => {
      
      const reader = new FileReader(); // instantiate new Filereader

      reader.onload = e => {
        resolve(process(reader.result, csvfile.name.replace(".csv", "")));
        // https://stackoverflow.com/questions/13729301/html5-file-api-how-to-see-the-result-of-readastext
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsText( csvfile); // read file
    });  
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText

    
    return await fileReaderPromise;
}


// split into array
function process( csvin, name) {
  let rows = csvin.split( "\n");
  const array = [];

  // for every row
  for (let r = 0; r < rows.length; r++) { 
    if (rows[r] === "") { // skip if no data
      continue;
    }

    // separate into date, class, readings, assignments
    let words = rows[r].replace(",\r",""); // get rid of extra characters
    words = words.replace("\r", "");
    words = words.split( ","); // split the row
    wordZero = words[0]; // get the first word
    words.shift(); // everything but the first word

    array.push([wordZero, name, ...words]); // add to the new array
  }

  // TODO rearrange columns as necessary

  // remove label row (first row)
  array.shift();

  return array;
}


// takes 2-d array and outputs csv file
function arrayToCsv( array) {
  const filename = document.getElementById("schedule_output_name_csv").value

  if (array.length>0) {
    let file_contents = "";

    // headings
    file_contents = 'Date,Class,Readings,Assignments,\n';
    // should this be \n or \r\n?

    // comma separate contents
    for (let row=0; row<array.length; row++) {
      for (let col=0; col<array[row].length; col++) {
        file_contents += array[row][col] + ",";
      }
      file_contents += "\n"; // newline
    }

    // make file, name it, make link to download it
    const blob = new Blob([file_contents], { type: 'text/csv;charset=utf-8,' })
    const objUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', objUrl)
    link.setAttribute('download', filename+'.csv')
    link.textContent = 'Download csv of Schedule'

    document.querySelector('body').append(link)
  } // adapted from https://medium.com/@idorenyinudoh10/how-to-export-data-from-javascript-to-a-csv-file-955bdfc394a9
}


// test function
function testDisplay(array) {
  document.getElementById("tble").innerHTML = array;
}


// sorts an array by date if date is in the first column
function arraySortByDate( array) {
  // TODO determine date format
  // mm/dd or dd/mm or mm/dd/yyyy or dd/mm/yyyy

  // turn into date format
  for (let i=0; i<array.length; i++) {
    array[i][0] = new Date(array[i][0]);
  } 

  // sort
  array.sort(function(a,b){return a[0] - b[0]});
  // https://www.w3schools.com/js/js_array_sort.asp

  // console.log(array);

  return array;
}


function displayArray( words) {
    // console.log("begin display array function");

    // headings
    let table = '<table id="all-class-schedule"><thead><tr><th>Date</th><th>Class</th><th>Readings</th><th>Assignments</th></tr></thead><tbody id="assignments">';

    // assignments
    for (let i=0; i<words.length; i++) {
      let row = '<tr>'; // row

      // date
      row += '<td>' + words[i][0].toLocaleString() + '</td>'; // gets rid of time zone

      // everything else
      for (cell=1; cell<words[i].length; cell++) {
        cl = '<td>' + words[i][cell] + '</td>'; 
        row = row + cl;
      }

      row = row + '</tr>'; 
      table = table + row; // add row to table
    }

    table += '</tbody></table>';
    
    document.getElementById("all-class-schedule").innerHTML = table; // change html to table


}

