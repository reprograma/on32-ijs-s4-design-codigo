export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  cpf: string;
  userType: 'customer' | 'manager' | 'admin';
  superPassword?: string;
}

export class UpdateUserDto {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  userType: 'customer' | 'manager' | 'admin';
  superPassword?: string;
}
