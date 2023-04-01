import sys

# actually not python because not everyone has it

def main():
    class_schedules_file = sys[1]
    overall_schedule_file = sys[2]

    data = readin( class_schedules_file)
    overall_schedule_file = sort( data)
    scheduletocsv( overall_schedule_file)

main()