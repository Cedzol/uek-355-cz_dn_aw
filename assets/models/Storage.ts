import {Reminder} from "./Reminder";
import {Time} from "./Time";
import {RepetitionType} from "./Enums";
import {v4 as uuidv4} from 'uuid';

export interface Storage {
    id : uuidv4, //https://www.uuidgenerator.net/dev-corner/typescript
    Reminder: Reminder
}