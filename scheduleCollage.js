const form = document.getElementById('scheduleInput')

// when the form is submitted
form.addEventListener('submit', (event) => {
  
  console.log( 'submit form listener');

  // TODO validation

  // TODO not valid: 
  // event.preventDefault();

  handleFiles();

}); 
// https://www.javascripttutorial.net/javascript-dom/javascript-form/


// removes all files 
// right now just in the html?
// TODO ideally add remove one file instead of all
form.addEventListener('reset', (ev) => {
  console.log( 'reset form listener');
  form.reset();
}); 


// walks through what to do with the files
function handleFiles() {
  console.log('start handle files');

  const allAssign = []; // array for all the assignments
  const input = document.querySelector('input[type="file"]').files;
   
  // read each file and add contents to list
  if (input) {
    let filecontents = null;
    for (let element = 0; element < form.elements.length; element++) {
      console.log("file ", element);

      const file = input[element]; // https://masteringjs.io/tutorials/fundamentals/upload-file 

      console.log("allAssign: " + allAssign);
      filecontents = csvtoarray( file);
      console.log("filecontents: " + filecontents);
      allAssign.push( filecontents);
      console.log("allAssign just added: "+ allAssign);
    }
  }

  // TODO id date and assignment
  
  // TODO sort
  
  // display the array in a table
  /*if (allAssign == null) {
    console.log( "null array");
    } else { displayarray( allAssign); }*/

}


// takes a csvfile and turns it into an array
function csvtoarray( csvfile) {
    console.log('csv reader');
    
    // instantiate new Filereader
    var reader = new FileReader(); 
    // causes error because it's not an object
    reader.readAsText( csvfile); // read file
    var array;
    
    reader.onload = function( e) {
        console.log('onload');
        
        array = reader.result;
        console.log( "array: ", array); // https://stackoverflow.com/questions/13729301/html5-file-api-how-to-see-the-result-of-readastext
        return process( array);
        //return array;
        //displayarray(array);
    };
    reader.onerror = function (error) {
      console.log( 'error: ' + csvfile);
    };
    /*form.onchange = function (e) {
        console.log('onchange');
        reader.readAsText(csvfile);
    
    };*/
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
    //console.log("hi2");
    return process( array);
}


// split into array
function process( csvin) {
  let rows = csvin.split( "\n");
  const array = [];

  // for every row
  for (let r = 0; r < rows.length; r++) { 
    let words = rows[r].split( ","); // split the row
    array.push(words); // add to the new array
  }

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


function displayarray( words) {
    console.log("begin display array function");
    
    console.log( "data:" + words)

    //let data = csvtoarray( document.getElementById(schedule1csv))
    let table = '';
    //let data = schedule;

    //let row = '';
    //row = '<tr>';
    //for (col in range( length (data[0]))) {
    //    row = row + '<th>';
    //    let text = data[0][col];
    //    row = row + '</th>';
    //}
    //row = row + '</tr>'

    let row = '';

    // TODO also create 2-d arrays with the newline character

    console.log("words: ", words);

    for (i=0; i<words.length; i++) {
        console.log( "row: ", i);
        row = '<tr>';

        for (cell=0; cell<words[i].length; cell++) {
            cl = '<td>' + words[i] + '<td>';
            row = row + cl;
        }
        row = row + '</tr>'
        table = table + row;
        console.log( row);
    }
    console.log(row);
    document.getElementById("all-class-schedule").innerHTML = table;
    console.log("Displayed array");


}


//const submit_button = document.getElementById('Submit')
//submit_button.addEventListener('click', displayarray());
/*
const $input = document.querySelector('#file');
  $input.addEventListener('change', event => {
    const data = new FormData();
    data.append('file', event.target.files[0]);
    fetch('/upload', {
      method: 'post',
      body: data
    }).then(res => res.text()).then(res => {
      const log = document.createElement('p');
      log.innerHTML = res;
      document.body.appendChild(log);
    })
  }) //https://javascript.plainenglish.io/how-to-upload-file-from-a-webpage-e3e9fa727d73
*/
/* function csvtoarray( csvfile) {
    let reader = new FileReader();
    reader.readAsText(csvfile);
    let array = reader.result;
    return array
}

function displayarray( ) {
    alert("begin display array function");

    let data = csvtoarray( document.getElementById(schedule1csv))
    let table = '';
    //let data = schedule;

    //let row = '';
    //row = '<tr>';
    //for (col in range( length (data[0]))) {
    //    row = row + '<th>';
    //    let text = data[0][col];
    //    row = row + '</th>';
    //}
    //row = row + '</tr>'

    let row = '';

    for (i=0; i<data.length; i++) {
        row = '<tr>';

        for (cell=0; cell<data[i].length; cell++) {
            cl = '<td>' + str(data[i]) + '<td>';
            row = row + cl;
        }
        row = row + '</tr>'
    }

    document.getElementByID('assignments').innerHTML = table;

}

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps
const submit_button = document.getElementById('Submit')
submit_button.addEventListener('click', displayarray());

//function arraytocsv( array, csvoutputname) {
    
//}

function concatSchedule( arrays) {
    const schedule = [];
    function myconcat( array) {
        schedule.concat( array.shift());
    }
    arrays.forEach( myconcat);
    schedule.sort();
    return schedule
}

function initialSchedule() {
    console.log('main function entered')
    let classschedule1 = document.getElementById('schedule1csv').files[0];
    let classschedule2 = document.getElementById('schedule2csv').files[0];
    
    console.log('got items')

    const schedule1 = csvtoarray( classschedule1);
    const schedule2 = csvtoarray( classschedule2);
    console.log( 'converred csv to arrays');
    const schedules = [schedule1, schedule2];
    const schedule = concatSchedule( schedules, "overallSchedule.csv");
    console.log('sorted events')
    displayarray( schedule);
}

function overdue( schedule) {
// use dates
}

function thisWeek( schedule) {

} */