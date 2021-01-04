export class Recipe {

    constructor(
        
        public title: string,
        public description: string,
        public image: string,
        public rating ?: number,
        public preparation_time ?: string,
        public baking_time ?: string,
        public created ?: string,
        public level ?: number,
        public steps ?: Array<{
            order: number,
            content: string,
        }>,
        public ingredients?: string,
        public reviews?: [],
        public id ?: number,
    ){}
}
