<template>
    <div class="wrapper">
        <div class="header">
            <div class="main-header">
                <div class="left">
                    <img :src="snapshot.picture" width="15%">
                    <h3>{{ snapshot.name }}</h3>
                </div>
                <div class="right">
                    <div class="box">
                        <h5>AVAILABLE</h5>
                        <div class="wrapper-box">
                            <h4>{{ snapshot.available }}</h4>
                        </div>
                    </div>
                     <div class="box">
                        <h5>IN RENT</h5>
                        <div class="wrapper-box">
                            <h4>{{ snapshot.in_rent }}</h4>
                        </div>
                    </div>
                     <div class="box">
                        <h5>TODAY RETURN</h5>
                        <div class="wrapper-box">
                            <h4>{{ snapshot.today_return }}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div class="main-time">
                <div class="left">
                    <div class="one"></div>
                      <h6>EXTEND</h6>
                    <div class="two"></div>
                      <h6>OVERTIME</h6>
                    <div class="three"></div>
                      <h6>RETURN TODAY</h6>
                </div>
                <div class="right">
                    <h3 class="title-time">{{ time }}</h3>
                    <h4>{{ date }} <br> {{ dated }}</h4>
                </div>
            </div>
        </div>

        <div class="content">
            <div class="scroll-wrapper">
                <div class="scroll" v-for="(part, $slide) in reservations" v-bind:key="$slide">
                    <table>
                        <thead>
                            <tr>
                                <th width="5%">NO</th>
                                <th width="20%">UNIT</th>
                                <th>DK</th>
                                <th width="7%">DAY</th>
                                <th>START</th>
                                <th>FINISH</th>
                                <th>TIME</th>
                                <th width="10%">ADD</th>
                                <th width="10%">GRT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(reservation, $index) in part" v-bind:key="$index">
                                <td v-if="reservation.unit" width="5%" class="text-center">{{ (25*$slide)+$index+1 }}</td>
                                <td v-else width="5%" class="text-center">&nbsp;</td>
                                <td width="20%">{{ reservation.unit }}</td>
                                <td class="text-center">{{ reservation.number }}</td>
                                <td width="7%" class="text-center">{{ reservation.day }}</td>
                                <td class="text-center">{{ reservation.start }}</td>
                                <td v-if="reservation.overtime === 1" class="text-center over">{{ reservation.end }}</td>
                                <td v-else-if="reservation.today_return === 1" class="text-center return">{{ reservation.end }}</td>
                                <td v-else-if="reservation.extend === 1" class="text-center extend">{{ reservation.end }}</td>
                                <td v-else-if="reservation.overtime  === 0 && reservation.today_return === 0 &&  reservation.extend === 0" class="text-center">{{ reservation.end }}</td>
                                <td v-else></td>
                                <td v-if="reservation.extend === 1" class="text-center extend">{{ reservation.time }}</td>
                                <td v-else-if="reservation.extend === 0" class="text-center">{{ reservation.time }}</td> 
                                <td v-else></td>
                                <td width="10%" class="text-center">{{ reservation.helmet }}</td>
                                <td width="10%" class="text-center">{{ reservation.guarantee }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
        snapshot: {},
        reservations: [],
        slideNumber: 1,
        time: this.$moment().format("HH:mm"),
        date: this.$moment().format("DD MMM"),
        dated: this.$moment().format("YYYY")
    }
  },
  mounted() {
      this.fetch();
      this.runTime();
  },
  updated() {
        let scrolls = document.getElementsByClassName('scroll');
        let reservationsCount = this.reservations.length;
        let transition = this.snapshot.transition;

        let scrollWrapper = document.querySelector(".scroll-wrapper");
        scrollWrapper.style.width = (reservationsCount * 100) + '%';

        for (let i = 0; i < scrolls.length; i++) {
            scrolls[i].style.width = (100 / reservationsCount) + '%';
        }

        setInterval(() => {
            if (this.slideNumber < reservationsCount) {
                scrollWrapper.style.transform = 'translateX(-'+(this.slideNumber * (100/reservationsCount))+'%)';
                this.slideNumber++;
            } else {
                scrollWrapper.style.transform = 'translateX(0%)';
                this.slideNumber = 1;
            }
        }, transition*1000);
  },
  methods: {
    async fetch() {
      await this.$axios.$get('reservation')
      .then(response => {
        this.snapshot = response;
        this.renderTable();
      });
    },
    runTime() {
        setInterval(() => {
            this.time = this.$moment().format("HH:mm");
        }, 60000);
    },
    renderTable() {
        const { reservations } = this.snapshot;
        this.reservations = reservations;
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/scss/main.scss";

.wrapper {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: grid;
    grid-template-rows: 10em 1fr;
}

.box {
    height: 5rem;
    background: $gradient-light;
    flex-direction: coloum;
    justify-content: center;
    display: grid;
    align-items: center;

        h5 {
           font-weight: bold;
           color: $black;
           font-size: 0.8em;
           text-align: center;
        }

        .wrapper-box {
            width: 100%;
            border-top: 2px solid $orange;

            h4 {
                font-weight: bold;
                text-align: center;
                font-size: 2.3em;
            }
      }
}

.header {
    display: grid;
    grid-template-rows: 3fr 1fr;
    background-color: $black;

    .main-header {
        border-bottom: 2px solid $orange;
        display: grid;
        grid-template-columns: 3fr 2fr;
        padding: 0 5%;

        .left, .right {
            display: flex;
            align-items: center;
            flex-direction: row;
        }

        .right {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-gap: 1em;
        }

        .logo {
          background: $white;
          width: 3em;
          height: 3em;
          border-radius: 50%;
        }

        h3 {
          font-weight: bold;
          font-size: 3em;
          color: $orange;
          margin-left: 0.5em;
        }

    }

    .main-time {
        padding: 0 5%;
        display: grid;
        grid-template-columns: 2fr 1fr;

        .left, .right{
            display: flex;
            align-items:center;
            flex-direction: row;
        }

        .left {
            justify-content: flex-start;
        }

        .right {
            grid-template-columns: repeat(3, 1fr);
            justify-content: flex-end;

            h3{
                color: $white;
                font-size: 2em;
            }

            h4{
                color:  $white;
                margin-left: 1em;
            }
        }

        .one, .two, .three {
            width: 1.5em;
            height: 1.5em;
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

          h6 {
            font-weight: bold;
            font-size: 0.8rem;
            color: $white;
            letter-spacing: 1px;
            margin-left: 0.5em;
          }

          
    }
}

.content {
    overflow-x: scroll;
    width: 100%;
    height: 100%;
    // height: calc(100% + 4em);

    .scroll-wrapper {
        height: 100%;
        transition: 1s;
        // animation: slide 10s infinite;

        .scroll {
            display: inline-block;
            float: left;
            height: 100%;
        }
    }

    // @keyframes slide {
    //     0% {transform: translateX(0)};
    //     40% {transform: translateX(0)};
    //     50% {transform: translateX(-50%)};
    //     90% {transform: translateX(-50%)};
    //     100% {transform: translateX(0)};
    // }

    table {
        width: 100%;
        height: 100%;
        table-layout: fixed;
        border-collapse: collapse;


        thead, tbody tr {
            width: 100%;
        }

        thead {
            tr {
                th {
                    font-weight: bold !important;
                }

                background-color: $orange;
                height: 4em;

                th:not(:first-child) {
                    border-left: 1px solid $black;
                }
            }
        }

        tbody {
            color: $white;
            // display: block;
            // height: calc(100% - 4em);
            // overflow-y: scroll;
            // padding-right: -17px; /* Increase/decrease this value for cross-browser compatibility */
            // box-sizing: content-box;
            tr {
                &:nth-child(odd) {
                    background: $gradient-dark;
                }
                &:nth-child(even) {
                    background: $black;
                }

                td:not(:first-child) {
                    border-left: 1px solid white;
                }
            }
        }

        th, td {
            font-size: 17pt;
            padding: 0 0.5em;
        }
        td.over {
            box-sizing: border-box;
            background: red !important;
            border-bottom: 1px solid #fff;
        }

        td.return {
            background: green !important;
            border-bottom: 1px solid #fff;
        }

        td.extend {
            background: yellow !important;
            color: $black;
            border-bottom: 1px solid #fff;
            
        }
    }
}
</style>