import React from "react";

import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Application } from "../../src/client/Application";
import { ExampleApi, CartApi } from "../../src/client/api";
import { initStore } from "../../src/client/store";

it("На главной странице отображаются ссылки на главную страницу, контакты, доставку, каталог и корзину", () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <BrowserRouter>
      <Provider store={store}>
        <Application />
      </Provider>
    </BrowserRouter>
  );
  const { container } = render(application);
  screen.getByRole("link", { name: "Contacts" });
  screen.getByRole("link", { name: "Cart" });
  screen.getByRole("link", { name: "Delivery" });
  screen.getByRole("link", { name: "Kogtetochka store" });
  screen.getByRole("link", { name: "Catalog" });
  // screen.logTestingPlaygroundURL();
});

it('по ссылке "Catalog" открывается страница "Catalog"', () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={["/catalog"]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  render(application);
  const title = screen.getByRole("heading", { name: "Catalog" });
  expect(title.textContent).toBe("Catalog");
  //screen.logTestingPlaygroundURL();
});

it('по ссылке "Contacts" открывается страница "Contacts"', () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={["/contacts"]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  render(application);
  const title = screen.getByRole("heading", { name: "Contacts" });
  expect(title.textContent).toBe("Contacts");
  //screen.logTestingPlaygroundURL();
});

it('по ссылке "Delivery" открывается страница "Delivery"', () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={["/delivery"]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  render(application);
  const title = screen.getByRole("heading", { name: "Delivery" });
  expect(title.textContent).toBe("Delivery");
  //screen.logTestingPlaygroundURL();
});

it('по ссылке "Kogtetochka store"" открывается страница "Kogtetochka store""', () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={["/"]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  render(application);
  const title = screen.getByText("Welcome to Kogtetochka store!");
  expect(title.textContent).toBe("Welcome to Kogtetochka store!");
  //screen.logTestingPlaygroundURL();
});

it('по ссылке "Cart" открывается страница "Cart"', () => {
  const basename = "/hw/store";

  const api = new ExampleApi(basename);
  const cart = new CartApi();
  const store = initStore(api, cart);

  const application = (
    <MemoryRouter initialEntries={["/cart"]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );
  render(application);
  const title = screen.getByRole("heading", { name: "Shopping cart" });
  expect(title.textContent).toBe("Shopping cart");
  //screen.logTestingPlaygroundURL();
});
