export class Training {
    id: number;
    name: string;
    dayOfWeek: number;
    hour: TimeRanges;
    participantsCount: number;
  
    constructor(id: number, name: string, dayOfWeek: number, hour: TimeRanges, participantsCount: number) {
        this.id = id;
        this.name = name
        this.dayOfWeek = dayOfWeek;
        this.hour = hour;
        this.participantsCount = participantsCount;
    }
}  