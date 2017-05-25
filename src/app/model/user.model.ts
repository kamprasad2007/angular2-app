export class User{
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public mobile?: number,
    public isActive: boolean = true,
    public id?: number
  ){ }
}
