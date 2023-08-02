export interface SharedRequest{
    date:string,
    name : string,
    title : string,
    description : string,
    imagePath : string,
    path : string
}
export interface SharedResponse extends SharedRequest{
    id: number
}
// =============================================================
export interface CategoryRequest {
    name : string,
    path : string,
    imagePath : string
}
export interface CategoryResponce extends CategoryRequest {
id : number
}