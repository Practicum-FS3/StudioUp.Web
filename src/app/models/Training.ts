

export interface Training {
    id: number,
    trainingTypeID: number,
    // trainingType: TrainingTypeDTO,
    trainerID: number,
    customerTypeID:number,
    // customerType:CustomerTypeDTO,
    dayOfWeek: number,
    hour: TimeOnly,
    participantsCount: number
    isActive: boolean

}
export interface TimeOnly {
    hour: number,
    minute: number,
}

export interface TrainingTypeDTO {
    id: number,
    title: string,
    isActive: boolean
}
export interface CustomerTypeDTO {
    id: number,
    title: string,
    isActive: boolean

}






