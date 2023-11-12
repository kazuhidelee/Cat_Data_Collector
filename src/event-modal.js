import {state} from "./states";

const $elements = {
  modal: null,
  header: null,
  input: null,
  saveBtn: null
}

let scope = {
  date: null,
  callback: null
}

const template = `
  <section class="event-modal">
    <div class="cover" />
    <div class="content">
      <div class="data">
        <h3>Create event on <span></span></h3>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSfHjtwa2qtaO8E5YjdNFfHHkkf0l56gxOXS8nyf57tCC1CL2Q/viewform?usp=sf_link" target="_blank" class="google-sheet-link">Go to Google Sheet</a>
      </div>
      <footer>
        <button class="cancel">Cancel</button>
        <button class="primary">Save</button>
      </footer>
    </div>
  </section>
`;


export function initEventModal() {
  state.$element.insertAdjacentHTML('beforeend', template);
  $elements.modal = document.querySelector("section.event-modal");
  $elements.header = $elements.modal.querySelector("h3");
  $elements.input = $elements.modal.querySelector("input");

  $elements.modal.querySelector(".cancel").addEventListener("click", hideEventModal);
  $elements.modal.querySelector(".primary").addEventListener("click", save);
  $elements.input.addEventListener("keyup", ev => {
    if (ev.key === "Enter") {
      save();
    }
  })
}

export function showEventModal(date, callback) {
  $elements.header.querySelector("span").innerHTML = date;
  $elements.modal.style.display = "block";
  
  $elements.input.value = "";
  $elements.input.focus();

  scope.date = date;
  scope.callback = callback;
}

export function save() {
  const value = $elements.input.value;
  if (!value) return;

  scope.callback(value);
  hideEventModal();
}

export function hideEventModal() {
  $elements.modal.style.display = "none";
}