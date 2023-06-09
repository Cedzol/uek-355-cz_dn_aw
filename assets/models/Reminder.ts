import {RepetitionType} from "./Enums";
import {Time} from "./Time";

export interface Reminder {
    title : string,
    details : string,
    time : Time,
    repetition : RepetitionType // unique, hourly, daily, weekly
    specificUniqueDate? : Date // if unique repetition, what Date?
    daysOfWeek? : number[], // if weekly repetition, on which days of week
    nextReminderExecution : Date
}

// days of week
// Monday = 0
// Tuesday = 1
// Wednesday = 2
// Thursday = 3
// Friday = 4
// Saturday = 5
// Sunday = 6
