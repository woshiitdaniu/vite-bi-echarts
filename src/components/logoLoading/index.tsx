import { defineComponent } from "vue";
import "./index.less";

export default defineComponent({
  name: "LogoLoading",
  setup(props, ctx) {
    return () => {
      return (
        <view class="comp-loading">
          <view class="slide-shine">o</view>
        </view>
      );
    };
  },
});
