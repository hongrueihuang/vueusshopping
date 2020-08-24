<template>
  <div>
    <div class="container-fluid bg-carousel">
      <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div
              class="bg-cover"
              style="background-image: url('https://images.pexels.com/photos/546228/pexels-photo-546228.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"
            >
            </div>
          </div>
          <div class="carousel-item">
            <div
              class="bg-cover"
              style="background-image: url('https://images.pexels.com/photos/265129/pexels-photo-265129.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"
            >
            </div>
          </div>
          <div class="carousel-item">
            <div
              class="bg-cover"
              style="background-image: url('https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')"
            >
            </div>
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
.bg-comment {
  border-radius: 5px;
  align-self: center;
  padding: 30px;
  background-color: rgba(0, 0, 0, .4)!important;
}
</style>