export const mockBun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mockFirstIngredient = {
  _id: '643d69a5c3f7b9001cfa0941',
  id: '234567891',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
};

export const mockSecondIngredient = {
  _id: '643d69a5c3f7b9001cfa093e',
  id: '123456789',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0
};

export const mockThirdIngredient = {
  _id: '643d69a5c3f7b9001cfa094a',
  id: '3456789012',
  name: 'Сыр с астероидной плесенью',
  type: 'main',
  proteins: 84,
  fat: 48,
  carbohydrates: 420,
  calories: 3377,
  price: 4142,
  image: 'https://code.s3.yandex.net/react/code/cheese.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
  __v: 0
};

export const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

export const userMockData = {
  email: 'example@mail.ru',
  name: 'Victor'
};

export const loginMockData = {
  email: 'example@example.mail',
  password: 'Victor123456'
};

export const registerMockData = {
  email: 'example@mail.ru',
  name: 'Victor',
  password: 'Victor123456'
};

export const orderMockData = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e'
    ],
    _id: '6627765797ede0001d067401',
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-11-01T19:33:00.756Z',
    updatedAt: '2024-11-01T19:33:22.867Z',
    number: 590056
  }
];
