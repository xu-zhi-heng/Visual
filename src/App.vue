<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  #app {
    width: 100%;
    height: 100%;
    z-index: 101;
  }
  #app.before::before{
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    animation: dropdown 2s;
    content: '';
    /*background-image: linear-gradient(120deg, #6fc9b7, #093637);*/
  }
  @keyframes dropdown {
    0%{
      top: -375px;
    }

    5%{
      top: 0;
    }

    10%{
      top:-30px
    }
    20%{
      top: 0;
    }
    30%{
      top: -20px;
    }
    40%{
      top: 0;
    }
    50%{
      top: -15px;
    }
    60%{
      top: 0;
    }
    70%{
      top: -10px;
    }
    80%{
      top: 0;
    }
    90%{
      top: -5px;
    }
    100%{
      top: 0;
    }
  }
</style>
