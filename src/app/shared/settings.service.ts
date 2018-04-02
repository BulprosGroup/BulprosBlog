import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class SettingsService {
    categoriesChanged = new Subject<string[]>();
    private categories: string[];

    constructor(private afs: AngularFirestore) { }

    fetchCategories() {
        return this.afs.collection('Settings').doc('Categories').valueChanges().subscribe(categories => {
            this.categories = categories['List'] as string[];
            this.categoriesChanged.next([...this.categories]);
        });
    }
}