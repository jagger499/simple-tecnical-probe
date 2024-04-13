import { fireEvent, render, screen, act } from "@testing-library/react";
import Page from "./page";

describe("Page component", () => {
  beforeAll(() => {
    // Implementación mock de fetch
    global.fetch = jest.fn();
  });

  afterEach(() => {
    // Limpiar mocks después de cada prueba
    jest.clearAllMocks();
  });

  it("renders loading state initially", async () => {
    render(<Page />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when there is an error fetching data", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Failed to fetch"));
    render(<Page />);
    await screen.findByText("Failed to load");
    expect(screen.getByText("Failed to load")).toBeInTheDocument();
  });

  it('renders select element with employee options', async () => {
    // Mock de la respuesta del servidor con empleados
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { dni: '12345678', nombre: 'Juan Pérez', nacimiento: '01/01/1990', numeroLegajo: '12345' },
        { dni: '87654321', nombre: 'María Rodríguez', nacimiento: '02/02/1985', numeroLegajo: '54321' }
      ]
    });
  
    // Renderizar el componente
    render(<Page />);
  
    // Esperar a que aparezca el elemento de selección y luego hacer afirmaciones
    await screen.findByLabelText('Selecciona el dni del empleado:');
    const selectElement = screen.getByLabelText('Selecciona el dni del empleado:');
    expect(selectElement).toBeInTheDocument();
  });

  it('renders employee information after search button is clicked', async () => {
    // Mock de la respuesta del servidor con empleados
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { dni: '12345678', nombre: 'Juan Pérez', nacimiento: '01/01/1990', numeroLegajo: '12345' },
        { dni: '87654321', nombre: 'María Rodríguez', nacimiento: '02/02/1985', numeroLegajo: '54321' }
      ]
    });
  
    // Renderizar el componente
    render(<Page />);
  
    // Seleccionar un empleado y hacer clic en el botón de buscar
    const selectElement = screen.getByLabelText('Selecciona el dni del empleado:');
    fireEvent.change(selectElement, { target: { value: JSON.stringify({ dni: '12345678', nombre: 'Juan Pérez', nacimiento: '01/01/1990', numeroLegajo: '12345' }) } });
    const searchButton = screen.getByText('Buscar');
    fireEvent.click(searchButton);
  
    // Esperar a que aparezca el texto "Nombre Completo" y luego hacer afirmaciones
    await screen.findByText('Nombre Completo');
    expect(screen.getByText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
  });

  it("resets selected employee when reset button is clicked", async () => {
    // Mock de la respuesta del servidor con empleados
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          dni: "12345678",
          nombre: "Juan Pérez",
          nacimiento: "01/01/1990",
          numeroLegajo: "12345",
        },
        {
          dni: "87654321",
          nombre: "María Rodríguez",
          nacimiento: "02/02/1985",
          numeroLegajo: "54321",
        },
      ],
    });

    // Renderizar el componente
    render(<Page />);

    // Seleccionar un empleado y hacer clic en el botón de buscar
    const selectElement = screen.getByLabelText(
      "Selecciona el dni del empleado:"
    );
    fireEvent.change(selectElement, {
      target: {
        value: JSON.stringify({
          dni: "12345678",
          nombre: "Juan Pérez",
          nacimiento: "01/01/1990",
          numeroLegajo: "12345",
        }),
      },
    });
    const searchButton = screen.getByText("Buscar");
    fireEvent.click(searchButton);

    // Esperar a que aparezca el texto "Nombre Completo"
    await screen.findByText("Nombre Completo");

    // Hacer clic en el botón de resetear
    const resetButton = screen.getByText("Limpiar");
    fireEvent.click(resetButton);

    // Verificar que el texto "Nombre Completo" ya no esté presente
    const nombreCompletoElement = screen.queryByText("Nombre Completo");
    expect(nombreCompletoElement).toBeNull();
  });
});
