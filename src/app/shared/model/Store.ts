export class Store{
  constructor(data: any) {
    Object.assign(this, data);
  }

  public id: number | undefined;
  public address: string | undefined;
}
