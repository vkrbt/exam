import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {Post} from '../models';
import {PostRepository} from '../repositories';
import {filterXSS} from 'xss';

export class PostController {
  constructor(
    @repository(PostRepository)
    public postRepository : PostRepository,
  ) {}

  @post('/posts', {
    responses: {
      '200': {
        description: 'Post model instance',
        content: {'application/json': {'x-ts-type': Post}},
      },
    },
  })
  async create(@requestBody() post: Post): Promise<Post> {
    let clean = filterXSS(post.body);
    console.log(post.body);
    console.log(clean);
    post.body = clean;

    return await this.postRepository.create(post);
  }

  @get('/posts/count', {
    responses: {
      '200': {
        description: 'Post model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Post)) where?: Where,
  ): Promise<Count> {
    return await this.postRepository.count(where);
  }

  @get('/posts', {
    responses: {
      '200': {
        description: 'Array of Post model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Post}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Post)) filter?: Filter,
  ): Promise<Post[]> {
    return await this.postRepository.find(filter);
  }

  @get('/posts/active', {
    responses: {
      '200': {
        description: 'Array ofavtive Post model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Post}},
          },
        },
      },
    },
  })
  async findActivePosts(): Promise<Post[]> {
    return await this.postRepository.findActivePosts();
  }

  @get('/posts/{id}', {
    responses: {
      '200': {
        description: 'Post model instance',
        content: {'application/json': {'x-ts-type': Post}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Post> {
    return await this.postRepository.findById(id);
  }

  @patch('/posts/{id}', {
    responses: {
      '204': {
        description: 'Post PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() post: Post,
  ): Promise<void> {
    post.body = filterXSS(post.body);

    await this.postRepository.updateById(id, post);
  }

  @del('/posts/{id}', {
    responses: {
      '204': {
        description: 'Post DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.postRepository.deleteById(id);
  }
}
