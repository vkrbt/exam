import { Count, Filter, Where } from '@loopback/repository';
import { Post } from '../models';
import { PostRepository } from '../repositories';
export declare class PostController {
    postRepository: PostRepository;
    constructor(postRepository: PostRepository);
    create(post: Post): Promise<Post>;
    count(where?: Where): Promise<Count>;
    find(filter?: Filter): Promise<Post[]>;
    findActivePosts(): Promise<Post[]>;
    findById(id: string): Promise<Post>;
    updateById(id: string, post: Post): Promise<void>;
    deleteById(id: string): Promise<void>;
}
