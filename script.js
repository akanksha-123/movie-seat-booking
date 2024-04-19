const container = document.querySelector(".container");
const seat = document.querySelector(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice =+movieSelect.nodeValue;

function setMovieData(movieIndex, moviePrice){
    localStorage.setItem("selectMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice", moviePrice);
}

function updateSelectedCount(){
    const selectedSeat= document.querySelectorAll('.row .seat .selected');

    const seatIndex= [...selectedSeat].map(seat=> [...seat].indexOf(seat));

    localStorage.setItem("selectedSeat",JSON.stringify(seatIndex));

    const selectedSeatsCount= selectedSeat.length;

    count.innerText= selectedSeatsCount;
    total.innerText= selectedSeatsCount*ticketPrice;

    setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

function populateUI(){
    const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat"));

    if(selectedSeat !== null && selectedSeat.length > -1){
        seat.forEach((seat, index)=>{
            if(selectedSeat.indexOf(index)> -1){
                seat.classList.add("selected");
            }
        });         
    }

    const selectMovieIndex = localStorage.getItem("selectedMovieIndex");

    if(selectMovieIndex !== null){
        movieSelect.selectedIndex = selectMovieIndex;
    }
}

movieSelect.addEventListener("change", e=>{
    ticketPrice =+ e.target.value;
    setMovieData(e.target.seatIndex, e.target.value);
    updateSelectedCount();
})

container.addEventListener("click", e=>{
    if(
        e.target.classList.contains("seat") && 
        !e.target.classList.contains("sold")
    ){
        e.target.classList.toogle("selected");

        updateSelectedCount();
    }
});