import {Type} from "@angular/core";
import {Store} from "./Store";

export class Product{
  public id: number | undefined;
  public libelle: string | undefined;
  public price: number | undefined;
  public description: string | undefined;
  public image:string | undefined;
  // @ts-ignore
  public type:Type | undefined;
  public store:Store | undefined
  public points: number | undefined
  public benefitsActivated : boolean | undefined
  public quantity : number | undefined
  public stock : number | undefined
}
