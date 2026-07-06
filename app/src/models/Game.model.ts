export class Game {
    constructor(
        public id: number, 
        public title: string, 
        public releaseDate: Date, 
        public director: string, 
        public studioId: number) 
        {
        this.id = id,
        this.title = title,
        this.releaseDate = releaseDate,
        this.director = director,
        this.studioId = studioId
    }
}
