import { Project } from './project';

export const PROJECTS: Project[] = [
  {
    id:  1,
    title: "Семья",
    todos: [
      {
        id: 1,
        text: "Купить молоко",
        isCompleted: false
      },
      {
        id: 2,
        text: "Заменить масло в двигателе до 23 апреля",
        isCompleted: false
      },
      {
        id: 3,
        text: "Отправить письмо бабушке",
        isCompleted: true
      },
      {
        id: 4,
        text: "Заплатить за квартиру",
        isCompleted: false
      },
      {
        id: 5,
        text: "Забрать обувь из ремонта",
        isCompleted: false
      }
    ]
  },
  {
    id: 2,
    title: "Работа",
    todos: [
      {
        id: 6,
        text: "Позвонить заказчику",
        isCompleted: true
      },
      {
        id: 7,
        text: "Отправить документы",
        isCompleted: true
      },
      {
        id: 8,
        text: "Заполнить отчет",
        isCompleted: false
      }
    ]
  },
  {
    id: 3,
    title: "Прочее",
    todos: [
      {
        id: 9,
        text: "Позвонить другу",
        isCompleted: false
      },
      {
        id: 10,
        text: "Подготовиться к поездке",
        isCompleted: false
      }
    ]
  }
];
