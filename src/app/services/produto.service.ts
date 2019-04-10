import { Produto } from '../models/Produto';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class ProdutoService {

	produtos: Observable<Produto[]>;
	produtoDoc: AngularFirestoreDocument<Produto>;
	produtoCollection: AngularFirestoreCollection<Produto>;

	constructor(private afs: AngularFirestore) {
		this.produtos = afs.collection('produtos').valueChanges();
		this.produtoCollection = this.afs.collection('produtos', ref => ref.orderBy('codigo', 'asc'));
		this.produtos = this.produtoCollection.snapshotChanges().map(changes => {
			return changes.map(a => {
				const data = a.payload.doc.data() as Produto;
				data.id = a.payload.doc.id;
				return data;
			});
		});
	}

	getItems() {
		return this.produtos;
	}

	addItem(produto: Produto) {
		this.produtoCollection.add(produto);
	}

	deleteItem(produto: Produto) {
		this.produtoDoc = this.afs.doc(`produtos/${produto.id}`);
		this.produtoDoc.delete();
	}

	updateItem(produto: Produto) {
		this.produtoDoc = this.afs.doc(`produtos/${produto.id}`);
		this.produtoDoc.update(produto);
	}

}
