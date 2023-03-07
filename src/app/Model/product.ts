export class Product {

    constructor(public id: number,
        public sku: string,
        public name: string,
        public description: string,
        public unit_price: number,
        public image_url: string,
        public active: boolean,
        public stock_units: number,
        public dateCreated: Date,
        public lastUpdated?: any){
            
        }

    
}
