import { Category } from "./category";

class Location {
    x:number
    y:number
}

class Coordinate {
    city:String
    loc:Location
}


export class Sound {
    _id:number
    categories:Array<Category>
    coordinate:Coordinate
    description:String
    quality:String
    sound:String
    user:String
}