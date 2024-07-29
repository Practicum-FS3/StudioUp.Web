export class Hmos {
    ID: number;
    title: string;
    isActive: boolean;
    arrangementName: string;
    maximumAge: number;
    minimumAge: number;
    trainingDescription: string;
    trainingPrice: number;
    trainingsPerMonth: number;

    constructor(ID: number,
        title: string,
        isActive: boolean,
        arrangementName: string,
        maximumAge: number,
        minimumAge: number,
        trainingDescription: string,
        trainingPrice: number,
        trainingsPerMonth: number) {
        this.ID = ID;
        this.title = title;
        this.isActive = isActive;
        this.arrangementName = arrangementName;
        this.maximumAge = maximumAge;
        this.minimumAge = minimumAge;
        this.trainingDescription = trainingDescription;
        this.trainingPrice = trainingPrice;
        this.trainingsPerMonth = trainingsPerMonth;
    }

}