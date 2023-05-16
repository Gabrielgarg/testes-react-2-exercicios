import { render, screen } from "@testing-library/react";
import Modal from "../components/Modal";
import userEvent from "@testing-library/user-event";

const activeModal = {
  sprites: {
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
  },
  id: "2",
  name: "ivysaur",
  types: [
    {
      type: "grass",
    },
    {
      type: "poison",
    },
  ],
  weight: 130 / 10,
  height: 10 / 10,
};

const addToCartMock = jest.fn();

describe("Testando o componente Modal", () => {
  test("Testando o componente modal", () => {
    render(<Modal activeModal={activeModal} closeModal={addToCartMock} />);
  });
  test("Testando os itens do componente", () => {
    render(<Modal activeModal={activeModal} closeModal={addToCartMock} />);
    screen.logTestingPlaygroundURL();

    const image = screen.getByRole("img", { name: /ivysaur/i });
    const name = screen.getByText(/ivysaur/i);
    const weight = screen.getByRole("heading", { name: /weight/i });
    const height = screen.getByRole("heading", { name: /height/i });
    const closeButton = screen.getByRole("button", { name: /❌/i });

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });
  test("Teste de interacao com o user ao clicar no botao x", async () => {
    const User = userEvent.setup();
    render(<Modal activeModal={activeModal} closeModal={addToCartMock} />);
    const closeButton = screen.getByRole("button", { name: /❌/i });

    await User.click(closeButton);

    //checa se a funcao recebeu os dados
    expect(addToCartMock).toBeCalled;

    //verificar que foi chamado so 1x
    expect(addToCartMock).toBeCalledTimes(1);
  });
});
