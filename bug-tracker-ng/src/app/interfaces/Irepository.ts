import { BehaviorSubject, Observable } from "rxjs";

export interface IRepository<T, U> {
  entityState: BehaviorSubject<T[]>;
  getAll(parentId?: U): Observable<T[]>;
  getById(id: U, parentId?: U): Observable<T>;
  create(entity: T, parentId?: U): any;
  update(id: U, entity: T, userId?: U): any;
  delete(id: U): any;
}