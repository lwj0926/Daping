<template>
  <div class="panel-group">
    <div class="card-panel" :title="cards.cardG.dateTime">
      <div class="card-panel-title">总销气量（万方）</div>
      <div class="card-panel-content">
        <div class="card-panel-num" v-text="cards.cardG.quantity"></div>
      </div>
    </div>
    <div class="card-panel" :title="cards.cardX.dateTime">
      <div class="card-panel-title">总销气量（万方）</div>
      <div class="card-panel-content">
        <div class="card-panel-num" v-text="cards.cardX.quantity"></div>
      </div>
    </div>
    <div class="card-panel" :title="cards.cardK.dateTime">
      <div class="card-panel-title">当日库存（万方）</div>
      <div class="card-panel-content">
        <div class="card-panel-num" v-text="cards.cardK.quantity"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: {
      type: Object,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  display: flex;
  justify-content: space-between;
  height: 100px;
  width: 70%;
  margin-left: 30%;
  margin-top: 15px;

  .card-panel {
    list-style: none;
    width: 33%;
    height: 100%;
    padding: 14px 14px 0;
    background: url(~@/assets/img/screen/cards_index.png) no-repeat;
    .card-panel-title {
      margin-bottom: 10px;
      color: #ffffff;
    }

    .card-panel-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 50px;

      .card-panel-num {
        font-size: 28px;
        color: #21e1ff;
        text-shadow: 0 0 10px #21e1ff;
        padding-top: 9px;
        width: 100%;
      }
      .card-panel-description {
        color: #b1643f;
        line-height: 20px;
      }
    }
  }
}
</style>
