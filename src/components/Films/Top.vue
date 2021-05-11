<template>
  <v-container>
    <h1>TOP 100</h1>
    <v-row justify="space-around">
      <v-col
        class="pa-0"
        v-for="elevation in elevations"
        :key="elevation"
        cols="12"
        md="12"
      >
        <v-sheet
          class="pa-3 flex"
        >
          <v-sheet
            :elevation=4
            class="mx-12"
            height="100"
            width="100"
          ></v-sheet>
          <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title>Three-line item</v-list-item-title>
                    <v-list-item-subtitle>
                    Secondary line text Lorem ipsum dolor sit amet,
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                    consectetur adipiscing elit.
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-row
            class="wrapper-valuation">
                <v-rating
                background-color="grey lighten-2"
                color="warning"
                length="1"
                readonly
                size="15"
                :value="value"
                ></v-rating>
                <div class="wrapper-valuation-num green--text ml-4">
                8.8
                </div>
        </v-row>
        </v-sheet>
        <v-divider >
        </v-divider>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    value: 1,
    elevations: [6, 12, 18, 5, 34]
  })
}
</script>

<style scoped>
    .flex {
        display: flex;
    }
    .wrapper-valuation{
        display: flex;
        flex-flow: row nowrap;
        align-self: center;
    }
    .wrapper-valuation-num{
        align-self: center;
    }
</style>
