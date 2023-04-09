<template>
  <div class="foot">
    <!-- Start of Footer -->
    <footer id="footer-wrapper">
      <div id="footer" class="container">
        <div class="row">

          <div class="span3">
<!--          占位-->
          </div>

          <div class="span3">
            <section class="widget">
              <h3 class="title">友情链接</h3>
              <ul>
                <li>
                  <a href="#" title="Vue">Vue官网</a>
                </li>
                <li>
                  <a href="#" title="Soul">Soul</a>
                </li>
                <li>
                  <a href="#" title="微信">Wechat</a>
                </li>
             
              </ul>
            </section>
          </div>

          <div class="span3">
            <section class="widget">
              <h3 class="title">公告</h3>
              <div id="twitter_update_list">
                <ul>
                  <li>禁止在本平台上发表不当言论 禁止出现辱骂他人的语言，一经发现进行封号处理</li>
                </ul>
              </div>
            </section>
          </div>

          <div class="span3">
            <section class="widget">
              <h3 class="title">客服中心</h3>
             <ul>
                <li>
                  <router-link to="/fankui" title="意见反馈">意见反馈</router-link>
                </li>
                <li>
                  <router-link to="/shensu" title="封禁">账号冻结和解封</router-link>
                </li>
                 <li>
                  <router-link to="/jubao" title="举报不良行为">不良行为举报</router-link>
                </li>
                
              </ul>
            </section>
          </div>
        </div>
      </div>
      <!-- end of #footer -->

      <!-- Footer Bottom -->
      <div id="footer-bottom-wrapper">
        <div id="footer-bottom" class="container">
          <div class="row">
            <div class="span6">
              <p class="copyright">
                Copyright © 2022 - Aurora
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Footer Bottom -->
    </footer>
    <!-- End of Footer -->
  </div>
</template>

<script>
export default {
  name: "foot",
  props: {
    msg: String
  }
};
</script>

<style scoped>
</style>