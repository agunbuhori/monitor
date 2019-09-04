<template>
    <div class="header">
        <div class="group-box">
            <div class="left">
            <div class="logo"></div>
            <h3 class="title">NICHOLS RENT BIKE</h3>
            </div>

            <div class="right">
            <div class="box">
                <h5 class="title-box">AVAILABLE</h5>
                <div class="wrapper">
                <h4 class="result">12</h4>
                </div>
            </div>
            <div class="box">
                <h5 class="title-box">IN RENT</h5>
                <div class="wrapper">
                <h4 class="result">12</h4>
                </div>
            </div>
            <div class="box">
                <h5 class="title-box">TODAY RETURN</h5>
                <div class="wrapper">
                <h4 class="result">12</h4>
                </div>
            </div>
            </div>
        </div>

        <div class="group-time">
            <div class="left">
            <div class="time-box">
                <div class="one"></div>
            </div>
            <div class="title-time">
                <h6 class="white">EXTEND</h6>
            </div>
            <div class="time-box">
                <div class="two"></div>
            </div>
            <div class="title-time">
                <h6 class="white">OVERTIME</h6>
            </div>
            <div class="time-box">
                <div class="three"></div>
            </div>
            <div class="title-time">
                <h6 class="white">RETURN TODAY</h6>
            </div>
            </div>
            <div class="right">
            <div class="title-time">
                <h3 class="white">10:30</h3>
            </div>
            <div class="title-time">
                <h4 class="white">10 Juli <br> 2019</h4>
            </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "~/assets/scss/main.scss";

.group-time {
  display: grid;
  grid-template-columns: 4fr 3fr;
  padding: 1em 10%;
  .left, .right {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  .left {
    justify-content: flex-start;
  }
  .right {
    justify-content: flex-end;
  }
}

.time-box {
  .one, .two, .three {
    width: 1.5em;
    height: 1.5em;
    border-radius: 0.75em;
  }

  .one {
    background: $yellow;
  }

  .two {
    background: $red;
    margin-left: 1em;
  }

  .three {
    background: $green;
    margin-left: 1em;
  }
}

.title-time{
  h6{
    font-weight: bold;
    font-size: 15px;
    color: #FFFFFF;
    letter-spacing: 1px;
    margin-left: 0.5em;
  }

  h3{
    font-size: 30px;
    letter-spacing: 2px;
    font-weight: 300;
  }

  h4{
    font-size: 20px;
    letter-spacing: 1px;
    font-weight: 300;
    margin-left: 1em;
  }
}

.group-box {
  display: grid;
  grid-template-columns: 4fr 3fr;
  border-bottom: 5px solid $orange;
  padding-left: 10%;
  padding-right: 10%;

  .left, .right {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
  .left {
    justify-content: flex-start;
  }
  .right {
    justify-content: flex-end;
  }
}

.box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100px;
  height: 70px;
  background: $gradient-light;
  margin: 10px;
  
  .wrapper {
    width: 80%;
    border-top: 1px solid $orange;
    margin-top: 0.2rem;
  }
}

.group-title{
  display: inline-flex;
  float: left;
}

.logo{
  background: $white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

h3.title{
  font-weight: bold;
  font-size: 40px;
  color: $orange;
  letter-spacing: 1px;
  margin-left: 0.5em;
}

h5.title-box{
  font-family: 'Open Sans Bold', sans-serif;
  font-weight: bold;
  font-size: 10.5px;
  color: #000000;
}

h4.result{
  font-weight: bold;
  font-size: 34px;
  text-align: center;
}
</style>