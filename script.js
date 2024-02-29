
document.addEventListener("DOMContentLoaded", function() {

  let formAppove = document.querySelector("form");
  let btnCopy = document.querySelector(".btn-copy");
  let btnShare = document.querySelector(".btn-share");
  let btnContact = document.querySelector(".btn-contact");

  formAppove.addEventListener("submit", generateText);
  btnCopy.addEventListener("click", copyText);
  btnShare.addEventListener("click", shareToWa);
  btnContact.addEventListener("click", openContactPicker);

})


function generateText(ev) {
  ev.preventDefault();

  let ADVal = document.getElementById("AD").value;
  let PlatformVal = document.getElementById("Platform").value;
  let TujuanVal = document.getElementById("Tujuan").value;
  let ApproverVal = document.getElementById("Approver").value;

  let preview = document.querySelector(".text-preview");
  let btnCopy = document.querySelector(".btn-copy");
  let btnShare = document.querySelector(".btn-share");


  let template = `Selamat ${getTime()} pak/bu ${ApproverVal} mohon bantuannya approval ${PlatformVal} dengan user AD ${ADVal.toUpperCase()} untuk ${TujuanVal} terimakasih 🙏🙏.`;


  preview.innerHTML = template
  btnCopy.disabled = false;
  btnShare.disabled = false;

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


function shareToWa() {

  let preview = document.querySelector(".text-preview").textContent;
  let waUrl = `https://api.whatsapp.com/send?text=${preview}`

  window.open(waUrl, '_blank')
}


function openContactPicker() {
  const supported = "contacts" in navigator && "ContactsManager" in window;

  if (supported) {
    getContacts();
  } else {
    alert(
      "Contact list API not supported!. Only for android mobile chrome and chrome version > 80"
    );
  }
}


async function getContacts() {
  const props = ["name", "tel"];
  const opts = { multiple: false };

  let ApproverVal = document.getElementById("Approver");

  try {
    const contact = await navigator.contacts.select(props, opts);
    ApproverVal.value = `@${contact[0].name[0]}`
    
  } catch (err) {
    alert(err);
  }
}