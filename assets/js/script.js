/* Mocks de dado do grafico  */

const mock = {
	grafico12m: {
		meses: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		despesas: [9000, 8200, 7950, 8000, 8100, 8000, 15000, 8500, 8000, 7500, 10000, 12000],
		receitas: [10000, 10000, 10600, 10000, 10000, 10000, 13300, 10050, 10000, 10000, 15000, 15000],
		invest: [1000, 1800, 2050, 2000, 1900, 2000, -1700, 1500, 2000, 2500, 5000, 3000],
		patrim: [21700, 21900, 22100, 22300, 22500, 22700, 21000, 21200, 21400, 21600, 21800, 22000]
	}
};

/* Tabela de despesas com filtro funcional */

document.addEventListener("DOMContentLoaded", () => {

	const filtro = document.querySelector("#filtroTipo");
	const tabela = document.querySelector("#tabelaDespesas tbody");
	const totalEl = document.querySelector("#totalDespesas");

	function atualizarLista() {
		let total = 0;

		Array.from(tabela.rows).forEach(row => {
			const bucket = row.dataset.bucket;

			if (filtro.value === "todos" || filtro.value === bucket) {
				row.style.display = "";
				total += parseFloat(row.cells[1].textContent.replace(",", "."));
			} else {
				row.style.display = "none";
			}
		});

		totalEl.textContent = total.toLocaleString("pt-BR", {
			minimumFractionDigits: 2
		});
	}

	filtro.addEventListener("change", atualizarLista);
	atualizarLista();

	/* Gráfico Chart.js  */

	const ctx = document.getElementById("chart12m");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: mock.grafico12m.meses,
            datasets: [
                { label: "Receitas", data: mock.grafico12m.receitas, borderWidth: 2, tension: 0.3 },
                { label: "Despesas", data: mock.grafico12m.despesas, borderWidth: 2, tension: 0.3 },
                { label: "Investimentos", data: mock.grafico12m.invest, borderWidth: 2, tension: 0.3 },
                { label: "Patrimonio", data: mock.grafico12m.patrim, borderWidth: 2, tension: 0.3 }
            ]
        }
    });

	/* Sidebar responsivo  */

	const sidebar = document.querySelector("#sidebar");
	const bsSidebar = new bootstrap.Offcanvas(sidebar);

	function atualizarSidebar() {
		if (window.innerWidth >= 1024) {
			bsSidebar.show();
		} else {
			bsSidebar.hide();
		}
	}

	atualizarSidebar();

	window.addEventListener("resize", atualizarSidebar);

	/* Sistema claro/escuro com toggle */

	document.querySelector("#themeToggle").onclick = () =>
		document.documentElement.setAttribute(
			"data-bs-theme",
			document.documentElement.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"
		);

});
