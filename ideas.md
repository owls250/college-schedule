# implementation schedule of virtual assistant

## guts
- search first row for dates, readings, assignments
- use first rows to confirm
- if inside cells say "due" with a date put that assignment there
- for each day list all of the assignments due then by class, type

## big questions
- how much to use NLP or ML?

## input
*in order from least to most difficult*
- csvs
- pdf
- links to syllabus location (up to date)

## output
*in order from least to most difficult*
- html table
    - week, date, readings, assignments, **big assignments**
- stability
- csv table/ website
- this week/tomorrow

### links
- preserve links
- by type of assignments in a class ex readings are here 
- search library for books

## Goals

### UI
- anyone can use
- for any class
- accessibility (easy to read if dyslexia, screen reader compatible, more?)
- open code for computer savy people to use

### Other
- privacy -- can all be done on your computer or your storage

## additional functionality
- what should I be doing?/ to-do
    - to-do updates each session (optional Cloud storage/ phone app)
    - time based on type of assignment: reading assignments 1-2 days ahead of time
    - weigh assignment by type ex exam more than reading (look at syllabus?)
- connect to [Google Calendar API](https://developers.google.com/calendar/api)
    - add tasks
    - upload schedule
    - download schedule