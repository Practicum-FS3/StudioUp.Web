export interface LeumitCommitments {
      id :string,
      commitmentTypeId: number,
      customerId :number,
      commitmentTz:string  ,
      birthDate:string ,
      fileUploadId: number|null,
      validity:string,
      isActive:boolean
}
