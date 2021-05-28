<template>
    <v-responsive
        max-width="260">
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    @keyup.enter="asyncSearch"
                    v-model='search'
                    dense
                    flat
                    hide-details
                    rounded
                    solo-inverted
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
            </template>
            <v-list>
                <v-col
                v-for="(item, i) in items"
                :key="i"
                cols="12"
                >
                    <v-card
                        :color="item.color"
                        dark
                        link
                    >
                        <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                            class="text-h5"
                            v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle v-text="item.artist"></v-card-subtitle>
                        </div>
                        <v-avatar
                            class="ma-3"
                            size="75"
                            tile
                        >
                            <v-img :src="item.src"></v-img>
                        </v-avatar>
                        </div>
                    </v-card>
                </v-col>
            </v-list>
        </v-menu>
    </v-responsive>

</template>

<script>
import { searchMulty } from '../../api'
export default {
  name: 'SearchMenu',
  data: function () {
    return {
      search: '',
      items: [
        {
          color: '#1F7087',
          src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
          title: 'Supermodel',
          artist: 'Foster the People'
        },
        {
          color: '#952175',
          src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
          title: 'Halcyon Days',
          artist: 'Ellie Goulding'
        }
      ]
    }
  },
  watch: {
    async search () {
      const CopyPromise = await searchMulty(this.search)
      console.log(CopyPromise)
    }
  }
}
</script>
