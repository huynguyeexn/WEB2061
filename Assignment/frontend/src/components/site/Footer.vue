<template>
  <!-- Footer Section Begin -->
  <footer class="footer spad">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-6">
          <div class="footer__about">
            <div class="footer__about__logo">
              <a href="./index.html"
                ><img src="@/assets/img/logo.png" alt=""
              /></a>
            </div>
            <ul>
              <li>
                Địa chỉ: Công viên phần mềm, Toà nhà Innovation lô 24, Quang
                Trung, Quận 12, Thành phố Hồ Chí Minh, Vietnam
              </li>
              <li>Phone: +65 11.188.888</li>
              <li>Email: huynguyeexn@gmail.com</li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 col-sm-6 offset-lg-1">
          <div class="footer__widget">
            <ul>
              <li><a href="#">Về chúng tôi</a></li>
              <li><a href="#">Lịch sử mua hàng</a></li>
              <li><a href="#">Tìm hiểu về mua trả góp</a></li>
              <li><a href="#">Chính sách bảo hành</a></li>
              <li><a href="#">Chính sách đổi trả</a></li>
              <li><a href="#">Giao hàng & thanh toán</a></li>
            </ul>
            <ul>
              <li><a href="#">Hướng dẫn mua online</a></li>
              <li><a href="#">Phiếu mua hàng</a></li>
              <li><a href="#">Quy chế hoạt động</a></li>
              <li><a href="#">Chất lượng phục vụ</a></li>
              <li><a href="#">Góp ý, khiếu nại</a></li>
              <li><a href="#">Tuyển dụng</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-4 col-md-12">
          <div class="footer__widget">
            <h6>Nhận thông tin về sản phẩm mới</h6>
            <p>
              Chúng tôi sẽ gửi thông báo cho bạn biết về các sản phẩm mới nhất
            </p>
            <form action="#">
              <input type="text" placeholder="Nhập vào Email của bạn..." />
              <button type="submit" class="site-btn">Đăng ký</button>
            </form>
            <div class="footer__widget__social">
              <a href="#"><i class="fab fa-facebook-f"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-pinterest-p"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="footer__copyright">
            <div class="footer__copyright__text">
              <p>
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                Copyright &copy; {{ currentYear }}
                All rights reserved | This template is made with
                <i class="fa fa-heart" aria-hidden="true"></i>
                by
                <a href="#" target="_blank">HUI</a>
                <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
              </p>
            </div>
            <div class="footer__copyright__payment">
              <img src="@/assets/img/payment-item.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- Footer Section End -->
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style>
</style>
