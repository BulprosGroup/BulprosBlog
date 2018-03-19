import { UserInfo } from "../shared/user-info";

export class BlogPost {
    author: UserInfo;
    content: string;
    datePublished: Date;
    dateModified: Date;
    title: string;
}
