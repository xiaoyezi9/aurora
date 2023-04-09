<template>
  <div class="home">
    <div v-title data-title="Aurora交友平台"></div>
    <div class="page-container">
      <div class="container">
        <div class="row">
          <!-- 主体 -->
          <div class="span8 page-content">
            <help />
            <news />
          </div>

<!--         右侧-->
          <aside class="span4 page-sidebar">
            <section class="widget">
              <carousel/>
              <activity />
              
            </section>
          </aside>
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import carousel from "@/components/carousel.vue";
import activity from "@/components/activity.vue";
import news from "@/components/news.vue";
import help from "@/components/help.vue";

export default {
  name: "home",
  components: {
    news,
    activity,
    carousel,
    help
  }
};
</script>
<style>

</style>