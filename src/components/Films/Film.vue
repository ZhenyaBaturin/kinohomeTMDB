<template >
    <v-container>
        <v-layout row>
            <v-flex xs5
            class="pt-5 pl-5">
                <v-img
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="291"
                    max-width="349"
                    :src=poster
                ></v-img>
            </v-flex>
            <v-flex xs7
            class="pt-5 pr-5 pl-5 pb-5">
                <v-simple-table>
                    <template v-slot:default>
                    <thead>
                        <tr>
                          <th class="text-left">
                              Name
                          </th>
                          <th class="text-left">
                              Value
                          </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in infoAboutTheMovie"
                        :key="item.name"
                        >
                        <td>{{ item.name }}</td>
                        <td>{{ item.calories }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

export default {
  data: function () {
    return {
      poster: '',
      infoAboutTheMovie: [
        {
          name: 'Frozen Yogurt',
          calories: 159
        }
      ]
    }
  },
  async created () {
  },
  methods: {
  }
}
</script>
