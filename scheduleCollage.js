const form = document.getElementById('scheduleInput')


// walks through what to do with the files
async function handleFiles() {
  console.log('start handle files');

  const allAssignments = []; // array for all the assignments
  const input = document.getElementById('schedule_csv').files;
   
  // read each file and add contents to allAssign
  if (input.length > 0) {
    for (let element = 0; element < input.length; element++) {
      console.log("file ", element);

      const file = input[element]; // https://masteringjs.io/tutorials/fundamentals/upload-file 

      let filecontents = await csvtoarray( file);
      console.log(filecontents)
      allAssignments.push(...filecontents);
      console.log("allAssign just added: "+ allAssignments);
    }
  }

  // TODO sort
  allAssignments = array_sort_date( allAssignments);
  
  // display the array in a table
  displayarray( allAssignments);
  //if (allAssign != null) {
  //  console.log( "null array");
  //  } else { displayarray( allAssign); }

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
    /*form.onchange = function (e) {
        console.log('onchange');
        reader.readAsText(csvfile);
    
    };*/
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
    array.push(words); // add to the new array
  }

  // TODO rearrange columns as necessary

  // remove label row (first row)
  array.shift();

  console.log("array: ", array);
  return array
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


function array_sort_date(array) {
  
}


function displayarray( words) {
    console.log("begin display array function");
    
    console.log( "data:" + words)

    let table = '<table id="all-class-schedule"><thead><tr><th>Date</th><th>Readings</th><th>Assignments</th></tr></thead><tbody id="assignments">';

    // TODO also create 2-d arrays with the newline character

    console.log("words: ", words);

    for (let i=0; i<words.length; i++) {
      //console.log( "row: ", i);
      let row = '<tr>';

      for (cell=0; cell<words[i].length; cell++) {
        cl = '<td>' + words[i][cell] + '</td>';
        row = row + cl;
      }
      row = row + '</tr>';
      table = table + row;
      //console.log( row);
    }
    table += '</tbody></table>';
    console.log(table)
    document.getElementById("all-class-schedule").innerHTML = table;
    console.log("Displayed array");


}

