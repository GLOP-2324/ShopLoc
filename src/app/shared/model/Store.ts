export class Store{
  constructor(data: any) {
    Object.assign(this, data);
  }

  public id: number | undefined;
  public address: string | undefined;
  public name: string | undefined;
  public image: string | undefined;
  public isFavorite: boolean | undefined;
}
