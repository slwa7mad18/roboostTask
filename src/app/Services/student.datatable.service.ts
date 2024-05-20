/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Student } from '../Interfaces/student';
import { DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../Directives/sortable.directive';

interface SearchResult {
  students: Student[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) =>
  v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(
  students: Student[],
  column: SortColumn,
  direction: string
): Student[] {
  if (direction === '' || column === '') {
    return students;
  } else {
    return [...students].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(student: Student, term: string, pipe: PipeTransform) {
  return (
    (student.Name != null
      ? student.Name.toLowerCase().includes(term.toLowerCase())
      : false) ||
    (student.Mobile != null
      ? student.Mobile.toLowerCase().includes(term.toLowerCase())
      : false) ||
    (student.Email != null
      ? student.Email.toLowerCase().includes(term.toLowerCase())
      : false) ||
    (student.NationalID != null
      ? student.NationalID.toLowerCase().includes(term.toLowerCase())
      : false) ||
    (student.ID != null ? pipe.transform(student.ID).includes(term) : false) ||
    (student.Age != null ? pipe.transform(student.Age).includes(term) : false)
  );
}

@Injectable({ providedIn: 'root' })
export class StudentDatatableService {
  private _search$ = new Subject<void>();
  private _students$ = new BehaviorSubject<Student[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 8,
    searchTerm: '',
    sortColumn: '',
    sortDirection: '',
  };

  constructor(private pipe: DecimalPipe) {}

  initData(data: Student[]) {
    this._search$
      .pipe(switchMap(() => this._search(data)))
      .subscribe((result) => {
        this._students$.next(result.students);
        this._total$.next(result.total);
      });

    this._search$.next();
  }

  get students$() {
    return this._students$.asObservable();
  }
  get total$() {
    return this._total$.asObservable();
  }
  get page() {
    return this._state.page;
  }
  get pageSize() {
    return this._state.pageSize;
  }
  get searchTerm() {
    return this._state.searchTerm;
  }

  set page(page: number) {
    this._set({ page });
  }
  set pageSize(pageSize: number) {
    this._set({ pageSize });
  }
  set searchTerm(searchTerm: string) {
    this._set({ searchTerm });
  }
  set sortColumn(sortColumn: SortColumn) {
    this._set({ sortColumn });
  }
  set sortDirection(sortDirection: SortDirection) {
    this._set({ sortDirection });
  }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(data: Student[]): Observable<SearchResult> {
    const { sortColumn, sortDirection, pageSize, page, searchTerm } =
      this._state;

    // 1. sort
    let students = sort(data, sortColumn, sortDirection);

    // 2. filter
    students = students.filter((student) =>
      matches(student, searchTerm, this.pipe)
    );
    const total = students.length;

    // 3. paginate
    students = students.slice(
      (page - 1) * pageSize,
      (page - 1) * pageSize + pageSize
    );
    return of({ students, total });
  }
}
