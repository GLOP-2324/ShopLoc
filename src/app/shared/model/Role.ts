export class Role{

  public role_id: number | undefined;
  public role_name: string | undefined;

  constructor(role_id: number, role_name: string) {
    this.role_id = role_id;
    this.role_name = role_name
  }
}
