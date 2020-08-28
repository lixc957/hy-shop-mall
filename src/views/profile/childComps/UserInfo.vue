<template>
  <div class="user-info">
    <a href="javascript:;" class="clear-fix">
      <slot name="user-icon">
        <svg class="privateImage-svg left">
          <use
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xlink:href="#avatar-default"
          ></use>
        </svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
}
</script>

<style scoped>
  .user-info {
    width: 100%;
    background-color: var(--color-tint);
    padding: 15px;
  }

  .user-info .privateImage-svg {
    width: 40px;
    height: 40px;
    background-color: #fff;
    border-radius: 20px;
  }

  .left {
    float: left;
  }

  .user-info .login-info {
    color: #fff;
    margin-left: 15px;
    font-size: 18px;
  }

  .user-info .login-info .phone {
    position: relative;

    font-size: 13px;
    margin-top: 5px;
    font-weight: 300;
  }
</style>