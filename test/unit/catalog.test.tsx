import { render, screen } from "@testing-library/react";
import { CartApi, ExampleApi } from "../../src/client/api";
import { initStore, productsLoad } from "../../src/client/store";
import { Provider } from "react-redux";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Catalog } from "../../src/client/pages/Catalog";
import { Action, createStore } from "redux";

const mockProducts = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
];

const mockReducer = (state = { products: mockProducts }, action: Action) =>
  state;

describe("Catalog", () => {
  beforeEach(() => {
    jest.mock("react-redux", () => ({
      ...jest.requireActual("react-redux"), // Импортируйте реальные экспорты
      useSelector: jest.fn(() => mockProducts),
      useDispatch: jest.fn(),
    }));
  });

  it("renders the catalog page", () => {
    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = createStore(mockReducer);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    const title = screen.getByRole("heading", { name: "Catalog" });
    expect(title.textContent).toBe("Catalog");
  });

  it("renders loading message when products are not loaded", () => {
    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = createStore(mockReducer);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    // Проверьте, что рендерится Loading компонент
    // Например:
    const loadingComponent = screen.getByRole("loading");
    expect(loadingComponent.textContent).toBe("LOADING");
  });

  it("calls productsLoad when component mounts", () => {
    const basename = "/hw/store";

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = createStore(mockReducer);

    const dispatch = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    // Проверьте, что dispatch был вызван с productsLoad
    // Например:
    expect(dispatch).toHaveBeenCalledWith(productsLoad());
  });

  it("renders a list of product cards", () => {
    // Создаем store с моками данных
    const store = createStore(mockReducer);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    // Проверяем, что рендерится две карточки продуктов
    const productCards = screen.getAllByRole("listitem");
    expect(productCards).toHaveLength(2);
  });
});
