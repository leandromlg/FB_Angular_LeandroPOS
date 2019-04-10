import { Component, OnInit } from '@angular/core';
import { Produto } from '../../models/Produto';
import { ProdutoService } from '../../services/produto.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-produtos',
	templateUrl: './produto.component.html',
	styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

	produto: Produto;
	produtos: Produto[];
	produtoToEdit: Produto;
	editState: boolean;

	constructor(private produtoService: ProdutoService, private authService: AuthService, private router: Router) {
		this.editState = false;
		this.produto = {
			codigo: '',
			description: ''
		}
	}

	ngOnInit() {
		if (!this.authService.isLoggedIn()) {
			this.router.navigate(['/login']);
			return;
		}
		this.produtoService.getItems().subscribe(produtosResponse => {
			this.produtos = produtosResponse;
		});
	}

	addItem() {
		if (this.produto.codigo != '' && this.produto.codigo != '') {
			this.produtoService.addItem(this.produto);
			this.produto.codigo = '';
			this.produto.description = '';
		}
	}

	deleteItem(event, produto: Produto) {
		this.produtoService.deleteItem(produto);
	}

	editItem(event, produto: Produto) {
		if (this.editState === false) {
			this.editState = true;
		} else {
			this.editState = false;
		}
		this.produtoToEdit = produto;
	}

	updateItem(produto: Produto) {
		this.produtoService.updateItem(produto);
		this.editState = false;
	}

}
