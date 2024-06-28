export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public cpf: string,
    public userType: 'customer' | 'manager' | 'admin',
    public id?: string,
    public employeeCode?: string,
    public superPassword?: string,
  ) {}
}
