import {RepetitionType} from "./Enums";
import {Time} from "./Time";

export interface Reminder {
    id: string,
    text : string,
    details : string,
    time : Time,
    repeatFrequency : RepetitionType // unique, hourly, daily, weekly
    uniqueDate? : Date // if unique repetition, what Date?
    daysOfWeek? : number[], // if weekly repetition, on which days of week
    nextReminderExecution? : Date
    repeating : string
}

// days of week
// Sunday = 1
// Monday = 2
// Tuesday = 3
// Wednesday = 4
// Thursday = 5
// Friday = 6
// Saturday = 7
