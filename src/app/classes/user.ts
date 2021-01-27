export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public description?: string,
        public isLoggedIn?: boolean,
        public photoUrl ?: string,
        public token ?: string,
    ) { }
}