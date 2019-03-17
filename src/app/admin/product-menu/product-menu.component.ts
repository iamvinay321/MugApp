import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styles: [],
  providers: [ConfirmationService]
})
export class ProductMenuComponent implements OnInit {
  productMenus: any = [];
  productTypes: any = [];
  totalRows: any = 0;
  baseUrl: any;
  productMenu = {
    "productFranchName": "",
    "productEnglishName": "",
    "productFranchDescription": "",
    "productEnglishDescription": "",
    "productPrice": "",
    "productType": "",
    "activeStatus": 1

  }
  statusId = 1;
  currentParam: any;
  isEdit = false;
  isNew = true;

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, public api: ApiService) { }

  async ngOnInit() {
    this.currentParam = {
      page: 1,
      size: 10,
      keyword: '',
      sortColumn: 'productTypeEnglishName',
      sortDirection: 1,
      activeStatus: this.statusId
    };
    this.baseUrl = this.api.baseUrl;
    await this.getPageData(this.currentParam);
    await this.getProductType();
    const number = 123456.789;

  }

  getCurrency(number) {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(number)
  }

  async getProductType() {
    const value: any = await this.api.getAllActiveProductType();
    console.log(value);
    if (value.status === 200) {
      this.productTypes = value.result;
      console.log(this.productTypes);
    } else {

    }
  }

  async getPageData(param) {
    this.productMenus = [];
    this.totalRows = 0;
    const value: any = await this.api.getProductMenu(param);
    console.log(value);
    if (value.status === 200) {
      this.productMenus = value.result.doc;
      console.log(this.productMenus);
      this.totalRows = value.result.totalRows;
      console.log(this.totalRows);
    } else {
      this.productMenus = [];
      this.messageService.add({ severity: value.type.toLowerCase(), summary: value.type, detail: value.message });
    }
  }

  async handleGridEvent(data) {
    this.currentParam = {
      page: data.page,
      size: data.size,
      keyword: data.keyword,
      sortColumn: data.sortColumn,
      sortDirection: data.sortDirection,
      activeStatus: this.statusId
    };
    await this.getPageData(this.currentParam);
  }

  async backButton() {
    await this.getPageData(this.currentParam);
    this.isEdit = false;
  }

  addButton() {
    this.productMenu = {
      "productFranchName": "",
      "productEnglishName": "",
      "productFranchDescription": "",
      "productEnglishDescription": "",
      "productPrice": "",
      "productType": "",
      "activeStatus": 1
    }
    this.isNew = true;
    this.isEdit = true;
  }


  async addProduct() {
    if (this.isNew == true) {
      const result: any = await this.api.createProductMenu(this.productMenu);
      if (result.status == 200) {
        this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
        await this.getPageData(this.currentParam);
        this.backButton();
      } else {
        this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
      }
    } else {
      const result: any = await this.api.updateProductMenu(this.productMenu);
      if (result.status == 200) {
        this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
        await this.getPageData(this.currentParam);
        this.backButton();
      } else {
        this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
      }
    }
  }

  async deleteProduct(row: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this row?',
      accept: async () => {
        const result: any = await this.api.deleteProductMenu(row.productmenus);
        if (result.status == 200) {
          await this.getPageData(this.currentParam);
        }
      }
    });
  }

  async editProduct(row: any) {
    this.productMenu = row.productmenus;
    console.log(row)
    this.isEdit = true;
    this.isNew = false;
  }

}
