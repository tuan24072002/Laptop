import { ProductModel } from "@/models/Product.model";
import { HttpService } from "./http/HttpService";
import { parseCommonHttpResult } from "./http/parseCommonHttpResult";
export const ProductService = {
  listFromJson(data: any) {
    const list: ProductModel[] = [];
    for (let index = 0; index < data?.length; index++) {
      const element = data[index];
      list.push({
        id: element._id,
        name: element.name,
        brand: element.brand,
        price: element.price,
        originalPrice: element.originalPrice,
        image: element.image,
        category: element.category,
        specs: element.specs,
        description: element.description,
        inStock: element.inStock,
        rating: element.rating,
        reviewCount: element.reviewCount,
        featured: element.featured,
      });
    }
    return list;
  },
  itemFromJson(data: any) {
    const item = {
      id: data._id,
      name: data.name,
      brand: data.brand,
      price: data.price,
      originalPrice: data.originalPrice,
      image: data.image,
      category: data.category,
      specs: data.specs,
      description: data.description,
      inStock: data.inStock,
      rating: data.rating,
      reviewCount: data.reviewCount,
      featured: data.featured,
    };
    return item;
  },
  async getAll(data: any) {
    const res = await HttpService.doGetRequest(
      `products/list?showAll=true`,
      data
    );
    return parseCommonHttpResult(res);
  },
  async getAllPagination(data: any) {
    const res = await HttpService.doGetRequest(`products/list`, data);
    return parseCommonHttpResult(res);
  },
  async getById(data: any) {
    const res = await HttpService.doGetRequest(`products/${data?.id}`, data);
    return parseCommonHttpResult(res);
  },
  async addItem(data: any) {
    const res = await HttpService.doUploadPostRequest(
      `products/add`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async editItem(data: any) {
    const res = await HttpService.doUploadPutRequest(
      `products/edit/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async deleteItem(data: any) {
    const res = await HttpService.doDeleteRequest(
      `products/delete/${data?.id}`,
      data?.data
    );
    return parseCommonHttpResult(res);
  },
  async changeStock(data: any) {
    const res = await HttpService.doPutRequest(`products/stock`, data);
    return parseCommonHttpResult(res);
  },
  //   async deleteItem(data: any) {
  //     const res = await HttpService.doDeleteRequest(
  //       `/categories/${data?.id}`,
  //       data?.data
  //     );
  //     return parseCommonHttpResult(res);
  //   },
  //   async editItem(data: any) {
  //     const response = await HttpService.doPatchRequest(
  //       `/categories/${data?.id}`,
  //       data?.data
  //     );
  //     return parseCommonHttpResult(response);
  //   },
};
