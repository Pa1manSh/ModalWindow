import { reactive } from "vue";

export const store = reactive({
  selectedPhoto: null,
  selectPhoto(photo) {
    this.selectedPhoto = photo;
  },
  clearPhoto() {
    this.selectedPhoto = null;
  },
});
