class ProductModel {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string[];
  category: string;
  specs: {
    processor: string;
    ram: string;
    storage: string;
    graphics: string;
    display: string;
    battery: string;
  };
  description: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  featured: boolean;
  constructor(
    id: string,
    name: string,
    brand: string,
    price: number,
    originalPrice: number,
    image: string[],
    category: string,
    specs: {
      processor: string;
      ram: string;
      storage: string;
      graphics: string;
      display: string;
      battery: string;
    },
    description: string,
    inStock: boolean,
    rating: number,
    reviewCount: number,
    featured: boolean
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.originalPrice = originalPrice;
    this.image = image;
    this.category = category;
    this.specs = specs;
    this.description = description;
    this.inStock = inStock;
    this.rating = rating;
    this.reviewCount = reviewCount;
    this.featured = featured;
  }
  static initialize() {
    return {
      id: "",
      name: "",
      brand: "",
      price: 0,
      originalPrice: 0,
      image: [""],
      category: "",
      specs: {
        processor: "",
        ram: "",
        storage: "",
        graphics: "",
        display: "",
        battery: "",
      },
      description: "",
      inStock: false,
      rating: 0,
      reviewCount: 0,
      featured: false,
    };
  }
}
export { ProductModel };
