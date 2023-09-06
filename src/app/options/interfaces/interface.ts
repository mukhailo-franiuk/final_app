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
    imagePath : string,
    date : string
}
export interface CategoryResponce extends CategoryRequest {
id : number
}

// =====================================================

export interface ProductRequest {
    category: CategoryResponce;
    name: string;
    path: string;
    ingredients: string;
    weight: string;
    price: string;
    imagePath: string;
}

export interface ProductResponse extends ProductRequest {
    id: number;
}