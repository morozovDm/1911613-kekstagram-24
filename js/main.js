/* eslint-disable no-unused-vars */
import * as api from './api.js';
import * as photoCard from './photo-card.js';
import * as photoUpload from './photo-upload.js';
import * as alertMessagebox from './alert-messagebox.js';
import * as filters from './filters.js';

photoUpload.resetForm();

api.getData(
  (data) => {
    photoCard.generateCards(data);
    filters.show(data, photoCard.generateCards);
  },
  () => {
    alertMessagebox.renderErrorMessage(() => {
    }, document.querySelector('#total-error'));
  });
