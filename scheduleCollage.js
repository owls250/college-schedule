// when the first form is changed
//const form  = document.querySelector('#scheduleInput');
const form = document.getElementById('scheduleInput')
form.addEventListener('submit', (event) => {
  console.log( 'submit form listener');
  // validation

  // not valid: 
  //event.preventDefault();

  handleFiles();

}); // https://www.javascripttutorial.net/javascript-dom/javascript-form/

// right now just in the html
/* form.addEventListener('reset', (ev) => {
  console.log( 'reset form listener');
  form.reset();
}); */


function handleFiles() {
  console.log('start handle files');

  const allAssign = []; // all assignments

  console.log('form elements' + form.elements);
  console.log( 'form element 1: ' + form[1].value);
  console.log('form length: ' + form.elements.length);
  
  // read each file and add contents to list
  for (let element = 0; element < form.elements.length; element++) {
    console.log("file ", element);
    const [file] = csvtoarray( form[element].value);
    
    allAssign.push( file);
  
  }
  // can't do for in with just a number, must be a list
  
  // sort
  
  if (allAssign == null) {
    console.log( "null array");
    } else { displayarray( allAssign); }

  
}

function csvtoarray( csvfile) {
    console.log('csv reader');

    console.log('type: '+typeof(csvfile))
    console.log( csvfile[0] instanceof Blob)
    
    const reader = new FileReader(); 
    reader.readAsText( csvfile);
    
    reader.onload = function( e) {
        console.log('onload');
        
        var array = reader.result;
        console.log( "array: ", array); // https://stackoverflow.com/questions/13729301/html5-file-api-how-to-see-the-result-of-readastext
        return array
    };
    reader.onerror = function (error) {
      console.log( 'error: ' + csvfile);
    };
    form.onchange = function (e) {
        console.log('onchange');
        reader.readAsText(csvfile);
    
    };
    // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsText
    

}


function displayarray( data) {
    console.log("begin display array function");
    console.log( "data:" + data)

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

    for (i=0; i<data.length; i++) {
        console.log( "row: ", i);
        row = '<tr>';

        for (cell=0; cell<data[i].length; cell++) {
            cl = '<td>' + str(data[i]) + '<td>';
            row = row + cl;
        }
        row = row + '</tr>'
        table = table + row;
        console.log( row);
    }
    console.log(row);
    console.log("Displayed array");
    //console.log(document.getElementByID("all-class-schedule").innerhtml)
    //document.getElementByID("all-class-schedule").innerhtml = table;

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