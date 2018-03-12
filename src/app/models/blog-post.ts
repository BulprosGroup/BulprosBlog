import { IBlogPost } from "./contracts/blog-post";

export class BlogPost implements IBlogPost {
    author: string;
    content: string;
    datePublished: Date;
    dateModified: Date;
}
