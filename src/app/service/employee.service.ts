import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { Firestore, collection, collectionData, DocumentReference, Timestamp, addDoc } from '@angular/fire/firestore';
import { Employee } from 'src/app/model/employee';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  
  private employeesCollection = collection(this.firestore, 'employees');
  
  employees$: BehaviorSubject<readonly Employee[]> = new BehaviorSubject<
    readonly Employee[]
  >([]);

  constructor(private firestore: Firestore) {
    this.getEmployees().subscribe({
      next: (employees) => {
        this.employees$.next(employees);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  get $(): Observable<readonly Employee[]> {
    return this.employees$;
  }

  getEmployees(): Observable<Employee[]> {
    return collectionData(this.employeesCollection, { idField: 'id' }).pipe(
      map((employees: any[]) => {
        return employees.map((employee) => ({
          ...employee,
          dateOfBirth: (employee.dateOfBirth as Timestamp).toDate(),
        }));
      })
    );
  }

  async addEmployee(employee: Employee): Promise<DocumentReference> {
    try {
      const data = {
        ...employee,
      };

      const docRef = await addDoc(this.employeesCollection, data);
      console.log('Document written with ID: ', docRef.id);
      return docRef;
    } catch (e) {
      console.error('Error adding document: ', e);
      throw e;
    }
  }
}
