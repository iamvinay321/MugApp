import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styles: [],
  providers: [ConfirmationService]
})
export class ProductTypeComponent implements OnInit {
  productTypes: any = [];
  totalRows: any = 0;
  baseUrl: any;
  productType = {
    "productTypeFrenchName": "",
    "productTypeEnglishName": "",
    "productImages": [
    ],
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
  }

  async getPageData(param) {
    this.productTypes = [];
    this.totalRows = 0;
    const value: any = await this.api.getProductType(param);
    console.log(value);
    if (value.status === 200) {
      this.productTypes = value.result.doc;
      console.log(this.productTypes);
      this.totalRows = value.result.totalRows;
      console.log(this.totalRows);
    } else {
      this.productTypes = [];
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
    this.productType = {
      "productTypeFrenchName": "",
      "productTypeEnglishName": "",
      "productImages": [
      ],
      "activeStatus": 1
    }
    this.isNew = true;
    this.isEdit = true;
  }

  async onFileChanged(event) {
    let file = event.target.files[0];
    const result: any = await this.api.uploadProductType(file);
    if (result.status == 200) {
      this.productType.productImages.push({
        imgUrl: result.result[0].filename,
        frenchCaption: "",
        englishCaption: ""
      })
    } else {
      this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
    }
  }

  removeImage(index) {
    this.productType.productImages.splice(index, 1);
  }

  async addProduct() {
    if (this.isNew == true) {
      const result: any = await this.api.createProductType(this.productType);
      if (result.status == 200) {
        this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
        await this.getPageData(this.currentParam);
        this.backButton();
      } else {
        this.messageService.add({ severity: result.type.toLowerCase(), summary: result.type, detail: result.message });
      }
    } else {
      const result: any = await this.api.updateProductType(this.productType);
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
        const result: any = await this.api.deleteProductType(row);
        if (result.status == 200) {
          await this.getPageData(this.currentParam);
        }
      }
    });
  }

  async editProduct(row: any) {
    this.productType = row;
    this.isEdit = true;
    this.isNew = false;
  }

}
