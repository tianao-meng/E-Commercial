class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  // /api/v1/products?keyword=apple
  search() {
    // queryObj = {keyword:apple}
    const keyword = this.queryObj.keyword
      ? {
          name: {
            $regex: this.queryObj.keyword,
            //case insensitive
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  // /api/v1/products?keyword=apple&category=Laptops
  // /api/v1/products?keyword=apple&price[gre]=1&price[lte]=200
  filter() {
    const queryObjCopy = { ...this.queryObj };

    const fieldsRemoved = ["keyword", "page", "limit"];
    fieldsRemoved.forEach((field) => {
      delete queryObjCopy[field];
    });

    //Advanced filter for price, rate...
    // {price:{gte:1, lte:200}} => {price:{$gte:1, $lte:200}};
    // b means group match, g means global scope
    let queryStr = JSON.stringify(queryObjCopy);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(productPerPage) {
    //queryObj = {page:1}
    let curPage = Number(this.queryObj.page) || 1;
    let skip = (curPage - 1) * productPerPage;
    this.query = this.query.limit(productPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
