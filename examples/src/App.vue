<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less" scoped>
.nav-container {
  width: 400px;
  margin: 0 auto;
  padding-top: 100px;

  ul {
    li {
      display: inline-block;
      margin: 0 10px;
    }
  }

  a {
    text-decoration: none;
    user-select: none;

    &.router-link-active {
      color: #f00;
    }
  }
}
</style>
