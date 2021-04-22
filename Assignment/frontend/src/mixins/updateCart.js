export default {
  methods: {
    updateCart: (productId, amount = 1) => {
      productId = Number.parseInt(productId);
      amount = Number.parseInt(amount);
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (cart.find(el => el.productId === productId) && cart.length) {
        let index = cart.findIndex(el => el.productId === productId);
        if (amount == 0) {
          cart.splice(index, 1);
        } else {
          cart[index].amount = amount;
        }
      }
      return localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};
