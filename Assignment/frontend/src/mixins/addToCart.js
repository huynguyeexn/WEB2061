export default {
  methods: {
    addToCart: (productId, amount = 1) => {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cart.find(el => el.productId === productId)) {
        let index = cart.findIndex(el => el.productId === productId);
        cart[index].amount += amount;
      } else {
        let item = {
          productId: productId,
          amount: amount
        };
        cart.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
