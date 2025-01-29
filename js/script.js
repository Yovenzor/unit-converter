const conversions = {
    temperature: {
        units: ["Celsius", "Fahrenheit", "Kelvin"],
        convert: function(value, from, to) {
            if (from === to) return value;
            switch (from) {
                case "Celsius":
                    if (to === "Fahrenheit") return (value * 9/5) + 32;
                    if (to === "Kelvin") return value + 273.15;
                    break;
                case "Fahrenheit":
                    if (to === "Celsius") return (value - 32) * 5/9;
                    if (to === "Kelvin") return (value - 32) * 5/9 + 273.15;
                    break;
                case "Kelvin":
                    if (to === "Celsius") return value - 273.15;
                    if (to === "Fahrenheit") return (value - 273.15) * 9/5 + 32;
                    break;
            }
        }
    },
    currency: {
        units: [
            "USD", "EUR", "GBP", "JPY", "AUD", "CAD", "CHF", "CNY", "SEK", "NZD", 
            "MXN", "SGD", "HKD", "NOK", "KRW", "INR", "BRL", "RUB", "ZAR", "TRY", 
            "AED", "THB", "PLN", "CZK", "HUF", "IDR", "MYR", "PHP", "SAR", "QAR", 
            "EGP"
        ],
        convert: function(value, from, to) {
            const exchangeRates = {
                "USD": 1, "EUR": 0.92, "GBP": 0.82, "JPY": 135.15, "AUD": 1.45, 
                "CAD": 1.34, "CHF": 0.91, "CNY": 6.75, "SEK": 10.50, "NZD": 1.58, 
                "MXN": 18.14, "SGD": 1.36, "HKD": 7.85, "NOK": 10.85, "KRW": 1324.87, 
                "INR": 81.56, "BRL": 5.35, "RUB": 79.43, "ZAR": 19.06, "TRY": 26.98, 
                "AED": 3.67, "THB": 33.33, "PLN": 4.43, "CZK": 22.35, "HUF": 375.20, 
                "IDR": 15600, "MYR": 4.64, "PHP": 54.90, "SAR": 3.75, "QAR": 3.64, 
                "EGP": 30.93
            };
            return value * (exchangeRates[to] / exchangeRates[from]);
        }
    },
    volume: {
        units: ["Liter", "Milliliter", "Cubic Meter", "Gallon"],
        convert: function(value, from, to) {
            const conversions = {
                "Liter": { "Milliliter": 1000, "Cubic Meter": 0.001, "Gallon": 0.264172 },
                "Milliliter": { "Liter": 0.001, "Cubic Meter": 1e-6, "Gallon": 0.000264172 },
                "Cubic Meter": { "Liter": 1000, "Milliliter": 1e6, "Gallon": 264.172 },
                "Gallon": { "Liter": 3.78541, "Milliliter": 3785.41, "Cubic Meter": 0.00378541 }
            };
            return value * conversions[from][to];
        }
    },
    mass: {
        units: ["Kilogram", "Gram", "Pound", "Ounce"],
        convert: function(value, from, to) {
            const conversions = {
                "Kilogram": { "Gram": 1000, "Pound": 2.20462, "Ounce": 35.274 },
                "Gram": { "Kilogram": 0.001, "Pound": 0.00220462, "Ounce": 0.035274 },
                "Pound": { "Kilogram": 0.453592, "Gram": 453.592, "Ounce": 16 },
                "Ounce": { "Kilogram": 0.0283495, "Gram": 28.3495, "Pound": 0.0625 }
            };
            return value * conversions[from][to];
        }
    }
};

function updateDropdowns(type) {
    const fromSelect = document.getElementById("unitFrom");
    const toSelect = document.getElementById("unitTo");
    const units = conversions[type].units;

    fromSelect.innerHTML = '';
    toSelect.innerHTML = '';
    
    units.forEach(unit => {
        const optionFrom = document.createElement("option");
        optionFrom.value = unit;
        optionFrom.innerText = unit;
        fromSelect.appendChild(optionFrom);

        const optionTo = document.createElement("option");
        optionTo.value = unit;
        optionTo.innerText = unit;
        toSelect.appendChild(optionTo);
    });
}

// Event listener for conversion type
document.getElementById("unitType").addEventListener("change", function() {
    const selectedType = this.value;
    updateDropdowns(selectedType);
});

// Conversion function
document.getElementById("convertBtn").addEventListener("click", function() {
    const unitType = document.getElementById("unitType").value;
    const fromUnit = document.getElementById("unitFrom").value;
    const toUnit = document.getElementById("unitTo").value;
    const value = parseFloat(document.getElementById("value").value);

    if (!value || isNaN(value)) {
        alert("Please enter a valid value.");
        return;
    }

    const result = conversions[unitType].convert(value, fromUnit, toUnit);
    document.getElementById("result").innerText = result.toFixed(2);
});

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle")
const body = document.body

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode")
  if (body.classList.contains("dark-mode")) {
    themeToggle.textContent = "Toggle Light Mode"
  } else {
    themeToggle.textContent = "Toggle Dark Mode"
  }
})

updateDropdowns("currency");