const faker = require("faker");
const fs = require("fs");

faker.locale = "vi";

const randomCategoryList = (n) => {
  if (n <= 0) return [];
  const categoryList = [];

  Array.from(new Array(n)).forEach(() => {
    const category = {
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    categoryList.push(category);
  });

  return categoryList;
};

const randomProductList = (categoryList, numberOfProducts) => {
  if (numberOfProducts <= 0) return [];
  const productList = [];

  for (const category of categoryList) {
    Array.from(new Array(numberOfProducts)).forEach(() => {
      const product = {
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        avatar: faker.image.imageUrl(500, 500),
        price: Number.parseFloat(faker.commerce.price()),
        categoryId: category.id,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      productList.push(product);
    });
  }
  return productList;
};

(() => {
  // ganerate random data
  const categoryList = randomCategoryList(5);
  const productList = randomProductList(categoryList, 10);

  // repare data object
  const data = {
    categories: categoryList,
    products: productList,
  };

  // write data object to data.json
  fs.writeFile("db.json", JSON.stringify(data), () => {
    console.log("Generate data successfully!");
  });
})();
