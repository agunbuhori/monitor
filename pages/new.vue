<template>
    <div class="wrapper">
        <div class="header">
            <div class="main-header">
                <div class="left">
                    <img :src="snapshot.picture">
                    <h3>{{ snapshot.name }}</h3>
                </div>
                <div class="right">
                    <h3 class="title-time">{{ time }}</h3>
                    <h4>{{ date }} <br> {{ dated }}</h4>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="scroll-wrapper">
                <div class="scroll" v-for="(part, $slide) in vehicles" v-bind:key="$slide">
                    <table>
                        <thead>
                            <tr style="text-align: left;">
                             <!--    {{ snapshot.titles[$slide] }} -->
                                <th colspan="3" v-if="snapshot.titles[$slide]  === 0">

                                    <font-awesome-icon :icon="['fas', 'motorcycle']" style="margin-right: 0.5em;"/>MOTORCYCLE AVAILABLE
                                </th>
                                 <th colspan="3" v-else-if="snapshot.titles[$slide] === 1">
                                    <font-awesome-icon :icon="['fas', 'car']" style="margin-right: 0.5em;"/>CAR AVAILABLE
                                </th>
                            </tr>
                        </thead>
                        <thead>
                            <tr class="bg-white">
                                <th width="5%" class="text-center">NO</th>
                                <th width="60%" class="text-left">UNIT</th>
                                <th width="35%" class="text-center">DK</th>
                            </tr>
                        </thead>
                        <tbody>
                           <tr v-for="(vehicle, $index) in part" v-bind:key="$index">
                            <td v-if="vehicle.unit" width="5%" class="text-center">{{ (30*$slide)+$index+1 }}</td>
                            <td v-else width="5%" class="text-center">&nbsp;</td>
                            <td class="text-left" height="100%" width="60%" style="width: 60%; height: 100%;">{{ vehicle.unit }}</td>
                            <td class="text-center" height="100%" width="35%">{{ vehicle.number }}</td>
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
        vehicles: [],
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
  updated(){
     let scrolls = document.getElementsByClassName('scroll');
        let vehiclesCount = this.vehicles.length;
        let transition = this.snapshot.transition;

        let scrollWrapper = document.querySelector(".scroll-wrapper");
        scrollWrapper.style.width = (vehiclesCount * 100) + '%';

        for (let i = 0; i < scrolls.length; i++) {
            scrolls[i].style.width = (100 / (vehiclesCount*2)) + '%';
        }


        setInterval(() => {
            if (this.slideNumber < vehiclesCount-1) {
                scrollWrapper.style.transform = 'translateX(-'+(this.slideNumber * ((100/vehiclesCount)/2))+'%)';
                this.slideNumber++;
            } else {
                scrollWrapper.style.transform = 'translateX(0%)';
                this.slideNumber = 1;
            }
        }, transition*1000);
  },
  methods: {
    async fetch() {
      await this.$axios.$get('vehicle')
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
        const { vehicles } = this.snapshot;
        this.vehicles = vehicles;
        console.log(snapshot);
    },
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

.header {
    display: grid;
    grid-template-rows: 2fr;
    background-color: $black;

    .main-header {
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 0 5%;
        border-bottom: 5px solid $orange;

        .left, .right {
            display: flex;
            align-items: center;
            flex-direction: row;
        }

        .left {
            img {
                width: 12%;
            }

            h3 {
              font-weight: bold;
              font-size: 3em;
              color: $orange;
              margin-left: 0.5em;
            }
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

        h3{
          font-weight: bold;
          font-size: 3em;
          color: $orange;
          margin-left: 0.5em;
        }

    }

}

.content {
    overflow-y: scroll;
    width: 100%;
    height: 100%;

    .scroll-wrapper{
        height: 100% !important;
        transition: 1s;

            .scroll {
                display: inline-block;
                float: left;
                height: auto !important;
                border-right: 2px solid $white;
            }
     }

       table {
            width: 100%;
            height: 100%;
            table-layout: fixed;
            border-collapse: collapse;


            thead, tbody {
                width: 100% !important;
                height: 100% !important;
            }

            thead {
                background: $gradient-light;
                color: $black;

                tr {
                    height: 4em;

                    th:not(:first-child) {
                        border-left: 1px solid $black;
                    }
                }

                &:first-child tr {
                    background-color: $orange;
                }
            }

            tbody {
                color: $white;
                tr {
                    &:nth-child(odd) {
                        background: $gradient-dark;
                    }
                    &:nth-child(even) {
                        background: $black-table;
                    }

                    td:not(:first-child) {
                        border-left: 1px solid white;
                    }
                }
            }

            th, td {
                padding: 0 0.5em;
                font-size: 20pt;
            }
        }
}
</style>