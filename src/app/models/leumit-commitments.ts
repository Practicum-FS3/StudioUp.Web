export interface LeumitCommitments {
      id :string,
      commitmentTypeId: number,
      customerId :number,
      commitmentTz:string  ,
      birthDate:Date ,
      fileUploadId: number|null,
      validity:string,
      isActive:boolean
}
