export interface usuario
{
    id: number | null;
    name : string,
    lastName : string,
    dateOfBirth : Date,
    gender : string,
    email : string,
    password : string,
    role : string,
    isDisable : boolean;

}