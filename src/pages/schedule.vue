<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <span class="text-h5">Schedule Page</span>
          </v-card-title>
          <v-card-text>
            <v-data-table
              :headers="headers"
              :items="schedules"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title>Schedules</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="addSchedule"
                    >Add Schedule</v-btn
                  >
                </v-toolbar>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon small class="mr-2" @click="editSchedule(item)">
                  mdi-pencil
                </v-icon>
                <v-icon small @click="deleteSchedule(item)">
                  mdi-delete
                </v-icon>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Date", value: "date" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      schedules: [
        { name: "Meeting with Team", date: "2023-10-01" },
        { name: "Project Deadline", date: "2023-10-05" },
      ],
    };
  },
  methods: {
    addSchedule() {
      console.log("Add Schedule");
    },
    editSchedule(item) {
      console.log("Edit Schedule", item);
    },
    deleteSchedule(item) {
      console.log("Delete Schedule", item);
    },
  },
};
</script>

<style scoped></style>
