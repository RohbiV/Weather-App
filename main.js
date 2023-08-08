
const temperature = document.querySelector(".weather1"),
    loc = document.querySelector(".weather2 p"),
    time = document.querySelector(".weather2 span"),
    image = document.querySelector(".weather3 img"),
    condition = document.querySelector(".weather3 span");

const weatherdata = document.querySelector(".weather");
const searchArea = document.querySelector(".search");
const textArea = document.querySelector("#searchfield");
const submitBtn = document.querySelector("#submit");
const heading = document.querySelector("h1");

let target;
let intervalID;

textArea.addEventListener("click", () => {
    textArea.style.transition = "all 3s";
    searchArea.style.top = 0;
});

const workFunctionality = () => {
    textArea.blur();
    if (textArea.value === '') {
        alert("Enter some city to search!!");
        clearInterval(intervalID);
    }
    searchArea.style.top = "80%";
    target = String(textArea.value);
    console.log(target);
    intervalID = setInterval(() => {
        fetchData();
    }, 1);
    textArea.value = '';
};

submitBtn.addEventListener("click", workFunctionality);
textArea.addEventListener("keyup", (e) => {
    if (e.code === 'Enter') {
        workFunctionality();
    }
});

const fetchData = async () => {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=03ddfa2f5f1d4d1db1e131721230808&q=${target}&aqi=no`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const {
            current: {
                temp_c, condition: {
                    text, icon
                }
            },
            location: {
                localtime, name
            }
        } = data;

        updateDom(temp_c, name, icon, localtime, text);
    } catch (error) {
        // console.log(error);
    }


};


function updateDom(temp, cityname, icon, localtime, text) {
    temperature.innerText = `${temp}°`;
    loc.innerText = cityname;
    image.src = icon;
    time.innerText = localtime;
    condition.innerText = text;
    saveData();
}


function saveData() {
    localStorage.setItem("Place", target);
}

function getData() {
    if (localStorage.getItem("Place") === null) {
        target = "Dhampur";
        fetchData();
    }
    else {
        target = localStorage.getItem("Place");
        fetchData();
    }
}

getData();


