const fs = require("fs");
const moment = require("moment");

try {
  let data = fs.readFileSync("db/db2.json", "utf8");
  data = JSON.parse(data);

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function randomTime() {
    let now = Math.trunc(Date.now() / 1000);
    let last = 1584181538;
    return random(last, now);
  }
  function randomUser() {
    return data.users[random(0, data.users.length-1)];
  }
  function randomProduct() {
    return data.products[random(0, data.products.length-1)];
  }

  let order = [];

  for (let index = 0; index < 1000; index++) {
    const createAt = randomTime();
    const user = randomUser().id;
    const products = [];

    for (let j = 0; j < random(1, 2); j++) {
      const product = randomProduct();
      products.push({
        id: product.id,
        categoryId: product.categoryId,
        name: product.name,
        priceNew: product.priceNew,
        priceOld: product.priceOld,
        thumb: product.thumb,
        amount: random(1, 3),
      });
    }

    let result = {
      userId: user,
      total: products.reduce((a, b) => a + b.amount * b.priceNew, 0),
      status: random(1, 4),
      products: products,
      createdAt: createAt,
      updatedAt: createAt,
      id: index+1,
    };

    order.push(result);

    console.log(index);
  }


fs.writeFile("random.json", JSON.stringify(order), () => {
  console.log("Random data successfully!");
});
} catch (err) {
  console.error(err);
}
