// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: @loopback/example-todo-list
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {TodoList} from '../models';
import {TodoListRepository} from '../repositories';

export class TodoListController {
  constructor(
    @repository(TodoListRepository)
    public todoListRepository: TodoListRepository,
  ) {}

  @post('/todo-lists', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {schema: {'x-ts-type': TodoList}}},
      },
    },
  })
  async create(@requestBody() obj: TodoList): Promise<TodoList> {
    return await this.todoListRepository.create(obj);
  }

  @get('/todo-lists/count', {
    responses: {
      '200': {
        description: 'TodoList model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(TodoList)) where?: Where,
  ): Promise<Count> {
    return await this.todoListRepository.count(where);
  }

  @get('/todo-lists', {
    responses: {
      '200': {
        description: 'Array of TodoList model instances',
        content: {'application/json': {schema: {'x-ts-type': TodoList}}},
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(TodoList)) filter?: Filter,
  ): Promise<TodoList[]> {
    return await this.todoListRepository.find(filter);
  }

  @patch('/todo-lists', {
    responses: {
      '200': {
        description: 'TodoList PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() obj: Partial<TodoList>,
    @param.query.object('where', getWhereSchemaFor(TodoList)) where?: Where,
  ): Promise<Count> {
    return await this.todoListRepository.updateAll(obj, where);
  }

  @get('/todo-lists/{id}', {
    responses: {
      '200': {
        description: 'TodoList model instance',
        content: {'application/json': {schema: {'x-ts-type': TodoList}}},
      },
    },
  })
  async findById(
    return await this.todoListRepository.findById(id);
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TodoList>,
  ): Promise<TodoList> {
    // somehow the filter sent in the request query is undefined
    // will dig more.
    // hardcoded the inclusion filter in the PoC PR
    const hardcodedFilterForPoC = {
      include: [{relation: 'todos'}],
    };
    return await this.todoListRepository.findById(id, hardcodedFilterForPoC);
  }

  @patch('/todo-lists/{id}', {
    responses: {
      '204': {
        description: 'TodoList PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() obj: TodoList,
  ): Promise<void> {
    await this.todoListRepository.updateById(id, obj);
  }

  @del('/todo-lists/{id}', {
    responses: {
      '204': {
        description: 'TodoList DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.todoListRepository.deleteById(id);
  }
}
