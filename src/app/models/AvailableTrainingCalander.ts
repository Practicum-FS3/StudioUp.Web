
export interface AvailableTraining {
    id: number,
    trainingId: number,
    trainerName: string,
    date:Date,
    // DateOnly
    dayOfWeek: number,
    time: string,
    customerTypeName:string,
    trainingTypeName:string,
    participantsCount:number,
    isActive: boolean,
    attended: boolean,
    isRegistered:boolean
}









