export class BlogPost {
    id?: string;
    authorId: string;
    authorName: string;
    category: string;
    content: string;
    description: string;
    datePublished: Date;
    dateModified?: Date;
    title: string;
    status: 'published' | 'draft' | 'deleted' | null;
}
