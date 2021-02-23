import { Select } from './src/select';
import "./src/styles.scss";

const select = new Select('#select', {
  placeholder: 'Выбери пожалуйста элемент',
  selectedId: '4',
  data: [
    { id: '1', value: 'React' },
    { id: '2', value: 'Angular' },
    { id: '3', value: 'Vue' },
    { id: '4', value: 'React Native' },
    { id: '5', value: 'Svetle' },
    { id: '6', value: 'Next JS' },
    { id: '7', value: 'Nest JS' },
  ],
  onSelect(item) {
    console.log(`Selected ${item.id}: ${item.value}`);
  }
});

window.s = select;
