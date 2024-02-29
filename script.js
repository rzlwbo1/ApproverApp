
document.addEventListener("DOMContentLoaded", function() {

  let formAppove = document.querySelector("form");
  let btnCopy = document.querySelector(".btn-copy");

  formAppove.addEventListener("submit", generateText);
  btnCopy.addEventListener("click", copyText)

})


function generateText(ev) {
  ev.preventDefault();

  let ADVal = document.getElementById("AD").value;
  let PlatformVal = document.getElementById("Platform").value;
  let TujuanVal = document.getElementById("Tujuan").value;
  let ApproverVal = document.getElementById("Approver").value;

  let preview = document.querySelector(".text-preview");
  let btnCopy = document.querySelector(".btn-copy");


  let template = `Selamat ${getTime()} pak/bu ${ApproverVal} mohon bantuannya approval ${PlatformVal} dengan user AD ${ADVal.toUpperCase()} untuk ${TujuanVal}`;


  preview.innerHTML = template
  btnCopy.disabled = false;

}


function getTime() {
  let hoursNow = new Date().getHours();
  let time = ["pagi", "siang", "sore", "malam"];


  if(hoursNow >= 7 && hoursNow <= 11) {
    return time[0];
  }

  if(hoursNow >= 12 && hoursNow <= 15) {
    return time[1]
  }

  if(hoursNow >= 16  && hoursNow <= 18) {
    return time[2]
  }

  if(hoursNow >= 19  && hoursNow <= 23) {
    return time[3]
  }

}


async function copyText() {

  let preview = document.querySelector(".text-preview").textContent

  try {
    await navigator.clipboard.writeText(preview);
    console.log('Content copied to clipboard');
  } catch (err) {
    console.error('Failed to copy: ', err);
  }  
}