<template>
  <section class="product-details spad" v-if="currentProduct">
    <div class="h4 text-center" v-if="loading">
      Loading...
    </div>
    <div class="container" v-else>
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product__details__pic">
            <div class="product__details__pic__item">
              <img
                class="product__details__pic__item--large"
                :src="currentProduct.thumb"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="product__details__text">
            <h3>{{ currentProduct.name }}</h3>
            <div class="product__details__rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star-half-o"></i>
              <span>(18 lượt đánh giá)</span>
            </div>
            <div class="product_text">
              <p v-html="decodeURI(currentProduct.info)"></p>
            </div>
            <div class="product__details__price">
              {{ currentProduct.priceNew | vnd }}
            </div>
            <div class="product__details__quantity">
              <div class="quantity">
                <div class="pro-qty">
                  <input type="text" value="1" />
                </div>
              </div>
            </div>
            <a href="#" class="primary-btn">THÊM VÀO GIỎ</a>
            <a href="#" class="heart-icon"
              ><span class="icon_heart_alt"></span
            >
            {{currentProduct.likes}}
            </a>
            <ul>
              <li><b>Tồn kho </b> <span>Còn hàng</span></li>
              <li>
                <b>Giao hàng</b>
                <span
                  >Từ 3-7 ngày khi giao ngoại thành. <samp>Freeship</samp></span
                >
              </li>
              <li>
                <b>Chia sẻ</b>
                <div class="share">
                  <ShareNetwork
                    network="facebook"
                    :url="
                      'https://dummyimage.com/600x600/ffffff/0011ff&text=' +
                      encodeURI(currentProduct.name)
                    "
                    :title="currentProduct.name"
                    description="Mua ngay kẻo lỡ"
                    :hashtags="'onetech,' + currentProduct.slug"
                  >
                    <i class="fab fa-facebook"></i>
                  </ShareNetwork>
                  <ShareNetwork
                    network="twitter"
                    :url="
                      'https://dummyimage.com/600x600/ffffff/0011ff&text=' +
                      encodeURI(currentProduct.name)
                    "
                    :title="currentProduct.name"
                    :hashtags="'onetech,' + currentProduct.slug"
                  >
                    <i class="fab fa-twitter"></i>
                  </ShareNetwork>

                  <ShareNetwork
                    network="email"
                    :url="
                      'https://dummyimage.com/600x600/ffffff/0011ff&text=' +
                      encodeURI(currentProduct.name)
                    "
                    :title="currentProduct.name"
                    :hashtags="'onetech,' + currentProduct.slug"
                  >
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                  </ShareNetwork>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="product__details__tab">
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a
                  class="nav-link active"
                  data-toggle="tab"
                  href="#tabs-1"
                  role="tab"
                  aria-selected="true"
                  >Bình luận</a
                >
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tabs-1" role="tabpanel">
                <div class="product__details__tab__desc">
                  <div class="row">
                    <!-- <div class="col-12" v-if="user">
                      <form @submit="checkComment">
                        <div class="form-group">
                          <input
                            v-model="comment"
                            type="text"
                            name="comment"
                            id="comment"
                            class="form-control"
                            placeholder="Bình luận của bạn..."
                            required
                          />
                        </div>
                        <div class="form-group float-right">
                          <button type="submit" class="btn btn-primary">
                            Gửi bình luận
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="col-12 text-center mb-3" v-else>
                      <router-link
                        class="btn btn-primary"
                        :to="{ name: 'login' }"
                        >Vui lòng đăng nhập để bình luận</router-link
                      >
                    </div>
                    <div
                      class="col-12"
                      v-if="
                        currentProduct.comments &&
                        currentProduct.comments.length
                      "
                    >
                      <div class="card p-2">
                        <div class="media">
                          <img
                            src="https://via.placeholder.com/100x100/ccc.png"
                            class="mr-3"
                            alt="avatar"
                          />
                          <div class="media-body">
                            <strong class="mt-0">Media heading</strong>
                            <p class="m-0">
                              Will you do the same for me? It's time to face the
                              music I'm no longer your muse. Heard it's
                              beautiful, be the judge and my girls gonna take a
                              vote. I can feel a phoenix inside of me. Heaven is
                              jealous of our love, angels are crying from up
                              above. Yeah, you take me to utopia.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> -->
                    <div class="col-12">
                      <fb-comment url="www.facebook.com/Demo-page-101757745159112" :class="'w-100'"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import scrollToElement from "@/mixins/scrollToElement";
export default {
  mixins: [scrollToElement],
  data() {
    return {
      loading: true,
      comment: null,
      productId: Number.parseInt(this.$route.params.id),
    };
  },
  async created() {
    await this.$store.dispatch("productById", this.productId);
    this.loading = false;
  },
  computed: {
    ...mapState(["currentProduct", "user"]),
  },
  methods: {
    checkComment: (e) => {
      e.preventDefault();

    },
  },
  watch: {
    $route(to) {
      if (to) {
        this.productId = Number.parseInt(to.params.id);

      }
    },
  },
};
</script>

